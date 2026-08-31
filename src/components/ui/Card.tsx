import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'elevated' | 'bordered';
}

export function Card({
  className,
  children,
  variant = 'default',
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-white border border-border rounded-2xl p-6 shadow-sm',
    subtle: 'bg-background-subtle border border-border/60 rounded-2xl p-6',
    elevated: 'bg-white border border-border/80 rounded-2xl p-6 shadow-md',
    bordered: 'bg-transparent border-2 border-border rounded-2xl p-6',
  };

  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
