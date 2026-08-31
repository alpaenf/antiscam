import React from 'react';
import { ThreatIndicator } from '@/types/analysis';
import { ThreatCard } from './ThreatCard';
import { ShieldCheck } from 'lucide-react';

export interface ThreatIndicatorListProps {
  indicators: ThreatIndicator[];
}

export function ThreatIndicatorList({ indicators }: ThreatIndicatorListProps) {
  if (indicators.length === 0) {
    return (
      <div className="bg-risk-low-bg border border-risk-low-border rounded-2xl p-6 text-center text-risk-low-text">
        <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-risk-low-text" aria-hidden="true" />
        <h4 className="text-sm sm:text-base font-bold">Tidak Ada Indikator Ancaman Kritis</h4>
        <p className="text-xs mt-1 text-emerald-800">
          Pola pesan tidak menunjukkan ciri-ciri phising atau scam yang umum.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-foreground">
          Indikator Risiko yang Ditemukan ({indicators.length})
        </h3>
        <span className="text-xs text-foreground-secondary">
          Mengapa pesan ini dianggap berisiko?
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {indicators.map((ind, idx) => (
          <ThreatCard key={ind.id || idx} indicator={ind} index={idx} />
        ))}
      </div>
    </div>
  );
}
