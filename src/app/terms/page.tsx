import React from 'react';
import type { Metadata } from 'next';
import { AlertCircle, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan Layanan | AntiScam',
  description:
    'Syarat penggunaan layanan AntiScam, batasan tanggung jawab, serta disclaimer evaluasi risiko otomatis.',
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="text-xs font-bold text-foreground-secondary uppercase tracking-wider">
            Legalitas Layanan
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Syarat & Ketentuan Layanan
          </h1>
          <p className="text-xs sm:text-sm text-foreground-muted">
            Terakhir diperbarui: 31 Agustus 2026
          </p>
        </div>

        {/* Disclaimer Callout */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" aria-hidden="true" />
            <span>Penting: Disclaimer Evaluasi Risiko Otomatis</span>
          </div>
          <p className="text-xs leading-relaxed">
            AntiScam adalah alat bantu edukasi berbasis deteksi pola. Hasil analisis skor risiko, indikator, dan rekomendasi bukan merupakan nasihat hukum, audit forensik resmi, atau jaminan mutlak bahwa sebuah pesan 100% aman atau 100% scam. Selalu gunakan pertimbangan akal sehat dan verifikasi mandiri ke kontak resmi institusi terkait.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="prose prose-sm max-w-none text-foreground-secondary space-y-8 leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              1. Penerimaan Ketentuan
            </h2>
            <p>
              Dengan mengakses dan menggunakan website AntiScam, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan kami.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              2. Penggunaan yang Diizinkan
            </h2>
            <p>
              Layanan AntiScam disediakan secara gratis untuk keperluan pribadi dalam memverifikasi pesan mencurigakan. Anda dilarang memanfaatkan layanan ini untuk:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm">
              <li>Melakukan serangan *Denial of Service (DoS)* atau membebani infrastruktur API.</li>
              <li>Menyalahgunakan output analisis untuk menuduh atau merugikan pihak lain secara melawan hukum.</li>
              <li>Mencoba mengekstrak data sensitif milik orang lain tanpa izin yang sah.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              3. Batasan Tanggung Jawab
            </h2>
            <p>
              Pengembang AntiScam tidak bertanggung jawab atas kerugian materiil, finansial, atau non-materiil yang timbul akibat tindakan pengguna setelah membaca hasil analisis pada website ini. Keputusan untuk mengklik tautan, mentransfer uang, atau mengabaikan pesan sepenuhnya berada di bawah tanggung jawab pengguna secara mandiri.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              4. Ketersediaan Layanan
            </h2>
            <p>
              Kami berusaha menjaga agar layanan selalu dapat diakses 24/7, namun kami tidak menjamin layanan akan selalu bebas dari gangguan teknis, pemeliharaan berkala, atau kegagalan koneksi pihak ketiga.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
