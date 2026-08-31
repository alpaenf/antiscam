'use client';

import React from 'react';
import { EyeOff, Eye, ShieldCheck } from 'lucide-react';
import { useWhatsAppStore } from '@/stores/useWhatsAppStore';
import { cn } from '@/lib/utils/cn';

export function PiiToggleControl() {
  const { isPiiMasked, togglePiiMasking } = useWhatsAppStore();

  return (
    <div className="flex items-center justify-between p-3.5 bg-background-subtle border border-border rounded-xl">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-foreground">
          {isPiiMasked ? (
            <EyeOff className="w-4 h-4 text-foreground" aria-hidden="true" />
          ) : (
            <Eye className="w-4 h-4 text-foreground-secondary" aria-hidden="true" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-semibold text-foreground">
              Sensor Data Pribadi (PII Masking)
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3 h-3 mr-0.5" aria-hidden="true" />
              Rekomendasi
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-foreground-secondary">
            {isPiiMasked
              ? 'Nomor telepon (+62), rekening, NIK, dan email disensor secara otomatis di browser.'
              : 'Data chat ditampilkan asli tanpa penyensoran.'}
          </p>
        </div>
      </div>

      {/* Switch Toggle */}
      <button
        type="button"
        role="switch"
        aria-checked={isPiiMasked}
        onClick={togglePiiMasking}
        className={cn(
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-foreground',
          isPiiMasked ? 'bg-foreground' : 'bg-gray-300'
        )}
      >
        <span className="sr-only">Toggle Sensor Data Pribadi</span>
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            isPiiMasked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
}
