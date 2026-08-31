import { ParsedWhatsAppChatSession, ParsedWhatsAppMessage } from '@/types/whatsapp';
import { sanitizeSenderName, sanitizeTextContent } from './piiSanitizer';

// Regular expressions for WhatsApp export formats
const PATTERNS = {
  // iOS format: [DD/MM/YY, HH.mm.ss] Sender: Message or [M/D/YY, H:mm:ss AM] Sender: Message
  IOS_BRACKET: /^\[(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}),?\s+(\d{1,2}[:.]\d{2}(?:[:.]\d{2})?(?:\s?[APap][Mm])?)\]\s+([^:]+):\s+(.*)$/,

  // Android format: DD/MM/YY, HH.mm - Sender: Message or DD/MM/YYYY, HH:mm - Sender: Message
  ANDROID_STANDARD: /^(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}),?\s+(\d{1,2}[:.]\d{2}(?:[:.]\d{2})?(?:\s?[APap][Mm])?)\s+-\s+([^:]+):\s+(.*)$/,

  // System notification line (encryption / group change)
  SYSTEM_NOTIFICATION: /(end-to-end encrypt|enkripsi end-to-end|security code changed|kode keamanan berubah|created group|membuat grup|added|menambahkan|left|keluar|changed the subject|mengubah subjek)/i,

  // Media attachment omitted
  MEDIA_OMITTED: /<media (omitted|tidak disertakan)>|((image|video|audio|document|sticker|contact card|GIF)\s+omitted)/i,
};

export function isUserOutgoingSender(sender: string): boolean {
  const normalized = sender.trim().toLowerCase();
  return (
    normalized === 'anda' ||
    normalized === 'you' ||
    normalized === 'me' ||
    normalized === 'saya' ||
    normalized === 'self'
  );
}

export function parseWhatsAppExportText(
  rawText: string,
  fileName?: string,
  maskPii: boolean = true
): ParsedWhatsAppChatSession {
  const lines = rawText.split(/\r?\n/);
  const messages: ParsedWhatsAppMessage[] = [];
  const participantsSet = new Set<string>();
  let currentMessage: ParsedWhatsAppMessage | null = null;
  let idCounter = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Check if line matches iOS or Android format
    let match = line.match(PATTERNS.IOS_BRACKET);
    let matchedFormat: 'ios' | 'android' | null = null;

    if (match) {
      matchedFormat = 'ios';
    } else {
      match = line.match(PATTERNS.ANDROID_STANDARD);
      if (match) {
        matchedFormat = 'android';
      }
    }

    if (match && matchedFormat) {
      const datePart = match[1];
      const timePart = match[2];
      const rawSender = match[3].trim();
      const content = match[4].trim();

      // Skip system encryption/group change notices
      if (PATTERNS.SYSTEM_NOTIFICATION.test(line) && !content) {
        continue;
      }

      participantsSet.add(rawSender);

      const hasMedia = PATTERNS.MEDIA_OMITTED.test(content);
      const isOutgoing = isUserOutgoingSender(rawSender);
      const sanitizedContent = sanitizeTextContent(content, maskPii);
      const sanitizedSender = sanitizeSenderName(rawSender, maskPii);

      const newMsg: ParsedWhatsAppMessage = {
        id: `msg_${idCounter++}`,
        timestampRaw: `${datePart} ${timePart}`,
        sender: sanitizedSender,
        isOutgoing,
        content: sanitizedContent,
        hasMediaTag: hasMedia,
        isSelected: true,
      };

      messages.push(newMsg);
      currentMessage = newMsg;
    } else if (currentMessage) {
      // Append multi-line content to previous message
      const sanitizedAppend = sanitizeTextContent(line, maskPii);
      currentMessage.content += `\n${sanitizedAppend}`;
      if (PATTERNS.MEDIA_OMITTED.test(line)) {
        currentMessage.hasMediaTag = true;
      }
    }
  }

  // If no structured format was parsed but text is provided, fallback to line-by-line fallback
  if (messages.length === 0 && rawText.trim().length > 0) {
    const paragraphs = rawText.split(/\r?\n\r?\n/);
    paragraphs.forEach((p, idx) => {
      const trimmed = p.trim();
      if (trimmed) {
        messages.push({
          id: `msg_${idCounter++}`,
          timestampRaw: `Line ${idx + 1}`,
          sender: 'Pengirim',
          isOutgoing: false,
          content: sanitizeTextContent(trimmed, maskPii),
          hasMediaTag: PATTERNS.MEDIA_OMITTED.test(trimmed),
          isSelected: true,
        });
      }
    });
    participantsSet.add('Pengirim');
  }

  const participants = Array.from(participantsSet).map((p) =>
    sanitizeSenderName(p, maskPii)
  );

  return {
    fileName: fileName || 'chat_export.txt',
    totalMessages: messages.length,
    participants,
    firstMessageDate: messages[0]?.timestampRaw,
    lastMessageDate: messages[messages.length - 1]?.timestampRaw,
    messages,
    sanitized: maskPii,
  };
}
