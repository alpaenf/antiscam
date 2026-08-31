'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { AnalyzerMode } from '@/stores/useAnalyzerStore';
import { cn } from '@/lib/utils/cn';

export interface ModeSwitcherProps {
  activeMode: AnalyzerMode;
  onChange: (mode: AnalyzerMode) => void;
}

export function ModeSwitcher({ activeMode, onChange }: ModeSwitcherProps) {
  return (
    <div className="flex bg-background-muted p-1 rounded-2xl max-w-md mx-auto mb-6 sm:mb-8 border border-border/80 shadow-xs">
      <button
        type="button"
        onClick={() => onChange('single')}
        className={cn(
          'flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 whitespace-nowrap',
          activeMode === 'single'
            ? 'bg-white text-foreground shadow-sm border border-border/60'
            : 'text-foreground-secondary hover:text-foreground'
        )}
      >
        <MessageSquare className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
        <span>Pesan Tunggal</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('whatsapp')}
        className={cn(
          'flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 whitespace-nowrap',
          activeMode === 'whatsapp'
            ? 'bg-white text-foreground shadow-sm border border-border/60'
            : 'text-foreground-secondary hover:text-foreground'
        )}
      >
        <WhatsAppIcon colored size={16} />
        <span>
          Ekspor Chat <span className="hidden sm:inline">WhatsApp</span><span className="sm:hidden">WA</span>
        </span>
      </button>
    </div>
  );
}
