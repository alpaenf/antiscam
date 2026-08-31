import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Button } from '@/components/ui/Button';

export function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24 bg-foreground text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Menerima Pesan yang Mencurigakan?
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
          Jangan langsung percaya. Periksa teks atau unggah riwayat chat WhatsApp Anda sebelum mengklik, membayar, atau membagikan informasi berharga.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/analyze" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto min-w-[220px]">
              <span>Periksa Pesan Sekarang</span>
              <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
            </Button>
          </Link>
          <Link href="/analyze" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-gray-600 text-white hover:bg-white/10"
            >
              <WhatsAppIcon colored size={18} className="mr-2" />
              <span>Ekspor Chat WhatsApp</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
