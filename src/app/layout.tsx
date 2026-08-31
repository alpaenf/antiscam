import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AntiScam — Know Before You Trust | Deteksi Pesan Penipuan & Chat WA',
  description:
    'Periksa pesan mencurigakan dan riwayat chat WhatsApp untuk mendeteksi indikasi penipuan, phising link, file malware APK, dan modus rekayasa sosial sebelum Anda bertindak.',
  keywords: [
    'anti scam',
    'scam detector',
    'cek pesan penipuan',
    'ekspor chat wa penipuan',
    'deteksi wa scam',
    'cek link phising',
    'malware apk kurir',
    'keamanan siber indonesia',
  ],
  authors: [{ name: 'AntiScam Security Team' }],
  metadataBase: new URL('https://antiscam.id'),
  openGraph: {
    title: 'AntiScam — Know Before You Trust',
    description:
      'Periksa pesan mencurigakan dan riwayat chat WhatsApp untuk mendeteksi indikasi penipuan sebelum mengklik link atau transfer dana.',
    url: 'https://antiscam.id',
    siteName: 'AntiScam',
    locale: 'id_ID',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={fontSans.variable}>
      <body className="font-sans min-h-screen flex flex-col bg-white text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
