import React from 'react';
import { RecommendedAction } from '@/types/analysis';
import { ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ActionRecommendationsProps {
  recommendations: RecommendedAction[];
}

export function ActionRecommendations({ recommendations }: ActionRecommendationsProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="bg-background-subtle border-2 border-border rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2.5 pb-3 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-foreground text-white flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            Langkah Tindakan yang Direkomendasikan
          </h3>
          <p className="text-xs text-foreground-secondary">
            Apa yang sebaiknya Anda lakukan setelah menerima pesan ini?
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const isMust = rec.priority === 'must_do';
          return (
            <div
              key={rec.id}
              className={cn(
                'p-4 rounded-xl border transition-all',
                isMust
                  ? 'bg-white border-risk-critical-border shadow-xs'
                  : 'bg-white border-border'
              )}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className={cn(
                    'w-5 h-5 flex-shrink-0 mt-0.5',
                    isMust ? 'text-risk-critical-text' : 'text-foreground-secondary'
                  )}
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-foreground">
                    {rec.actionText}
                  </h4>
                  <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                    {rec.explanation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
