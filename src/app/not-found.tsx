import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
      <div className="w-16 h-16 rounded-2xl bg-background-muted border border-border flex items-center justify-center mb-6">
        <ShieldAlert className="w-8 h-8 text-foreground" aria-hidden="true" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-2">
        404 — Halaman Tidak Ditemukan
      </h1>
      <p className="text-sm sm:text-base text-foreground-secondary max-w-md mb-8">
        Halaman yang Anda cari mungkin telah dipindahkan atau tautan yang Anda tuju salah.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link href="/">
          <Button variant="primary" size="md">
            <Home className="w-4 h-4 mr-1.5" aria-hidden="true" />
            <span>Kembali ke Beranda</span>
          </Button>
        </Link>
        <Link href="/analyze">
          <Button variant="outline" size="md">
            <span>Periksa Pesan</span>
            <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
