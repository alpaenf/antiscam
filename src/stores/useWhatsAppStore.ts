import { create } from 'zustand';
import { ParsedWhatsAppChatSession, WhatsAppAnalysisResponse } from '@/types/whatsapp';
import { parseWhatsAppExportText } from '@/lib/parser/whatsappParser';
import { analyzeWhatsAppChat } from '@/lib/api/analyzeService';

interface WhatsAppState {
  rawContent: string;
  fileName: string | null;
  isPiiMasked: boolean;
  chatSession: ParsedWhatsAppChatSession | null;
  status: 'idle' | 'parsing' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
  chatResult: WhatsAppAnalysisResponse | null;

  loadFile: (file: File) => Promise<void>;
  loadRawText: (text: string, title?: string) => void;
  togglePiiMasking: () => void;
  toggleMessageSelection: (messageId: string) => void;
  selectAllMessages: (select: boolean) => void;
  selectIncomingOnly: () => void;
  runChatAnalysis: () => Promise<void>;
  resetWhatsApp: () => void;
}

export const useWhatsAppStore = create<WhatsAppState>((set, get) => ({
  rawContent: '',
  fileName: null,
  isPiiMasked: true,
  chatSession: null,
  status: 'idle',
  errorMessage: null,
  chatResult: null,

  loadFile: async (file: File) => {
    if (!file.name.endsWith('.txt')) {
      set({
        errorMessage: 'Format file tidak didukung. Harap unggah file ekspor chat WhatsApp berformat .txt tanpa media.',
        status: 'error',
      });
      return;
    }

    set({ status: 'parsing', errorMessage: null, fileName: file.name });

    try {
      const text = await file.text();
      const session = parseWhatsAppExportText(text, file.name, get().isPiiMasked);
      if (session.messages.length === 0) {
        set({
          status: 'error',
          errorMessage: 'Tidak dapat mendeteksi format pesan WhatsApp pada file ini. Pastikan file berupa ekspor teks WhatsApp.',
        });
        return;
      }
      set({
        rawContent: text,
        chatSession: session,
        status: 'idle',
        errorMessage: null,
        chatResult: null,
      });
    } catch {
      set({
        status: 'error',
        errorMessage: 'Gagal membaca file chat. Pastikan file tidak rusak.',
      });
    }
  },

  loadRawText: (text: string, title: string = 'Sample Chat WhatsApp') => {
    if (!text.trim()) {
      set({ errorMessage: 'Teks percakapan masih kosong.' });
      return;
    }
    set({ rawContent: text, fileName: title, errorMessage: null });
    const session = parseWhatsAppExportText(text, title, get().isPiiMasked);
    set({
      chatSession: session,
      status: 'idle',
      chatResult: null,
    });
  },

  togglePiiMasking: () => {
    const { rawContent, fileName, isPiiMasked } = get();
    const nextMaskState = !isPiiMasked;
    set({ isPiiMasked: nextMaskState });

    if (rawContent) {
      const reParsed = parseWhatsAppExportText(rawContent, fileName || 'chat.txt', nextMaskState);
      set({ chatSession: reParsed });
    }
  },

  toggleMessageSelection: (messageId: string) => {
    const { chatSession } = get();
    if (!chatSession) return;

    const updated = chatSession.messages.map((msg) =>
      msg.id === messageId ? { ...msg, isSelected: !msg.isSelected } : msg
    );

    set({
      chatSession: {
        ...chatSession,
        messages: updated,
      },
    });
  },

  selectAllMessages: (select: boolean) => {
    const { chatSession } = get();
    if (!chatSession) return;

    const updated = chatSession.messages.map((msg) => ({
      ...msg,
      isSelected: select,
    }));

    set({
      chatSession: {
        ...chatSession,
        messages: updated,
      },
    });
  },

  selectIncomingOnly: () => {
    const { chatSession } = get();
    if (!chatSession) return;

    const updated = chatSession.messages.map((msg) => ({
      ...msg,
      isSelected: !msg.isOutgoing,
    }));

    set({
      chatSession: {
        ...chatSession,
        messages: updated,
      },
    });
  },

  runChatAnalysis: async () => {
    const { chatSession } = get();
    if (!chatSession || chatSession.messages.length === 0) {
      set({ errorMessage: 'Tidak ada data percakapan untuk dianalisis.' });
      return;
    }

    const selected = chatSession.messages.filter((m) => m.isSelected);
    if (selected.length === 0) {
      set({ errorMessage: 'Silakan pilih minimal 1 pesan untuk dianalisis.' });
      return;
    }

    set({ status: 'loading', errorMessage: null, chatResult: null });

    try {
      const response = await analyzeWhatsAppChat({
        sessionTitle: chatSession.fileName,
        totalMessages: selected.length,
        participants: chatSession.participants,
        messages: selected.map((m) => ({
          id: m.id,
          timestampRaw: m.timestampRaw,
          sender: m.sender,
          isOutgoing: m.isOutgoing,
          content: m.content,
        })),
      });

      // Highlight flagged bubbles on chat session
      const flaggedMap = new Map(response.flaggedMessages.map((f) => [f.messageId, f]));
      const updatedMessages = chatSession.messages.map((msg) => {
        const flag = flaggedMap.get(msg.id);
        if (flag) {
          return {
            ...msg,
            flaggedRisk: flag.riskLevel,
            flaggedReason: flag.reason,
            flaggedCategory: flag.triggerCategory,
          };
        }
        return msg;
      });

      set({
        status: 'success',
        chatResult: response,
        chatSession: {
          ...chatSession,
          messages: updatedMessages,
        },
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Gagal menganalisis obrolan WhatsApp.';
      set({ status: 'error', errorMessage: message });
    }
  },

  resetWhatsApp: () => {
    set({
      rawContent: '',
      fileName: null,
      chatSession: null,
      status: 'idle',
      errorMessage: null,
      chatResult: null,
    });
  },
}));
