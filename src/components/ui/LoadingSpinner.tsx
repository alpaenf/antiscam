import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  subLabel?: string;
}

export function LoadingSpinner({
  className,
  size = 'md',
  label = 'Menganalisis Pesan...',
  subLabel = 'Memeriksa indikator risiko, phising, dan pola rekayasa sosial...',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-14 h-14 border-4',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      <div
        className={cn(
          'rounded-full border-border border-t-foreground animate-spin mb-4',
          sizeClasses[size]
        )}
        role="status"
        aria-label="Memuat"
      />
      {label && <h4 className="text-base font-semibold text-foreground">{label}</h4>}
      {subLabel && (
        <p className="text-xs md:text-sm text-foreground-secondary mt-1 max-w-sm">
          {subLabel}
        </p>
      )}
    </div>
  );
}
