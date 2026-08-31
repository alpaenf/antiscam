'use client';

import React, { useState } from 'react';
import { useWhatsAppStore } from '@/stores/useWhatsAppStore';
import { Button } from '@/components/ui/Button';
import { ClipboardPaste, Check } from 'lucide-react';

export function WhatsAppPasteInput() {
  const [pastedText, setPastedText] = useState('');
  const { loadRawText } = useWhatsAppStore();

  const handleParsePasted = () => {
    if (pastedText.trim()) {
      loadRawText(pastedText.trim(), 'Pasted Chat WhatsApp');
    }
  };

  return (
    <div className="bg-white border border-border rounded-2xl p-4 sm:p-5 space-y-4">
      <div>
        <label
          htmlFor="wa-paste-textarea"
          className="text-xs sm:text-sm font-semibold text-foreground block mb-1"
        >
          Tempelkan (Paste) Teks Obrolan WhatsApp:
        </label>
        <p className="text-xs text-foreground-secondary mb-3">
          Salin beberapa baris atau seluruh teks percakapan langsung dari aplikasi WhatsApp.
        </p>
      </div>

      <textarea
        id="wa-paste-textarea"
        value={pastedText}
        onChange={(e) => setPastedText(e.target.value)}
        rows={6}
        placeholder={`Contoh teks obrolan WhatsApp:\n20/08/24 14.30 - +62 812-xxxx-xxxx: Halo paket Anda tertahan...\n20/08/24 14.31 - Anda: Paket apa ya?\n20/08/24 14.32 - +62 812-xxxx-xxxx: Cek resi di file LIHAT_PAKET.apk ini ya`}
        className="w-full text-xs sm:text-sm text-foreground bg-background-subtle border border-border rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-foreground leading-relaxed resize-y font-mono"
      />

      <div className="flex justify-end">
        <Button
          variant="primary"
          size="md"
          onClick={handleParsePasted}
          disabled={!pastedText.trim()}
        >
          <ClipboardPaste className="w-4 h-4 mr-1.5" aria-hidden="true" />
          Proses & Tampilkan Balon Obrolan
        </Button>
      </div>
    </div>
  );
}
