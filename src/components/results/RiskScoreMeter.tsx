'use client';

import React from 'react';
import { RiskLevel } from '@/types/analysis';
import { cn } from '@/lib/utils/cn';

export interface RiskScoreMeterProps {
  score: number; // 0 - 100
  level: RiskLevel;
}

export function RiskScoreMeter({ score, level }: RiskScoreMeterProps) {
  const strokeColor = {
    low: '#16A34A',
    medium: '#D97706',
    high: '#EA580C',
    critical: '#DC2626',
  }[level];

  // SVG Circular Gauge calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* SVG Circular Meter */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={strokeColor}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Score Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {score}
          </span>
          <span className="text-[11px] font-semibold text-foreground-secondary uppercase tracking-wider">
            dari 100
          </span>
        </div>
      </div>

      {/* Helper text */}
      <p className="text-xs text-foreground-secondary mt-3">
        Skor probabilitas risiko terdeteksi
      </p>
    </div>
  );
}
