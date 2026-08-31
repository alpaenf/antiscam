import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils/cn';

export interface ErrorNoticeProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorNotice({ message, onRetry, className }: ErrorNoticeProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-xl bg-risk-critical-bg border border-risk-critical-border text-risk-critical-text flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm',
        className
      )}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <AlertCircle className="w-5 h-5 flex-shrink-0 text-risk-critical-text" aria-hidden="true" />
        <span className="font-medium">{message}</span>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="border-risk-critical-border text-risk-critical-text hover:bg-white flex-shrink-0"
        >
          Coba Lagi
        </Button>
      )}
    </div>
  );
}
