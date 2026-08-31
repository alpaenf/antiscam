export const PII_PATTERNS = {
  PHONE: /(?:\+?62|0)8[1-9][0-9]{1,2}[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,5}/g,
  ACCOUNT_OR_NIK: /\b\d{10,16}\b/g,
  EMAIL: /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
};

export function maskPhoneNumber(text: string): string {
  return text.replace(PII_PATTERNS.PHONE, (match) => {
    const cleaned = match.replace(/[-.\s]/g, '');
    if (cleaned.length < 8) return match;
    const prefix = cleaned.slice(0, 4);
    const suffix = cleaned.slice(-3);
    return `${prefix}-****-${suffix}`;
  });
}

export function maskAccountNumbers(text: string): string {
  return text.replace(PII_PATTERNS.ACCOUNT_OR_NIK, (match) => {
    const prefix = match.slice(0, 3);
    const suffix = match.slice(-2);
    return `${prefix}******${suffix}`;
  });
}

export function maskEmail(text: string): string {
  return text.replace(PII_PATTERNS.EMAIL, (_, user, domain) => {
    const maskedUser = user.length > 2 ? `${user[0]}***${user[user.length - 1]}` : '***';
    return `${maskedUser}@${domain}`;
  });
}

export function sanitizeTextContent(text: string, enableMasking: boolean = true): string {
  if (!enableMasking) return text;
  let sanitized = maskPhoneNumber(text);
  sanitized = maskAccountNumbers(sanitized);
  sanitized = maskEmail(sanitized);
  return sanitized;
}

export function sanitizeSenderName(sender: string, enableMasking: boolean = true): string {
  if (!enableMasking) return sender;
  // If sender is a phone number, mask it
  if (/(?:\+?62|0)8[1-9]/.test(sender)) {
    return maskPhoneNumber(sender);
  }
  return sender;
}
