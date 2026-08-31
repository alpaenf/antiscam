'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAnalyzerStore } from '@/stores/useAnalyzerStore';
import { useWhatsAppStore } from '@/stores/useWhatsAppStore';
import { SAMPLE_PROMPTS } from '@/lib/mock/mockAnalysisData';
import { ModeSwitcher } from './ModeSwitcher';
import { SingleMessageInput } from './SingleMessageInput';
import { WhatsAppDropzone } from './whatsapp/WhatsAppDropzone';
import { WhatsAppChatPreview } from './whatsapp/WhatsAppChatPreview';
import { ResultDashboard } from '@/components/results/ResultDashboard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function AnalyzerContainer() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const {
    mode,
    setMode,
    setSingleText,
    status: singleStatus,
    singleResult,
    resetAnalyzer,
  } = useAnalyzerStore();

  const {
    chatSession,
    status: waStatus,
    chatResult,
    resetWhatsApp,
  } = useWhatsAppStore();

  useEffect(() => {
    if (categoryParam) {
      const match = SAMPLE_PROMPTS.find((s) => s.categoryKey === categoryParam);
      if (match) {
        setMode('single');
        setSingleText(match.rawText);
      }
    }
  }, [categoryParam, setMode, setSingleText]);

  const isSingleLoading = singleStatus === 'loading';
  const isWaLoading = waStatus === 'loading';

  useEffect(() => {
    if (isSingleLoading || isWaLoading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isSingleLoading, isWaLoading]);

  // If single message analysis is completed
  if (singleResult) {
    return (
      <ResultDashboard
        data={singleResult}
        onReset={resetAnalyzer}
        isWhatsApp={false}
      />
    );
  }

  // If WhatsApp analysis is completed
  if (chatResult) {
    return (
      <ResultDashboard
        data={chatResult}
        onReset={resetWhatsApp}
        isWhatsApp={true}
      />
    );
  }

  return (
    <div className="space-y-8 min-h-[600px]">
      {/* Header Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          Apakah Pesan Ini Aman?
        </h1>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          Pilih salah satu contoh kategori modus penipuan di bawah, atau tempelkan pesan / unggah file chat WhatsApp Anda.
        </p>
      </div>

      {/* Mode Switcher */}
      <ModeSwitcher activeMode={mode} onChange={setMode} />

      {/* Main Mode View */}
      {isSingleLoading || isWaLoading ? (
        <div className="bg-white border border-border rounded-3xl p-12 sm:p-20 shadow-sm min-h-[450px] flex items-center justify-center">
          <LoadingSpinner
            size="lg"
            label={isWaLoading ? 'Menganalisis Alur Chat WhatsApp...' : 'Menganalisis Pesan...'}
            subLabel="Memeriksa pola rekayasa sosial, phising link, file berbahaya, dan manipulasi waktu..."
          />
        </div>
      ) : mode === 'single' ? (
        <SingleMessageInput />
      ) : chatSession ? (
        <WhatsAppChatPreview />
      ) : (
        <WhatsAppDropzone />
      )}
    </div>
  );
}
