import { create } from 'zustand';
import { SingleAnalysisResponse } from '@/types/analysis';
import { analyzeSingleMessage } from '@/lib/api/analyzeService';

export type AnalyzerMode = 'single' | 'whatsapp';
export type AnalyzerStatus = 'idle' | 'loading' | 'success' | 'error';

interface AnalyzerState {
  mode: AnalyzerMode;
  singleText: string;
  status: AnalyzerStatus;
  errorMessage: string | null;
  singleResult: SingleAnalysisResponse | null;

  setMode: (mode: AnalyzerMode) => void;
  setSingleText: (text: string) => void;
  runSingleAnalysis: () => Promise<void>;
  resetAnalyzer: () => void;
}

export const useAnalyzerStore = create<AnalyzerState>((set, get) => ({
  mode: 'single',
  singleText: '',
  status: 'idle',
  errorMessage: null,
  singleResult: null,

  setMode: (mode) => set({ mode }),
  setSingleText: (singleText) => set({ singleText, errorMessage: null }),

  runSingleAnalysis: async () => {
    const { singleText } = get();
    if (!singleText.trim()) {
      set({ errorMessage: 'Silakan masukkan pesan yang ingin diperiksa terlebih dahulu.' });
      return;
    }

    set({ status: 'loading', errorMessage: null, singleResult: null });

    try {
      const result = await analyzeSingleMessage({
        messageText: singleText.trim(),
        clientTimestamp: new Date().toISOString(),
      });
      set({ status: 'success', singleResult: result });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Gagal menganalisis pesan. Silakan coba kembali.';
      set({ status: 'error', errorMessage: message });
    }
  },

  resetAnalyzer: () => {
    set({
      singleText: '',
      status: 'idle',
      errorMessage: null,
      singleResult: null,
    });
  },
}));
