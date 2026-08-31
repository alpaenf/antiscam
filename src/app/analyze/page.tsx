import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AnalyzerContainer } from '@/components/analyzer/AnalyzerContainer';

export const metadata: Metadata = {
  title: 'Periksa Pesan & Analisis Chat WhatsApp | AntiScam',
  description:
    'Deteksi indikasi scam pada pesan SMS, WhatsApp, atau file ekspor chat. Dapatkan skor risiko, detail ancaman, dan langkah keamanan yang tepat.',
};

export default function AnalyzePage() {
  return (
    <div className="py-10 md:py-16 bg-background-subtle/50 min-h-[calc(100vh-64px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-96" />}>
          <AnalyzerContainer />
        </Suspense>
      </div>
    </div>
  );
}
