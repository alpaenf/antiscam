import React from 'react';
import { RiskLevel } from '@/types/analysis';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface RiskLevelBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskLevelBadge({ level, size = 'lg' }: RiskLevelBadgeProps) {
  const getIcon = () => {
    switch (level) {
      case 'low':
        return <ShieldCheck className="w-4 h-4" aria-hidden="true" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4" aria-hidden="true" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4" aria-hidden="true" />;
      case 'critical':
        return <ShieldAlert className="w-4 h-4" aria-hidden="true" />;
    }
  };

  const getLabel = () => {
    switch (level) {
      case 'low':
        return 'RISIKO RENDAH (LOW RISK)';
      case 'medium':
        return 'RISIKO SEDANG (MEDIUM RISK)';
      case 'high':
        return 'RISIKO TINGGI (HIGH RISK)';
      case 'critical':
        return 'BAHAYA KRITIS (CRITICAL RISK)';
    }
  };

  return (
    <Badge variant={level} size={size}>
      {getIcon()}
      <span>{getLabel()}</span>
    </Badge>
  );
}
