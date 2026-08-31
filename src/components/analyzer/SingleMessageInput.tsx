'use client';

import React, { useState } from 'react';
import {
  Trash2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  FileWarning,
  Clock,
  CreditCard,
  Lock,
  Gift,
  UserX,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { useAnalyzerStore } from '@/stores/useAnalyzerStore';
import { SAMPLE_PROMPTS } from '@/lib/mock/mockAnalysisData';
import { Button } from '@/components/ui/Button';
import { ErrorNotice } from '@/components/ui/ErrorNotice';
import { cn } from '@/lib/utils/cn';

export function SingleMessageInput() {
  const {
    singleText,
    setSingleText,
    status,
    errorMessage,
    runSingleAnalysis,
    resetAnalyzer,
  } = useAnalyzerStore();

  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);

  const charLimit = 5000;
  const isLoading = status === 'loading';

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'suspicious_link':
        return <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'malicious_apk':
        return <FileWarning className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'urgency_pressure':
        return <Clock className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'financial_request':
        return <CreditCard className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'credential_harvesting':
        return <Lock className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'fake_reward':
        return <Gift className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'impersonation':
        return <UserX className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'suspicious_language':
        return <FileText className="w-3.5 h-3.5" aria-hidden="true" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />;
    }
  };

  const handleSampleClick = (sample: (typeof SAMPLE_PROMPTS)[0]) => {
    setSelectedCategoryKey(sample.categoryKey);
    setSingleText(sample.rawText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleText.trim() || isLoading) return;
    runSingleAnalysis();
  };

  return (
    <div className="space-y-6">
      {/* 8-Category Preset Tester Bar */}
      <div className="space-y-3 bg-white border border-border p-4 sm:p-5 rounded-2xl shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-foreground" aria-hidden="true" />
            <span>Pilih & Uji Contoh Modus Penipuan:</span>
          </div>
          <span className="text-[11px] text-foreground-muted hidden sm:inline">
            Klik salah satu kategori untuk mengisi teks otomatis
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {SAMPLE_PROMPTS.map((sample) => {
            const isSelected = selectedCategoryKey === sample.categoryKey;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSampleClick(sample)}
                className={cn(
                  'text-xs p-2.5 rounded-xl border text-left transition-all flex items-center gap-2',
                  isSelected
                    ? 'bg-foreground text-white border-foreground shadow-sm font-semibold'
                    : 'bg-background-subtle border-border text-foreground hover:bg-background-muted hover:border-gray-400'
                )}
              >
                <div
                  className={cn(
                    'w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0',
                    isSelected ? 'bg-white/20 text-white' : 'bg-white border border-border text-foreground'
                  )}
                >
                  {getCategoryIcon(sample.categoryKey)}
                </div>
                <span className="truncate">{sample.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Textarea Card */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white border-2 border-border rounded-2xl p-4 sm:p-5 focus-within:border-foreground transition-all shadow-sm">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-border/60">
            <label htmlFor="single-message-input" className="text-xs font-bold text-foreground">
              Area Teks Pesan yang Ingin Diperiksa:
            </label>
            {singleText && (
              <button
                type="button"
                onClick={() => {
                  setSingleText('');
                  setSelectedCategoryKey(null);
                }}
                className="text-xs text-foreground-muted hover:text-risk-critical-text flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Kosongkan Teks</span>
              </button>
            )}
          </div>

          <textarea
            id="single-message-input"
            value={singleText}
            onChange={(e) => {
              setSingleText(e.target.value.slice(0, charLimit));
              if (selectedCategoryKey) setSelectedCategoryKey(null);
            }}
            placeholder="Tempelkan (paste) potongan pesan mencurigakan di sini... (contoh: SMS undian hadiah, pesan WhatsApp tidak dikenal, tawaran pinjaman online, dll.)"
            rows={7}
            disabled={isLoading}
            className="w-full text-sm sm:text-base text-foreground placeholder:text-foreground-muted bg-transparent focus:outline-none resize-y leading-relaxed font-mono"
            aria-label="Pesan mencurigakan"
          />

          <div className="mt-3 pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-foreground-secondary">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Privasi Terjaga: Teks hanya dievaluasi untuk deteksi pola risiko.</span>
            </div>
            <div className="font-mono text-foreground-muted">
              {singleText.length} / {charLimit} karakter
            </div>
          </div>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <ErrorNotice
            message={errorMessage}
            onRetry={() => runSingleAnalysis()}
          />
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isLoading}
            disabled={!singleText.trim() || isLoading}
            className="w-full sm:w-auto min-w-[200px]"
          >
            <span>Periksa Pesan Sekarang</span>
            <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </div>
  );
}
