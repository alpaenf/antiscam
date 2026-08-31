'use client';

import React from 'react';
import { ParsedWhatsAppMessage } from '@/types/whatsapp';
import { AlertTriangle, FileWarning, Paperclip, CheckSquare, Square } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ChatBubbleItemProps {
  message: ParsedWhatsAppMessage;
  onToggleSelect: (id: string) => void;
}

export function ChatBubbleItem({ message, onToggleSelect }: ChatBubbleItemProps) {
  const isOut = message.isOutgoing;
  const isFlagged = Boolean(message.flaggedRisk);

  return (
    <div
      className={cn(
        'group flex items-start gap-2.5 my-2.5 transition-all',
        isOut ? 'justify-end' : 'justify-start'
      )}
    >
      {/* Checkbox selector for incoming messages */}
      {!isOut && (
        <button
          type="button"
          onClick={() => onToggleSelect(message.id)}
          className="mt-2 text-foreground-muted hover:text-foreground transition-colors focus:outline-none"
          aria-label={message.isSelected ? 'Batalkan pilihan pesan' : 'Pilih pesan untuk dianalisis'}
        >
          {message.isSelected ? (
            <CheckSquare className="w-4 h-4 text-foreground" aria-hidden="true" />
          ) : (
            <Square className="w-4 h-4 text-gray-300" aria-hidden="true" />
          )}
        </button>
      )}

      {/* Bubble Container */}
      <div
        className={cn(
          'relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-xs transition-all',
          isOut
            ? 'bg-foreground text-white rounded-tr-xs'
            : 'bg-background-subtle border border-border text-foreground rounded-tl-xs',
          isFlagged && 'border-2 border-risk-critical-text bg-risk-critical-bg text-foreground shadow-sm',
          !message.isSelected && 'opacity-40'
        )}
      >
        {/* Header Sender & Time */}
        <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-black/5 text-[11px]">
          <span
            className={cn(
              'font-semibold truncate max-w-[150px]',
              isOut ? 'text-gray-200' : 'text-foreground'
            )}
          >
            {message.sender}
          </span>
          <span className={isOut ? 'text-gray-300' : 'text-foreground-muted'}>
            {message.timestampRaw}
          </span>
        </div>

        {/* Media Tag if present */}
        {message.hasMediaTag && (
          <div
            className={cn(
              'inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md mb-1.5 font-medium',
              isOut
                ? 'bg-white/10 text-gray-200'
                : 'bg-background-muted text-foreground-secondary border border-border'
            )}
          >
            <Paperclip className="w-3 h-3" aria-hidden="true" />
            <span>Lampiran Media</span>
          </div>
        )}

        {/* Text Content */}
        <p className="whitespace-pre-wrap break-words leading-relaxed font-normal">
          {message.content}
        </p>

        {/* Flagged Risk Banner (if detected) */}
        {isFlagged && (
          <div className="mt-2.5 pt-2 border-t border-risk-critical-border/50 flex items-start gap-1.5 text-xs text-risk-critical-text font-medium">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-bold uppercase tracking-wider text-[10px] block">
                Indikasi Ancaman Terdeteksi:
              </span>
              <span>{message.flaggedReason || 'Pesan memiliki pola penipuan berbahaya.'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Checkbox selector for outgoing messages */}
      {isOut && (
        <button
          type="button"
          onClick={() => onToggleSelect(message.id)}
          className="mt-2 text-foreground-muted hover:text-foreground transition-colors focus:outline-none"
          aria-label={message.isSelected ? 'Batalkan pilihan pesan' : 'Pilih pesan untuk dianalisis'}
        >
          {message.isSelected ? (
            <CheckSquare className="w-4 h-4 text-foreground" aria-hidden="true" />
          ) : (
            <Square className="w-4 h-4 text-gray-300" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
