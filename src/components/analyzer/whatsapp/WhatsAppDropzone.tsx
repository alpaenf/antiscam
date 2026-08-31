'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, HelpCircle, Sparkles, FolderOpen } from 'lucide-react';
import { useWhatsAppStore } from '@/stores/useWhatsAppStore';
import { SAMPLE_PROMPTS } from '@/lib/mock/mockAnalysisData';
import { Button } from '@/components/ui/Button';
import { ExportGuideModal } from './ExportGuideModal';
import { WhatsAppPasteInput } from './WhatsAppPasteInput';
import { cn } from '@/lib/utils/cn';

export function WhatsAppDropzone() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [inputTab, setInputTab] = useState<'upload' | 'paste'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { loadFile, loadRawText, status } = useWhatsAppStore();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      loadFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      loadFile(file);
    }
  };

  const handleSampleClick = (rawText: string, title: string) => {
    loadRawText(rawText, title);
  };

  return (
    <div className="space-y-6">
      {/* Tab Selector inside WhatsApp module */}
      <div className="flex items-center justify-between">
        <div className="flex bg-background-muted p-1 rounded-xl border border-border">
          <button
            type="button"
            onClick={() => setInputTab('upload')}
            className={cn(
              'text-xs font-semibold px-3 py-1.5 rounded-lg transition-all',
              inputTab === 'upload'
                ? 'bg-white text-foreground shadow-xs'
                : 'text-foreground-secondary hover:text-foreground'
            )}
          >
            Unggah File .txt
          </button>
          <button
            type="button"
            onClick={() => setInputTab('paste')}
            className={cn(
              'text-xs font-semibold px-3 py-1.5 rounded-lg transition-all',
              inputTab === 'paste'
                ? 'bg-white text-foreground shadow-xs'
                : 'text-foreground-secondary hover:text-foreground'
            )}
          >
            Paste Teks Manual
          </button>
        </div>

        {/* Guide Trigger Button */}
        <button
          type="button"
          onClick={() => setIsGuideOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs text-foreground-secondary hover:text-foreground underline underline-offset-4"
        >
          <HelpCircle className="w-3.5 h-3.5 text-foreground" aria-hidden="true" />
          <span>Cara Ekspor Chat WA?</span>
        </button>
      </div>

      {inputTab === 'upload' ? (
        /* Drag & Drop Area */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 bg-background-subtle hover:bg-white hover:border-foreground',
            isDragOver ? 'border-foreground bg-gray-100 scale-[0.99]' : 'border-border'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,text/plain"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-white border border-border mx-auto flex items-center justify-center text-foreground mb-4 shadow-sm group-hover:scale-105 transition-transform">
            <UploadCloud className="w-8 h-8 text-foreground" aria-hidden="true" />
          </div>

          <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
            Tarik & Lepas File Ekspor Chat WhatsApp (.txt)
          </h3>
          <p className="text-xs sm:text-sm text-foreground-secondary max-w-md mx-auto mb-6">
            Pilih file hasil <em>Export Chat (Without Media)</em> dari aplikasi WhatsApp Anda.
          </p>

          <Button variant="outline" size="md" className="gap-2 pointer-events-none">
            <FolderOpen className="w-4 h-4" aria-hidden="true" />
            <span>Pilih File dari Perangkat</span>
          </Button>

          <div className="mt-4 text-[11px] text-foreground-muted">
            Maksimal ukuran file: 5 MB • File dibaca 100% secara lokal di browser Anda.
          </div>
        </div>
      ) : (
        <WhatsAppPasteInput />
      )}

      {/* Quick Sample Chats */}
      <div className="pt-2 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground-secondary uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-foreground" aria-hidden="true" />
          <span>Atau Coba Contoh Kasus Nyata Penipuan WhatsApp:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROMPTS.filter((s) => s.type === 'whatsapp').map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleSampleClick(sample.rawText, sample.label)}
              className="text-xs px-3 py-2 rounded-xl border border-border bg-white text-foreground hover:bg-background-subtle hover:border-foreground transition-all flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-foreground" aria-hidden="true" />
              <span>{sample.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Panduan Ekspor */}
      <ExportGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
}
