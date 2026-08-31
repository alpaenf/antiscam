import React from 'react';
import { ThreatIndicator } from '@/types/analysis';
import {
  ExternalLink,
  FileWarning,
  Clock,
  CreditCard,
  Lock,
  Gift,
  UserX,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

export interface ThreatCardProps {
  indicator: ThreatIndicator;
  index: number;
}

export function ThreatCard({ indicator, index }: ThreatCardProps) {
  const getCategoryIcon = () => {
    switch (indicator.category) {
      case 'suspicious_link':
        return <ExternalLink className="w-5 h-5 text-foreground" aria-hidden="true" />;
      case 'malicious_apk':
        return <FileWarning className="w-5 h-5 text-foreground" aria-hidden="true" />;
      case 'urgency_pressure':
        return <Clock className="w-5 h-5 text-foreground" aria-hidden="true" />;
      case 'financial_request':
        return <CreditCard className="w-5 h-5 text-foreground" aria-hidden="true" />;
      case 'credential_harvesting':
        return <Lock className="w-5 h-5 text-foreground" aria-hidden="true" />;
      case 'fake_reward':
        return <Gift className="w-5 h-5 text-foreground" aria-hidden="true" />;
      case 'impersonation':
        return <UserX className="w-5 h-5 text-foreground" aria-hidden="true" />;
      case 'suspicious_language':
        return <FileText className="w-5 h-5 text-foreground" aria-hidden="true" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-foreground" aria-hidden="true" />;
    }
  };

  return (
    <div className="bg-white border border-border rounded-2xl p-4 sm:p-5 shadow-xs hover:border-gray-400 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-background-subtle border border-border flex items-center justify-center flex-shrink-0">
            {getCategoryIcon()}
          </div>
          <div>
            <div className="text-[11px] font-bold text-foreground-muted uppercase tracking-wider">
              Indikator #{index + 1}
            </div>
            <h4 className="text-sm sm:text-base font-bold text-foreground">
              {indicator.title}
            </h4>
          </div>
        </div>

        <Badge variant={indicator.severity} size="sm">
          {indicator.severity.toUpperCase()}
        </Badge>
      </div>

      <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed pl-0 sm:pl-[52px]">
        {indicator.description}
      </p>

      {indicator.highlightSnippet && (
        <div className="mt-3 ml-0 sm:ml-[52px] p-2.5 rounded-lg bg-background-muted border border-border/70 text-xs font-mono text-foreground break-all">
          <span className="text-[10px] text-foreground-muted block font-sans uppercase font-bold mb-0.5">
            Kutipan Terdeteksi:
          </span>
          &ldquo;{indicator.highlightSnippet}&rdquo;
        </div>
      )}
    </div>
  );
}
