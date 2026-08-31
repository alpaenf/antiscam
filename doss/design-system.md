# AntiScam — Panduan Design System & Token UI/UX

Dokumen ini mendefinisikan standar visual, token desain, tipografi, palet warna semantik, aturan ikonografi, dan spesifikasi komponen antarmuka untuk seluruh halaman aplikasi **AntiScam**.

---

## 1. Prinsip & Filosofi Desain

1. **Clean, Modern, and Minimal**: Tata letak rapi, ruang putih (*whitespace*) yang lega, tanpa dekorasi berlebihan.
2. **Trustworthy & Authoritative**: Nuansa visual yang menimbulkan rasa aman, profesional, dan meyakinkan (menghindari kesan *neon hacker / cyberpunk*).
3. **Information-First**: Hasil risiko dan rekomendasi tindakan harus dapat dipindai secara visual dalam hitungan detik.
4. **Accessible & Inclusive**: Kontras warna memenuhi standar WCAG AA/AAA, navigasi ramah keyboard, dan tidak mengandalkan warna semata untuk menyampaikan status risiko.

---

## 2. Aturan Ketat Ikonografi & Kebijakan Nol-Emoji (Strict Zero-Emoji Policy)

> [!CAUTION]
> **Emoji dilarang sepenuhnya di seluruh antarmuka pengguna.**
> Tidak boleh ada emoji (seperti ⚠️, 🚨, 🛑, 🔍, 📱, dll.) pada tombol, judul, kartu, notifikasi, footer, maupun teks pesan.
>
> Seluruh representasi visual wajib menggunakan **SVG Icons (Lucide React)** dengan stroke dan ukuran yang seragam.

### Pemetaan Ikon Lucide untuk Kategori Ancaman & Status

| Domain / Kategori | Nama Ikon Lucide | Penggunaan |
| :--- | :--- | :--- |
| **Pesan Tunggal** | `<MessageSquare className="w-5 h-5" />` | Tab mode input teks biasa |
| **Chat WhatsApp** | `<MessageCircle className="w-5 h-5" />` | Tab mode ekspor obrolan WA |
| **Unggah / Dropzone** | `<UploadCloud className="w-8 h-8" />` | Area drag & drop file `.txt` |
| **Keamanan / Verifikasi** | `<ShieldCheck className="w-5 h-5" />` | Status risiko rendah & brand icon |
| **Peringatan / Alert** | `<AlertTriangle className="w-5 h-5" />` | Status risiko sedang / tinggi |
| **Bahaya Kritis** | `<ShieldAlert className="w-5 h-5" />` | Status risiko kritis / malware |
| **Malware APK** | `<FileWarning className="w-5 h-5" />` | Indikator file APK berbahaya |
| **Link Mencurigakan** | `<ExternalLink className="w-5 h-5" />` | Indikator phising URL |
| **Urgensi Waktu** | `<Clock className="w-5 h-5" />` | Indikator tekanan psikologis |
| **Permintaan Uang** | `<CreditCard className="w-5 h-5" />` | Indikator transfer / tagihan palsu |
| **Hadiah Palsu** | `<Gift className="w-5 h-5" />` | Indikator undian fiktif |
| **Sensor PII** | `<EyeOff className="w-4 h-4" />` / `<Eye />` | Toggle masker nomor HP & data pribadi |
| **Ekspor Laporan** | `<Download className="w-4 h-4" />` | Tombol unduh laporan PDF / PNG |
| **Salin Ringkasan** | `<Copy className="w-4 h-4" />` | Tombol salin teks hasil analisis |

---

## 3. Palet Warna & Token Desain (Color Tokens)

```text
Neutral Palette (Clean Monochrome Base)
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│  #FFFFFF    │  #FAFAFA    │  #F3F4F6    │  #4B5563    │  #111827    │
│  Base Pure  │  Secondary  │ Border/Line │ Muted Text  │ Deep Black  │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘

Semantic Risk Status (Level-Specific Accents)
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  LOW        │  MEDIUM     │  HIGH       │  CRITICAL   │
│  #16A34A    │  #D97706    │  #EA580C    │  #DC2626    │
│  (Green)    │  (Amber)    │  (Orange)   │  (Red)      │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

### 3.1 Token Warna CSS & Tailwind

```typescript
// tailwind.config.ts color extensions
export const colors = {
  background: {
    DEFAULT: '#FFFFFF',
    subtle: '#FAFAFA',
    muted: '#F3F4F6',
    dark: '#111827',
  },
  foreground: {
    DEFAULT: '#111827',
    secondary: '#4B5563',
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  border: {
    DEFAULT: '#E5E7EB',
    subtle: '#F3F4F6',
    focus: '#111827',
  },
  risk: {
    low: {
      text: '#16A34A',
      bg: '#F0FDF4',
      border: '#BBF7D0',
      badge: '#DCFCE7',
    },
    medium: {
      text: '#D97706',
      bg: '#FFFBEB',
      border: '#FDE68A',
      badge: '#FEF3C7',
    },
    high: {
      text: '#EA580C',
      bg: '#FFF7ED',
      border: '#FED7AA',
      badge: '#FFEDD5',
    },
    critical: {
      text: '#DC2626',
      bg: '#FEF2F2',
      border: '#FECACA',
      badge: '#FEE2E2',
    },
  },
};
```

---

## 4. Tipografi (Typography Hierarchy)

* **Font Utama**: `Poppins, sans-serif`
* **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Skala Tipografi Responsif

| Token | Ukuran Desktop | Ukuran Mobile | Weight | Line Height | Penggunaan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `text-display` | `64px` (4rem) | `40px` (2.5rem) | 700 | `1.1` | Hero Title Landing Page |
| `text-h1` | `36px` (2.25rem) | `28px` (1.75rem) | 700 | `1.2` | Judul Halaman Utama / Result Header |
| `text-h2` | `28px` (1.75rem) | `22px` (1.375rem) | 600 | `1.3` | Judul Section / Card Group Header |
| `text-h3` | `20px` (1.25rem) | `18px` (1.125rem) | 600 | `1.4` | Judul Indikator / Step Title |
| `text-body` | `16px` (1rem) | `15px` (0.938rem) | 400 | `1.6` | Teks Paragraf / Isi Deskripsi |
| `text-small` | `14px` (0.875rem) | `13px` (0.813rem) | 500 | `1.5` | Helper Text / Timestamp / Sub-label |
| `text-caption` | `12px` (0.75rem) | `11px` (0.688rem) | 500 | `1.4` | Badges / Disclaimer / PII Tags |

---

## 5. Spesifikasi Komponen Utama

### 5.1 Mode Switcher (Tab Selector)
* Container abu-abu muda (`#F3F4F6`, rounded `12px`, padding `4px`).
* Tab aktif: Latar belakang putih (`#FFFFFF`), shadow halus `shadow-sm`, border tipis `#E5E7EB`, teks hitam tebal `font-semibold`.
* Tab tidak aktif: Latar belakang transparan, teks abu-abu `#6B7280`, transisi warna saat hover.

### 5.2 Area Unggah WhatsApp Dropzone
* Latar belakang: `#FAFAFA` dengan garis tepi putus-putus (*dashed border* `#D1D5DB`, tebal `2px`, rounded `16px`).
* Status Hover / Drag-Over: Border berubah menjadi solid `#111827`, latar belakang `#F3F4F6`.
* Ikon: Lucide `<UploadCloud />` ukuran `36px`.
* Teks Aksi: *"Tarik & lepas file .txt ekspor chat di sini, atau pilih dari perangkat."*

### 5.3 Balon Percakapan WhatsApp (Chat Bubble Visualizer)
* **Balon Lawan Bicara (Incoming)**:
  * Posisi: Rata kiri.
  * Latar belakang: `#F3F4F6`, border `#E5E7EB`, rounded `16px 16px 16px 4px`.
  * Header balon: Nama kontak (font tebal `13px`), stempel waktu (`11px` abu-abu).
* **Balon Pengguna (Outgoing)**:
  * Posisi: Rata kanan.
  * Latar belakang: `#111827` (Dark Slate), teks putih `#FFFFFF`, rounded `16px 16px 4px 16px`.
* **Balon Disorot Ancaman (Flagged Bubble)**:
  * Border tebal `2px` merah semantik (`#DC2626`) atau oranye (`#EA580C`).
  * Lencana kecil di pojok balon: `<AlertTriangle />` + label ancaman ringkas.

### 5.4 Meter Skor Risiko (Risk Score Meter)
* Visualisasi ganda:
  1. **Circular Radial Gauge**: Lingkaran persentase dinamis (skala 0–100) dengan animasi *stroke-dashoffset*.
  2. **Risk Status Pill**: Badge berukuran besar dengan ikon perisai dan label teks tegas (`CRITICAL RISK`, `HIGH RISK`, `MEDIUM RISK`, `LOW RISK`).
* Selalu disertai penjelasan teks ringkas di bawah angka skor.

---

## 6. Standar Responsif & Aksesibilitas (Responsive & A11y Rules)

1. **Touch Targets**: Semua tombol dan elemen interaktif minimal berukuran `44px x 44px` pada perangkat mobile.
2. **No Horizontal Overflow**: Seluruh komponen, tabel, dan balon chat dibungkus dalam kontainer `overflow-x-hidden` dengan `break-words`.
3. **Focus States**: Setiap elemen form (textarea, input, tombol) memiliki *visible focus ring* (`focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2`).
4. **Screen Reader Labels**: Elemen ikon murni wajib memiliki atribut `aria-hidden="true"`, sedangkan tombol dengan ikon saja wajib memiliki `aria-label`.
