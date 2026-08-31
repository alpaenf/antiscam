import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-background-subtle border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Image
                src="/logo.png"
                alt="AntiScam"
                width={130}
                height={34}
                className="h-7 w-auto object-contain"
              />
            </Link>
            <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed">
              Know Before You Trust. Alat keamanan independen untuk mendeteksi indikasi penipuan pada pesan teks dan percakapan WhatsApp.
            </p>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Produk
            </h4>
            <ul className="space-y-2.5 text-sm text-foreground-secondary">
              <li>
                <Link href="/analyze" className="hover:text-foreground transition-colors">
                  Periksa Pesan
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="hover:text-foreground transition-colors">
                  Analisis Ekspor WhatsApp
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-foreground transition-colors">
                  Cara Kerja
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Tentang
            </h4>
            <ul className="space-y-2.5 text-sm text-foreground-secondary">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  Tentang AntiScam
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#categories" className="hover:text-foreground transition-colors">
                  Kategori Penipuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Legalitas & Privasi
            </h4>
            <ul className="space-y-2.5 text-sm text-foreground-secondary">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Kebijakan Privasi (PII)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-foreground-muted gap-4">
          <p>© 2026 AntiScam. Seluruh hak cipta dilindungi.</p>
          <p>
            Data chat diproses secara lokal di browser Anda untuk perlindungan privasi.
          </p>
        </div>
      </div>
    </footer>
  );
}
