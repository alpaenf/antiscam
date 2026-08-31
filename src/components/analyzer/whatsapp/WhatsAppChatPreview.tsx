'use client';

import React from 'react';
import {
  FileText,
  Users,
  RotateCcw,
  CheckCheck,
  ArrowRight,
  ShieldCheck,
  Filter,
} from 'lucide-react';
import { useWhatsAppStore } from '@/stores/useWhatsAppStore';
import { ChatBubbleItem } from './ChatBubbleItem';
import { PiiToggleControl } from './PiiToggleControl';
import { Button } from '@/components/ui/Button';
import { ErrorNotice } from '@/components/ui/ErrorNotice';

export function WhatsAppChatPreview() {
  const {
    chatSession,
    status,
    errorMessage,
    toggleMessageSelection,
    selectAllMessages,
    selectIncomingOnly,
    runChatAnalysis,
    resetWhatsApp,
  } = useWhatsAppStore();

  if (!chatSession) return null;

  const total = chatSession.messages.length;
  const selectedCount = chatSession.messages.filter((m) => m.isSelected).length;
  const isLoading = status === 'loading';

  return (
    <div className="space-y-6">
      {/* Session Metadata & Controls Bar */}
      <div className="bg-white border border-border rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-background-muted border border-border flex items-center justify-center text-foreground">
              <FileText className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-foreground truncate max-w-xs sm:max-w-md">
                {chatSession.fileName || 'Chat Ekspor WhatsApp'}
              </h3>
              <div className="flex items-center gap-3 text-xs text-foreground-secondary mt-0.5">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" aria-hidden="true" />
                  {chatSession.participants.join(', ')}
                </span>
                <span>•</span>
                <span>{total} Pesan Terdeteksi</span>
              </div>
            </div>
          </div>

          {/* Reset / Change File */}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetWhatsApp}
            disabled={isLoading}
            className="text-foreground-secondary hover:text-risk-critical-text self-start sm:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
            <span>Ganti File</span>
          </Button>
        </div>

        {/* PII Toggle */}
        <PiiToggleControl />

        {/* Quick Selection Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-foreground-secondary font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" aria-hidden="true" />
              Filter Seleksi:
            </span>
            <button
              type="button"
              onClick={() => selectAllMessages(true)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-md bg-background-muted hover:bg-gray-200 text-foreground font-medium transition-colors"
            >
              Pilih Semua
            </button>
            <button
              type="button"
              onClick={selectIncomingOnly}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-md bg-background-muted hover:bg-gray-200 text-foreground font-medium transition-colors"
            >
              Hanya Pesan Masuk
            </button>
            <button
              type="button"
              onClick={() => selectAllMessages(false)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-md text-foreground-secondary hover:text-foreground transition-colors"
            >
              Hapus Pilihan
            </button>
          </div>

          <div className="text-foreground-secondary font-semibold">
            {selectedCount} dari {total} pesan dipilih
          </div>
        </div>
      </div>

      {/* Interactive Chat Bubble List View */}
      <div className="bg-white border-2 border-border rounded-3xl p-4 sm:p-6 max-h-[520px] overflow-y-auto space-y-2 shadow-inner">
        <div className="text-center py-2 mb-4 border-b border-border text-[11px] text-foreground-muted flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-foreground" aria-hidden="true" />
          <span>Pratinjau Alur Percakapan WhatsApp (Pilih pesan yang ingin diuji)</span>
        </div>

        {chatSession.messages.map((msg) => (
          <ChatBubbleItem
            key={msg.id}
            message={msg}
            onToggleSelect={toggleMessageSelection}
          />
        ))}
      </div>

      {/* Error Notice */}
      {errorMessage && (
        <ErrorNotice message={errorMessage} onRetry={runChatAnalysis} />
      )}

      {/* Action CTA Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-background-subtle border border-border rounded-2xl">
        <p className="text-xs text-foreground-secondary">
          Sistem akan mengevaluasi alur kronologi manipulasi dan mencari indikator berbahaya.
        </p>

        <Button
          size="lg"
          variant="primary"
          onClick={runChatAnalysis}
          isLoading={isLoading}
          disabled={selectedCount === 0 || isLoading}
          className="w-full sm:w-auto min-w-[220px]"
        >
          <span>Analisis {selectedCount} Pesan</span>
          <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
