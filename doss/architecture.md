# AntiScam — Dokumen Arsitektur & Desain Sistem Frontend

Dokumen ini mendefinisikan arsitektur teknis, struktur direktori, pola manajemen state, strategi rendering, dan lapisan abstraksi API untuk aplikasi **AntiScam**.

---

## 1. Ikhtisar Arsitektur Teknologi

AntiScam dibangun dengan pendekatan **Frontend-First** menggunakan ekosistem modern yang mengutamakan performa tinggi, modularitas, keamanan sisi klien, dan pengalaman pengguna yang mulus (*seamless UX*).

```text
+-------------------------------------------------------------------------+
|                        Next.js App Router (v14+)                        |
|                                                                         |
|  +---------------------------+   +-----------------------------------+  |
|  |     Server Components     |   |         Client Components         |  |
|  |  (SEO, Landing, Layout,   |   |   (Interactive Analyzer Form,     |  |
|  |   How-It-Works, Legal)    |   |    WA Chat Parser & Visualizer,   |  |
|  |                           |   |    Dynamic Risk Score Meter)      |  |
|  +---------------------------+   +-----------------------------------+  |
|                                                    │                    |
|                                                    ▼                    |
|  +-------------------------------------------------------------------+  |
|  |                 State Management Layer (Zustand)                  |  |
|  |   - Single Message State     - WhatsApp Chat Session Store        |  |
|  |   - Analysis Results Store   - PII Masking & Filter Preferences   |  |
|  +-------------------------------------------------------------------+  |
|                                │                   │                    |
|               ┌────────────────┘                   └────────────────┐   |
|               ▼                                                     ▼   |
|  +-------------------------+                       +-----------------+  |
|  | Client-Side WA Parser   |                       | API Abstraction |  |
|  | - Regex Engine          |                       | - Error Handler |  |
|  | - PII Redaction Worker  |                       | - Retry Logic   |  |
|  +-------------------------+                       +-----------------+  |
|                                                            │            |
|                                                            ▼            |
|                                            +─────────────────────────+  |
|                                            | Mock API / Backend REST |  |
|                                            +─────────────────────────+  |
+-------------------------------------------------------------------------+
```

### 1.1 Tech Stack Primer

| Komponen | Pilihan Teknologi | Alasan Pemilihan |
| :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | Rendering hibrida (RSC untuk SEO cepat, Client Components untuk interaktivitas kaya), routing fleksibel. |
| **Bahasa** | **TypeScript 5+** | *Type safety*, meminimalkan runtime bugs pada parsing data chat dan manipulasi API payload. |
| **Styling** | **Tailwind CSS** | Styling berbasis utilitas, responsif cepat, ukuran CSS terkendali via PurgeCSS. |
| **Font** | **Poppins (Google Fonts via next/font)** | Tipografi modern, ramah pembaca, dan profesional sesuai mandat PRD. |
| **Ikonografi** | **Lucide Icons (SVG)** | Ringan, konsisten, mendukung zero-emoji rule secara ketat. |
| **State Management** | **Zustand** | Manajemen state reaktif ringan, tidak membebani render cycle React, mudah diuji. |
| **Export Engine** | **html-to-image & jsPDF** | Ekspor laporan analisis visual (PNG Card / PDF Report) 100% sisi klien. |

---

## 2. Struktur Direktori Proyek

Struktur folder dirancang modular, memisahkan logika presentasi, parsing, state, dan integrasi API:

```text
antiscam/
├── doss/                               # Dokumentasi spesifikasi teknis
│   ├── prd.md
│   ├── README.md
│   ├── whatsapp-chat-analyzer.md
│   ├── architecture.md
│   ├── api-spec.md
│   ├── design-system.md
│   ├── security-privacy.md
│   └── development-plan.md
│
├── public/                             # File statis publik
│   ├── icons/                          # SVG asset cadangan
│   ├── og-image.png                    # Gambar OpenGraph media sosial
│   └── robots.txt
│
├── src/
│   ├── app/                            # Next.js App Router (Routes & Pages)
│   │   ├── layout.tsx                  # Root layout (Font, Navbar, Footer)
│   │   ├── page.tsx                    # Landing Page (/)
│   │   ├── analyze/                    # Analyzer Core Route (/analyze)
│   │   │   └── page.tsx
│   │   ├── how-it-works/               # Edukasi alur analisis (/how-it-works)
│   │   │   └── page.tsx
│   │   ├── about/                      # Visi & Misi (/about)
│   │   │   └── page.tsx
│   │   ├── privacy/                    # Kebijakan Privasi (/privacy)
│   │   │   └── page.tsx
│   │   ├── terms/                      # Ketentuan Layanan (/terms)
│   │   │   └── page.tsx
│   │   └── not-found.tsx               # 404 Custom Page
│   │
│   ├── components/                     # Komponen UI
│   │   ├── common/                     # Komponen Umum (Header, Footer, Container)
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Footer.tsx
│   │   ├── landing/                    # Komponen Khusus Beranda
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ValuePropSection.tsx
│   │   │   ├── ExampleAnalysis.tsx
│   │   │   ├── StepGuideSection.tsx
│   │   │   └── FinalCtaSection.tsx
│   │   ├── analyzer/                   # Komponen Input & Form
│   │   │   ├── AnalyzerContainer.tsx
│   │   │   ├── ModeSwitcher.tsx        # Toggle: Teks Biasa vs WhatsApp
│   │   │   ├── SingleMessageInput.tsx
│   │   │   └── whatsapp/               # Sub-komponen WhatsApp
│   │   │       ├── WhatsAppDropzone.tsx
│   │   │       ├── WhatsAppPasteInput.tsx
│   │   │       ├── WhatsAppChatPreview.tsx
│   │   │       ├── ChatBubbleItem.tsx
│   │   │       ├── PiiToggleControl.tsx
│   │   │       └── ExportGuideModal.tsx
│   │   ├── results/                    # Komponen Penyajian Hasil Analisis
│   │   │   ├── ResultDashboard.tsx
│   │   │   ├── RiskScoreMeter.tsx      # Circular Gauge / Linear Meter
│   │   │   ├── RiskLevelBadge.tsx
│   │   │   ├── ThreatIndicatorList.tsx
│   │   │   ├── ThreatCard.tsx
│   │   │   ├── EscalationTimeline.tsx  # Timeline khusus analisis obrolan WA
│   │   │   ├── ActionRecommendations.tsx
│   │   │   └── ExportReportMenu.tsx    # Ekspor PNG / PDF / Copy Text
│   │   └── ui/                         # Komponen Dasar Reusable (Atoms)
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── Tooltip.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorNotice.tsx
│   │
│   ├── lib/                            # Logika Utilitas & Bisnis
│   │   ├── api/                        # Abstraksi API Client
│   │   │   ├── apiClient.ts
│   │   │   ├── analyzeService.ts
│   │   │   └── apiErrorHandler.ts
│   │   ├── mock/                       # Data & Engine Simulasi API
│   │   │   ├── mockAnalysisData.ts
│   │   │   └── mockApiResponse.ts
│   │   ├── parser/                     # Mesin Parser WhatsApp & PII
│   │   │   ├── whatsappParser.ts
│   │   │   ├── piiSanitizer.ts
│   │   │   └── formatDetector.ts
│   │   ├── export/                     # Helper Pembuatan Laporan
│   │   │   ├── generateImageCard.ts
│   │   │   ├── generatePdfReport.ts
│   │   │   └── formatShareText.ts
│   │   └── utils/                      # Helper Format Tanggal & Angka
│   │       ├── cn.ts                   # Class name merger (clsx + tailwind-merge)
│   │       └── formatters.ts
│   │
│   ├── stores/                         # Zustand State Stores
│   │   ├── useAnalyzerStore.ts         # Global store untuk flow analisis
│   │   └── useWhatsAppStore.ts        # Store khusus session chat WhatsApp
│   │
│   └── types/                          # Definisi Tipe TypeScript
│       ├── analysis.ts
│       ├── whatsapp.ts
│       └── api.ts
│
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. Strategi Rendering (RSC vs Client Components)

Next.js App Router membagi tanggung jawab halaman berdasarkan kebutuhan interaktivitas:

### 3.1 Server Components (RSC)
* **Target Halaman**: Beranda (`/`), Tentang Kami (`/about`), Cara Kerja (`/how-it-works`), Kebijakan Privasi (`/privacy`), Syarat & Ketentuan (`/terms`).
* **Keuntungan**:
  * Ukuran JavaScript bundle minimal yang dikirim ke browser klien.
  * Render HTML langsung di server untuk kecepatan First Contentful Paint (FCP) dan optimalisasi SEO 100%.

### 3.2 Client Components (`'use client'`)
* **Target Komponen**:
  * `AnalyzerContainer`, `SingleMessageInput`, `WhatsAppDropzone`, `WhatsAppChatPreview`.
  * `RiskScoreMeter`, `ExportReportMenu`, `MobileMenu`.
* **Keuntungan**:
  * Mengakses Web APIs (`FileReader`, `Clipboard`, `Canvas`, `Window.resize`).
  * Menangani interaksi pengguna reaktif secara instan (animasi progress, validasi karakter, seleksi pesan).

---

## 4. Pola Manajemen State (State Architecture)

Manajemen state menggunakan **Zustand** untuk memisahkan domain data tanpa menimbulkan *prop drilling*.

```text
+-------------------------------------------------------------------------+
|                          useAnalyzerStore                               |
|                                                                         |
|  - mode: 'single' | 'whatsapp'                                          |
|  - rawSingleText: string                                                |
|  - status: 'idle' | 'parsing' | 'loading' | 'success' | 'error'         |
|  - errorMessage: string | null                                          |
|  - singleResult: AnalysisResult | null                                  |
|                                                                         |
|  Actions:                                                               |
|  - setMode(mode)                                                        |
|  - setRawSingleText(text)                                               |
|  - runAnalysis()                                                        |
|  - resetState()                                                         |
+-------------------------------------------------------------------------+
                                    │
                                    │ Sinkronisasi State
                                    ▼
+-------------------------------------------------------------------------+
|                          useWhatsAppStore                               |
|                                                                         |
|  - fileName: string | null                                              |
|  - isPiiMasked: boolean (default: true)                                 |
|  - rawFileContent: string | null                                        |
|  - chatSession: ParsedWhatsAppChatSession | null                        |
|  - chatResult: WhatsAppAnalysisResult | null                            |
|                                                                         |
|  Actions:                                                               |
|  - loadFile(file: File)                                                 |
|  - loadRawText(text: string)                                            |
|  - togglePiiMasking()                                                   |
|  - toggleMessageSelection(messageId: string)                            |
|  - selectAllMessages(select: boolean)                                   |
|  - filterIncomingOnly()                                                 |
|  - resetChat()                                                          |
+-------------------------------------------------------------------------+
```

---

## 5. Arsitektur Abstraksi API & Mocking

Frontend AntiScam dirancang untuk dapat berjalan secara independen penuh (*standalone*) menggunakan Mock API maupun terhubung ke Backend AI riil melalui *toggle switch* konfigurasi environment.

```text
[ Komponen UI ]
      │
      ▼
[ analyzeService.analyzeMessage() / analyzeChat() ]
      │
      ├───► Apakah process.env.NEXT_PUBLIC_USE_MOCK === 'true' ?
      │         │
      │         ├── YA  ──► [ mockApiResponse(payload) ] (Simulasi delay 1-2 detik)
      │         │
      │         └── TIDAK ──► [ apiClient.post('/api/v1/analyze', payload) ]
      │                                │
      │                                ▼
      │                     [ Backend REST / AI Engine ]
      │
      ▼
[ Normalisasi Response & Validasi Tipe Data ]
      │
      ▼
[ Update UI State & Trigger Result View ]
```

### 5.1 Penanganan Kesalahan Terpusat (*Global Error Normalizer*)
Setiap kegagalan jaringan, timeout, atau format respons yang tidak sesuai dinormalisasi menjadi pesan yang ramah pengguna (*Human-readable Error Notice*), mencegah error teknis bocor ke antarmuka.

---

## 6. Arsitektur Parser Sisi Klien (Worker / Pure Function)

Logika parsing obrolan WhatsApp ditempatkan pada modul `src/lib/parser/whatsappParser.ts` sebagai *pure function*:
1. **Zero External Dependency**: Menggunakan *stream line-by-line processing* murni berbasis JavaScript RegExp untuk kecepatan komputasi instan (< 50ms untuk 2.000 baris obrolan).
2. **Deterministic Output**: Selalu menghasilkan model data bertipe `ParsedWhatsAppChatSession` yang stabil.
3. **PII Sanitizer Layer**: Bekerja sebelum data dikirim ke jaringan untuk memastikan nomor telepon dan nomor akun disensor di memori lokal klien terlebih dahulu jika opsi sensor aktif.
