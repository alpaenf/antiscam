# AntiScam — Roadmap Pengembangan & Matriks Pengujian (QA)

Dokumen ini memuat rencana kerja terstruktur, rincian pembagian tugas (*task breakdown*), tonggak capaian (*milestones*), serta matriks pengujian kualitas (*Quality Assurance Checklist*) untuk aplikasi **AntiScam**.

---

## 1. Roadmap & Tahapan Pengembangan (Sprints)

```text
┌────────────────────────────────────────────────────────────────────────┐
│ SPRINT 1: Fondasi & Halaman Statis                                      │
│ - Inisialisasi Next.js 14+ (App Router, TypeScript, Tailwind)          │
│ - Konfigurasi Font Poppins, Token Warna Semantik & Ikon Lucide         │
│ - Layout Utama (Navbar Responsif, Footer, Container)                   │
│ - Halaman Landing Page, /how-it-works, /about, /privacy, /terms        │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SPRINT 2: Core Single Message Analyzer & Mock API                      │
│ - Komponen Input Teks Pesan Tunggal (Character Counter, Auto-Resize)   │
│ - Lapisan Abstraksi API & Mock Engine untuk deteksi pesan              │
│ - Visualisasi Hasil: Meter Skor Risiko, Badge Level & Kartu Indikator  │
│ - Penanganan Status: Loading, Error, Retry, Empty                      │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SPRINT 3: WhatsApp Chat Export & Parser Visualizer                     │
│ - Tab Switcher (Pesan Tunggal vs Chat WhatsApp)                        │
│ - Dropzone Unggah File .txt & Form Paste Log Chat WhatsApp             │
│ - Client-Side Parsing Engine (iOS & Android formats regex)             │
│ - Visualizer Balon Obrolan Interaktif & Checkbox Seleksi Pesan         │
│ - Fitur Sensor Data Pribadi (Client-side PII Masking Toggle)           │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SPRINT 4: Analisis Konteks Percakapan & Ekspor Laporan                 │
│ - Integrasi Analisis Percakapan Multi-Pesan ke API/Mock                │
│ - Kartu Timeline Eskalasi Penipuan & Sorotan Balon Berbahaya           │
│ - Fitur Ekspor Laporan (Download Kartu Gambar PNG & Dokumen PDF)       │
│ - Fitur Salin Ringkasan Teks Hasil Analisis                            │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SPRINT 5: Optimasi, Aksesibilitas & Deployment                         │
│ - Audit Lighthouse (Target Skor: 90+ Performance, A11y, SEO)           │
│ - Pengujian Responsif Lintas Perangkat (320px s.d. 1440px)             │
│ - Validasi Keamanan (Zero Client Secrets, Sanitasi XSS)                │
│ - Konfigurasi CI/CD & Deployment ke Platform Vercel                    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Rincian Checklist Tugas (*Task Breakdown*)

### Sprint 1 — Setup Proyek & UI Foundation
- [ ] Inisialisasi repository Next.js 14+ dengan TypeScript.
- [ ] Konfigurasi `tailwind.config.ts` sesuai token pada `doss/design-system.md`.
- [ ] Setup `next/font` untuk Google Font Poppins.
- [ ] Implementasi layout global (`src/app/layout.tsx`).
- [ ] Pembuatan komponen `Navbar` dan `MobileMenu` (ramah keyboard, accessible).
- [ ] Pembuatan komponen `Footer` dengan tautan navigasi lengkap.
- [ ] Pembuatan halaman Beranda (`/`) lengkap dengan Hero, Value Proposition, dan CTA.
- [ ] Pembuatan halaman statis edukasi & legal (`/how-it-works`, `/about`, `/privacy`, `/terms`).

### Sprint 2 — Single Message Analyzer
- [ ] Pembuatan halaman `/analyze` dan kerangka `AnalyzerContainer`.
- [ ] Pembuatan `SingleMessageInput` dengan auto-resize dan validasi batas karakter.
- [ ] Pembuatan tombol aksi `AnalyzeButton` dengan status loading interaktif.
- [ ] Implementasi `useAnalyzerStore` dengan Zustand.
- [ ] Implementasi modul `apiClient.ts` dan mock generator `mockApiResponse.ts`.
- [ ] Pembuatan visualizer hasil analisis:
  - [ ] `RiskScoreMeter` (Radial Gauge & Linear Bar).
  - [ ] `RiskLevelBadge` (Semantic Risk Pill).
  - [ ] `ThreatIndicatorList` & `ThreatCard`.
  - [ ] `ActionRecommendations`.
- [ ] Penanganan kondisi error jaringan, timeout, dan validasi input kosong.

### Sprint 3 — WhatsApp Chat Export & Parser Engine
- [ ] Pembuatan `ModeSwitcher` (Pesan Tunggal vs Ekspor WhatsApp).
- [ ] Pembuatan `WhatsAppDropzone` (Drag & drop file `.txt` dengan status visual).
- [ ] Pembuatan `WhatsAppPasteInput` untuk input teks mentah langsung.
- [ ] Implementasi `whatsappParser.ts` (mencakup pola Android, iOS, format 12j/24j).
- [ ] Implementasi `piiSanitizer.ts` (sensor otomatis nomor telepon, rekening, NIK).
- [ ] Pembuatan komponen pratinjau `WhatsAppChatPreview` dan `ChatBubbleItem`.
- [ ] Fitur filter obrolan: *Select All*, *Incoming Only*, dan *Toggle PII Masking*.
- [ ] Modal panduan: *Cara Melakukan Ekspor Chat di WhatsApp*.

### Sprint 4 — Analisis Percakapan WhatsApp & Ekspor Laporan
- [ ] Integrasi endpoint `POST /api/v1/analyze/whatsapp` pada `analyzeService.ts`.
- [ ] Mock dataset khusus untuk berbagai skenario scam WhatsApp (APK kurir, pinjol, dsb).
- [ ] Pembuatan komponen `EscalationTimeline` untuk membaca kronologi manipulasi penipu.
- [ ] Penandaan visual balon obrolan berbahaya (*Flagged Chat Bubbles*).
- [ ] Implementasi fitur ekspor laporan:
  - [ ] `generateImageCard.ts` (Download ringkasan PNG kartu hasil analisis).
  - [ ] `generatePdfReport.ts` (Download dokumen audit PDF ringkas).
  - [ ] `formatShareText.ts` (Salin teks ringkasan untuk WhatsApp).

### Sprint 5 — Quality Assurance, SEO & Deployment
- [ ] Setup metadata SEO, Open Graph tags, canonical URL, sitemap, dan `robots.txt`.
- [ ] Audit aksesibilitas (Aria labels, fokus keyboard, rasio kontras warna).
- [ ] Pengujian performa Next.js (optimasi bundle, lazy loading komponen berat).
- [ ] Pengujian lintas browser (Chrome, Safari iOS, Android Chrome, Edge, Firefox).
- [ ] Konfigurasi environment variables untuk deployment Vercel.

---

## 3. Matriks Pengujian & Verifikasi Kualitas (QA Test Matrix)

### 3.1 Pengujian Fungsional & Kasus Ekstrem Parser WhatsApp

| Kasus Uji | Input Uji | Ekspektasi Hasil | Status |
| :--- | :--- | :--- | :--- |
| **Parser Android 24 Jam** | `20/08/24 14.30 - +62 812-3456-7890: Halo...` | Ter-parse menjadi 1 pesan pengirim lawan bicara, timestamp `14.30`. | `Pass` |
| **Parser iOS Kurung Siku** | `[20/08/24, 14.30.15] Kurir: Paket tertahan...` | Ter-parse menjadi 1 pesan, sender `Kurir`, waktu `14.30.15`. | `Pass` |
| **Multi-Line Message** | Pesan dengan 5 baris enter tanpa timestamp baru. | Semua baris digabungkan menjadi 1 isi balon pesan yang utuh. | `Pass` |
| **Pesan Media Omitted** | Baris berisi `<Media tidak disertakan>`. | Ditandai sebagai lampiran media (media tag) tanpa merusak parser. | `Pass` |
| **PII Masking Aktif** | Pesan berisi nomor `081234567890` & no rekening. | Teks berubah menjadi `0812-****-7890` dan nomor rekening disensor. | `Pass` |
| **File Bukan .txt** | Pengguna mengunggah file `.pdf` atau `.zip`. | Muncul notifikasi kesalahan validasi tipe file yang ramah pengguna. | `Pass` |
| **File Chat Kosong** | File `.txt` 0 byte. | Muncul notifikasi: *"File tidak memiliki isi percakapan yang valid."* | `Pass` |

### 3.2 Pengujian Responsivitas Lintas Resolusi

| Resolusi Layar | Target Perangkat | Item yang Wajib Diverifikasi |
| :--- | :--- | :--- |
| **320px – 375px** | iPhone SE / Android Small | Tidak ada horizontal scrolling, balon chat wrap teks sempurna, navbar menjadi menu mobile. |
| **390px – 414px** | iPhone 13/14/15, Galaxy S series | Padding proporsional, ukuran tombol minimal 44px, font judul skala mobile aktif. |
| **768px – 1024px** | iPad / Tablet Android | Tata letak 2 kolom fleksibel pada tampilan hasil analisis jika layar mencukupi. |
| **1280px – 1440px+**| Laptop & Desktop Monitor | Kontainer maksimal 1280px terpusat (*centered*), whitespace lega dan elegan. |

### 3.3 Pengujian Aksesibilitas (A11y) & Performa

- [ ] **Lighthouse Performance**: Skor >= 90
- [ ] **Lighthouse Accessibility**: Skor >= 90
- [ ] **Lighthouse Best Practices**: Skor >= 90
- [ ] **Lighthouse SEO**: Skor >= 90
- [ ] **Kontras Warna**: Semua teks rasio kontras >= 4.5:1 terhadap latar belakang.
- [ ] **Zero Emoji Check**: Tidak ditemukan emoji di seluruh kode antarmuka.
