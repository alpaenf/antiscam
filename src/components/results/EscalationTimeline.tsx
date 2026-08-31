import React from 'react';
import { EscalationPhase } from '@/types/whatsapp';
import { GitCommit, AlertCircle } from 'lucide-react';

export interface EscalationTimelineProps {
  phases: EscalationPhase[];
  detectedType: string;
}

export function EscalationTimeline({ phases, detectedType }: EscalationTimelineProps) {
  if (!phases || phases.length === 0) return null;

  return (
    <div className="bg-white border border-border rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
        <div>
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
            Analisis Alur Percakapan WhatsApp
          </div>
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            Kronologi Modus Penipuan (Scam Escalation)
          </h3>
        </div>
        <div className="px-3 py-1 bg-risk-critical-bg text-risk-critical-text border border-risk-critical-border rounded-lg text-xs font-semibold self-start sm:self-center">
          {detectedType}
        </div>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
        {phases.map((phase) => (
          <div key={phase.phaseNumber} className="relative group">
            {/* Step Node */}
            <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white border-2 border-foreground flex items-center justify-center text-[10px] font-bold text-foreground">
              {phase.phaseNumber}
            </div>

            <div className="pl-2">
              <h4 className="text-sm font-bold text-foreground mb-1">
                {phase.phaseName}
              </h4>
              <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                {phase.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
