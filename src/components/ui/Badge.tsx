import React from 'react';
import { cn } from '@/lib/utils/cn';
import { RiskLevel } from '@/types/analysis';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'neutral' | 'outline' | RiskLevel;
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({
  className,
  children,
  variant = 'neutral',
  size = 'md',
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center font-medium select-none rounded-full transition-colors';

  const variants = {
    default: 'bg-foreground text-white',
    neutral: 'bg-background-muted text-foreground-secondary',
    outline: 'border border-border text-foreground-secondary bg-white',
    low: 'bg-risk-low-badge text-risk-low-text border border-risk-low-border',
    medium: 'bg-risk-medium-badge text-risk-medium-text border border-risk-medium-border',
    high: 'bg-risk-high-badge text-risk-high-text border border-risk-high-border',
    critical: 'bg-risk-critical-badge text-risk-critical-text border border-risk-critical-border font-semibold',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
