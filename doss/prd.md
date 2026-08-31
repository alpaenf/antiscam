# AntiScam

## Product Requirements Document

**Product Name:** AntiScam
**Product Type:** Web Application
**Primary Scope:** Frontend Development
**Framework:** Next.js
**Language:** TypeScript
**Styling:** Tailwind CSS
**Deployment:** Vercel
**Primary Font:** Poppins
**Icon System:** SVG / Lucide Icons
**Design Direction:** Clean, Modern, Premium, Minimal, Trustworthy

---

# 1. Product Overview

AntiScam adalah aplikasi web yang membantu pengguna memahami apakah sebuah pesan memiliki indikasi penipuan atau scam.

Pengguna dapat memasukkan pesan yang mencurigakan ke dalam aplikasi. Sistem kemudian memberikan hasil analisis berupa tingkat risiko, skor risiko, indikator yang terdeteksi, penjelasan, dan rekomendasi tindakan.

Pada tahap awal, proyek berfokus pada **frontend development**.

Frontend tidak bertanggung jawab terhadap:

* AI model
* Machine learning
* Scam detection engine
* Classification algorithm
* Database
* Backend processing

Frontend akan menerima hasil analisis dari backend melalui API dan menyajikannya dalam interface yang mudah dipahami.

---

# 2. Product Vision

Membuat proses pemeriksaan pesan mencurigakan menjadi sederhana, cepat, dan mudah dipahami oleh pengguna umum.

Core experience:

**Paste → Analyze → Understand → Act**

AntiScam harus membuat pengguna dapat menjawab tiga pertanyaan:

1. Seberapa berisiko pesan ini?
2. Apa yang membuat pesan ini mencurigakan?
3. Apa yang sebaiknya saya lakukan?

---

# 3. Product Positioning

AntiScam bukan sekadar aplikasi yang memberikan label:

> "SCAM"

Produk harus memberikan konteks mengenai alasan sebuah pesan dianggap berisiko.

Positioning:

> **A simple security tool that helps people understand suspicious messages before they take action.**

Tagline utama:

> **Know Before You Trust.**

Alternative tagline yang dapat dipertimbangkan:

> Think Before You Click.

Namun tagline utama untuk MVP adalah:

> **Know Before You Trust.**

---

# 4. Problem Statement

Penipuan digital semakin sering menggunakan pesan yang terlihat meyakinkan.

Pengguna sering menerima pesan yang:

* Mengaku berasal dari bank
* Menawarkan hadiah
* Meminta transfer
* Meminta OTP
* Meminta password
* Mengarahkan pengguna ke website tertentu
* Menggunakan tekanan waktu
* Mengaku sebagai orang atau organisasi tertentu

Masalah utama bukan hanya pengguna tidak mengetahui apakah pesan tersebut scam.

Masalahnya adalah pengguna juga sering tidak memahami:

* Mengapa pesan tersebut mencurigakan
* Indikator apa yang perlu diperhatikan
* Apa yang sebaiknya dilakukan setelah menerima pesan

AntiScam dirancang untuk membantu menjawab masalah tersebut.

---

# 5. Goals

## Primary Goals

Frontend harus:

1. Menyediakan interface deteksi pesan yang sangat mudah digunakan.
2. Memiliki visual clean, modern, premium, dan trustworthy.
3. Menampilkan hasil analisis dengan jelas.
4. Menjelaskan indikator risiko dengan bahasa sederhana.
5. Memberikan rekomendasi tindakan.
6. Responsive pada mobile, tablet, dan desktop.
7. Siap diintegrasikan dengan backend API.
8. Dapat dikembangkan menggunakan mock API sebelum backend selesai.
9. SEO-ready.
10. Memiliki performance yang baik.
11. Memiliki accessibility dasar yang baik.

---

# 6. Non-Goals

Hal-hal berikut berada di luar scope frontend MVP:

* Membuat model AI
* Training machine learning model
* Membuat algoritma scam detection
* Database development
* Authentication system
* User account management
* Admin dashboard
* Backend infrastructure
* Model monitoring
* Data labeling
* Cybersecurity threat intelligence infrastructure

Frontend hanya bertugas mengirim input dan menampilkan hasil dari sistem backend.

---

# 7. Target Users

## Primary Users

Pengguna internet umum yang menerima pesan mencurigakan.

Contoh:

* Pelajar
* Mahasiswa
* Orang tua
* Karyawan
* Pemilik bisnis kecil
* Pengguna aktif WhatsApp
* Pengguna media sosial

## User Characteristics

Pengguna tidak harus memahami:

* Cybersecurity
* Machine learning
* AI
* Risk scoring
* Threat intelligence

Interface harus dapat dipahami tanpa pengetahuan teknis.

---

# 8. Use Cases

## Use Case 1 — Suspicious WhatsApp Message

User menerima pesan:

> "Selamat! Anda mendapatkan hadiah Rp10.000.000. Klik link berikut untuk klaim."

User menyalin pesan tersebut ke AntiScam.

AntiScam menampilkan:

**HIGH RISK**

Indikator:

* Fake Reward
* Suspicious Link
* Urgency

Kemudian memberikan rekomendasi:

> Do not click the link or provide personal information.

---

## Use Case 2 — Suspicious Bank Message

User menerima pesan yang mengaku berasal dari bank.

User memasukkan pesan.

Sistem memberikan analisis:

* Impersonation
* Credential Request
* Urgency

User kemudian memahami bahwa pesan tersebut membutuhkan verifikasi lebih lanjut.

---

## Use Case 3 — Low Risk Message

User memasukkan pesan yang tidak memiliki indikator scam signifikan.

Sistem memberikan:

**LOW RISK**

Namun frontend tetap menampilkan disclaimer bahwa hasil analisis bukan jaminan mutlak bahwa pesan tersebut aman.

---

# 9. Core User Journey

```text
User
  |
  v
Landing Page
  |
  v
Check a Message
  |
  v
Message Input
  |
  v
Analyze
  |
  v
Loading State
  |
  v
Backend API
  |
  v
Analysis Result
  |
  +--> Risk Level
  |
  +--> Risk Score
  |
  +--> Indicators
  |
  +--> Explanation
  |
  +--> Recommendation
  |
  v
Analyze Another Message
```

---

# 10. Information Architecture

Struktur halaman utama:

```text
/
├── /analyze
├── /how-it-works
├── /about
├── /privacy
├── /terms
└── /contact
```

Tidak semua halaman harus masuk navbar.

---

# 11. Navbar

Navbar desktop:

```text
AntiScam

How It Works
About

[ Check a Message ]
```

Logo mengarah ke homepage.

Primary CTA:

**Check a Message**

Navbar harus tetap sederhana.

Tidak boleh menambahkan menu hanya untuk membuat navbar terlihat penuh.

---

# 12. Mobile Navigation

Pada mobile:

```text
AntiScam                         Menu
```

Ketika menu dibuka:

```text
How It Works
About
Privacy
Terms
Contact

[ Check a Message ]
```

Requirements:

* Accessible
* Keyboard friendly
* Clear open/close state
* Tidak mengganggu konten
* Tidak menyebabkan horizontal overflow
* Memiliki focus state

---

# 13. Home Page

Route:

`/`

Tujuan:

* Menjelaskan AntiScam
* Membangun trust
* Mengedukasi user
* Mengarahkan user ke analyzer

---

## 13.1 Hero

Headline:

> **Know Before You Trust.**

Description:

> Analyze suspicious messages and understand the risks before clicking, paying, or sharing sensitive information.

Primary CTA:

> **Check a Message**

Secondary CTA:

> **How It Works**

Hero visual:

Mockup interface analyzer/result.

---

# 14. Value Proposition

Tiga benefit utama:

### Detect

Identify suspicious patterns.

### Understand

See why a message may be risky.

### Act

Know what to do next.

Visual harus minimal.

---

# 15. Example Analysis

Homepage menampilkan contoh analisis.

Contoh input:

```text
Congratulations!
You have won Rp10.000.000.

Click the link below to claim
your reward.
```

Example result:

```text
HIGH RISK

82 / 100

Detected Indicators

Suspicious Link
Urgency
Fake Reward
```

Tujuannya agar pengguna memahami produk tanpa harus mencobanya terlebih dahulu.

---

# 16. How It Works Preview

Tiga langkah:

### 01 — Paste

Paste the suspicious message.

### 02 — Analyze

The system analyzes potential scam indicators.

### 03 — Understand

Review the risk and recommended action.

CTA:

**Learn How It Works**

---

# 17. Detection Categories

Frontend harus mampu menampilkan kategori yang dikirim oleh backend.

Contoh kategori:

* Suspicious Link
* Urgency
* Financial Request
* Credential Request
* Fake Reward
* Impersonation
* Suspicious Language
* Unknown Sender

Kategori harus bersifat dynamic.

Frontend tidak boleh mengasumsikan semua kategori selalu tersedia.

---

# 18. Final CTA

Homepage bagian akhir:

Headline:

> **Got a suspicious message?**

Description:

> Check it before you click, pay, or share information.

CTA:

**Check a Message**

---

# 19. Analyze Page

Route:

`/analyze`

Ini adalah halaman inti produk.

---

## 19.1 Header

Heading:

> **Is this message safe?**

Description:

> Paste a suspicious message below and find out what makes it risky.

---

# 20. Message Input

Textarea harus menjadi elemen paling dominan.

Placeholder:

> Paste a suspicious message here...

Requirements:

* Minimum usable height
* Auto resize
* Character counter
* Clear action
* Focus state
* Disabled state
* Error state
* Accessible label
* Mobile friendly

Character limit dapat ditentukan kemudian berdasarkan API.

Contoh:

```text
0 / 5000 characters
```

---

# 21. Analyze Button

Primary CTA:

> **Analyze Message**

Button:

* Disabled jika input kosong
* Loading state saat API request
* Tidak dapat ditekan berkali-kali selama request
* Accessible
* Responsive

---

# 22. Loading State

Saat request berlangsung:

```text
Analyzing your message

Checking for suspicious patterns...
```

Requirements:

* Subtle animation
* Clear status
* Tidak menghilangkan input user
* Tidak membuat user mengira browser freeze
* Prevent duplicate requests

---

# 23. Result State

Setelah API berhasil:

```text
Analysis Result

HIGH RISK

82 / 100

This message contains several
indicators commonly associated
with scam attempts.
```

Result harus mudah dipindai secara visual.

---

# 24. Risk Levels

MVP menggunakan empat risk level.

## LOW

Tidak ditemukan indikator mencurigakan yang signifikan.

## MEDIUM

Terdapat beberapa pola yang perlu diperhatikan.

## HIGH

Terdapat indikator kuat yang berkaitan dengan scam.

## CRITICAL

Terdapat indikator yang sangat berisiko dan membutuhkan perhatian serius.

Risk level harus ditampilkan sebagai:

* Text
* Visual indicator
* Optional semantic color

Warna tidak boleh menjadi satu-satunya indikator.

---

# 25. Risk Score

Format:

```text
82 / 100
```

Score dapat divisualisasikan menggunakan:

* Circular progress
* Progress bar
* Meter

Score harus selalu disertai risk level.

Frontend tidak menentukan score.

Frontend hanya menampilkan score yang dikirim backend.

---

# 26. Result Summary

Contoh:

> This message contains several indicators commonly associated with scam attempts.

Summary berasal dari backend.

Frontend hanya bertugas menampilkan data.

---

# 27. Threat Indicators

Setiap indicator minimal memiliki:

* Title
* Description
* Icon

Contoh:

### Suspicious Link

The message contains an unfamiliar external URL.

### Urgency

The message pressures the recipient to act quickly.

### Financial Request

The message requests money or payment.

---

# 28. Why Is This Risky?

Section:

> **Why is this risky?**

Menjelaskan alasan hasil analisis.

Format:

```text
01
Suspicious Link

The message contains an unfamiliar URL.

02
Urgency

The sender pressures the recipient
to act quickly.

03
Financial Request

The message requests payment.
```

Bahasa harus sederhana.

---

# 29. Recommendation

Section:

> **Recommended Action**

Contoh:

> Do not click the link or send money. Verify the sender through an official channel before taking action.

Recommendation berasal dari backend.

Frontend harus dapat menangani recommendation dengan panjang berbeda.

---

# 30. Analyze Another Message

CTA:

**Analyze Another Message**

Ketika dipilih:

* Result dibersihkan
* Input kembali kosong
* Focus kembali ke textarea jika memungkinkan

---

# 31. Error States

Frontend wajib menangani:

### Empty Input

> Please enter a message first.

### API Error

> We couldn't analyze this message right now.

CTA:

**Try Again**

### Timeout

> The analysis is taking too long. Please try again.

### Invalid Response

> We received an unexpected response. Please try again.

### Network Error

> Unable to connect to the analysis service.

Error state harus tetap menggunakan design system yang sama.

---

# 32. How It Works Page

Route:

`/how-it-works`

Sections:

1. Hero
2. Paste
3. Analyze
4. Assess
5. Take Action
6. Risk Levels
7. Safety Disclaimer
8. CTA

---

# 33. About Page

Route:

`/about`

Sections:

### What is AntiScam?

Penjelasan singkat mengenai produk.

### Why We Built It

Masalah yang ingin diselesaikan.

### Our Approach

Clarity, Safety, Transparency.

### Transparency

Jelaskan bahwa hasil otomatis dapat memiliki keterbatasan.

---

# 34. Privacy Page

Route:

`/privacy`

Harus menjelaskan:

* Pemrosesan pesan
* Penyimpanan pesan
* Data retention
* Penggunaan data
* Third-party services
* Data security

Isi harus sesuai implementasi backend sebenarnya.

---

# 35. Terms Page

Route:

`/terms`

Mencakup:

* Terms of use
* User responsibility
* Service limitations
* Disclaimer
* Availability

Disclaimer harus menjelaskan bahwa hasil otomatis bukan jaminan mutlak bahwa pesan scam atau aman.

---

# 36. Contact Page

Route:

`/contact`

Optional untuk MVP.

Jika dibuat:

* Contact email
* Feedback form
* Basic contact information

Jangan membuat form tanpa backend/email service yang benar-benar berfungsi.

---

# 37. Footer

Footer:

```text
AntiScam

Product
Check Message
How It Works

Company
About
Contact

Legal
Privacy
Terms

© 2026 AntiScam
```

---

# 38. Responsive Design Requirement

Responsive design adalah **mandatory requirement**, bukan enhancement.

Aplikasi harus usable pada:

* 320px
* 360px
* 375px
* 390px
* 414px
* 480px
* 768px
* 1024px
* 1280px
* 1440px+

---

# 39. Mobile-First Strategy

Development harus mempertimbangkan mobile sejak awal.

Jangan:

```text
Desktop Design
↓
Shrink
↓
Mobile
```

Gunakan:

```text
Responsive System
↓
Mobile
↓
Tablet
↓
Desktop
```

---

# 40. Mobile Requirements

Pada mobile:

* Tidak boleh horizontal scrolling.
* Text harus readable.
* CTA harus mudah ditekan.
* Textarea harus nyaman digunakan.
* Result cards harus stack secara vertical.
* Navbar menjadi mobile menu.
* Padding harus disesuaikan.
* Typography harus responsive.
* Risk score tetap mudah dilihat.
* Indicator cards tidak boleh terlalu sempit.

---

# 41. Tablet Requirements

Pada tablet:

* Gunakan layout dua kolom jika ruang mencukupi.
* Jika tidak, stack menjadi satu kolom.
* Navbar harus tetap readable.
* Form dan result tidak boleh terlalu melebar.

---

# 42. Desktop Requirements

Pada desktop:

* Content maksimal sekitar 1200–1280px.
* Gunakan whitespace yang cukup.
* Analyzer dapat menggunakan two-column layout.
* Result dapat menggunakan grid.
* Jangan membuat content terlalu melebar.

---

# 43. Responsive Breakpoint Guidance

Default Tailwind breakpoints dapat digunakan.

```text
sm
md
lg
xl
2xl
```

Tidak perlu membuat breakpoint custom tanpa kebutuhan nyata.

---

# 44. Design System

## Primary Background

`#FFFFFF`

## Secondary Background

`#FAFAFA`

## Primary Text

`#111111`

## Secondary Text

`#666666`

## Border

`#E5E5E5`

---

# 45. Risk Colors

LOW:

Green

MEDIUM:

Amber

HIGH:

Orange

CRITICAL:

Red

Risk colors hanya digunakan sebagai semantic indicators.

Jangan menggunakan risk color sebagai warna utama seluruh halaman.

---

# 46. Typography

Font utama:

**Poppins**

Weights:

* 400
* 500
* 600
* 700

Typography harus responsive.

Desktop hero:

56–72px

Mobile hero:

40–48px

Body:

16–18px desktop

14–16px mobile

---

# 47. Iconography

**Emoji dilarang sepenuhnya.**

Tidak boleh menggunakan emoji pada:

* Navbar
* Button
* Card
* Error
* Empty state
* Loading state
* Risk result
* Marketing content
* Footer
* Notification

Gunakan:

* SVG
* Lucide Icons
* Custom SVG

Icon harus konsisten secara ukuran dan stroke.

---

# 48. Visual Style

Gunakan:

* White space
* Minimal borders
* Subtle shadows
* Moderate border radius
* Strong typography
* Clean hierarchy

Recommended radius:

12px
16px
20px

Hindari:

* Heavy shadows
* Excessive gradients
* Excessive glassmorphism
* Neon cybersecurity style
* Excessive 3D
* Random illustrations
* Decorative clutter

---

# 49. Animation

Animation harus subtle.

Gunakan untuk:

* Button feedback
* Loading
* Result appearance
* Mobile menu
* Page transition jika diperlukan

Jangan menggunakan animation hanya karena bisa.

Performance tetap menjadi prioritas.

---

# 50. Accessibility

Minimum requirement:

* Semantic HTML
* Proper heading hierarchy
* Accessible form labels
* Keyboard navigation
* Visible focus states
* Accessible buttons
* Screen-reader friendly status
* Sufficient contrast
* Color-independent risk indicators

---

# 51. Frontend Architecture

Technology:

Next.js

Language:

TypeScript

Styling:

Tailwind CSS

Deployment:

Vercel

Font:

Poppins

Icons:

SVG / Lucide

---

# 52. Rendering Strategy

Gunakan Server Components sebagai default.

Gunakan Client Components hanya jika membutuhkan:

* User interaction
* Browser APIs
* Local state
* Animation tertentu
* Interactive form

---

# 53. Suggested Directory Structure

```text
app/
├── page.tsx
├── analyze/
│   └── page.tsx
├── how-it-works/
│   └── page.tsx
├── about/
│   └── page.tsx
├── privacy/
│   └── page.tsx
└── terms/
    └── page.tsx

components/
├── navbar/
├── hero/
├── message-input/
├── analyze-button/
├── loading-state/
├── risk-score/
├── risk-badge/
├── threat-card/
├── threat-list/
├── result-summary/
├── recommendation/
├── footer/
└── ui/

lib/
├── api/
├── mock/
└── utils/

types/
└── analysis.ts

public/
├── icons/
└── images/
```

---

# 54. Component Principles

Components harus:

* Reusable
* Small
* Focused
* Composable
* Accessible

Hindari satu component/page yang terlalu besar.

---

# 55. API Integration

Frontend menggunakan abstraction layer.

Flow:

```text
Component
    ↓
analyzeMessage()
    ↓
API
    ↓
Response
    ↓
UI State
```

API request tidak boleh tersebar langsung di berbagai component.

---

# 56. Environment Variables

Gunakan:

```env
NEXT_PUBLIC_API_URL=
```

API URL tidak boleh di-hardcode.

Secret key tidak boleh berada di client-side environment variable.

---

# 57. Mock API

Frontend harus dapat dikembangkan tanpa menunggu backend.

Mock response harus menggunakan struktur data yang sama dengan API sebenarnya.

Example:

```json
{
  "riskLevel": "high",
  "riskScore": 82,
  "summary": "This message contains multiple scam indicators.",
  "indicators": [
    {
      "title": "Suspicious Link",
      "description": "The message contains an unfamiliar URL."
    },
    {
      "title": "Urgency",
      "description": "The message pressures the recipient to act quickly."
    }
  ],
  "recommendation": "Do not click the link or send money."
}
```

---

# 58. API Responsibility

Backend:

* Detection
* Classification
* Risk calculation
* Indicator generation
* Recommendation generation

Frontend:

* Input
* Request
* Loading
* Error handling
* Result presentation
* User interaction

Frontend tidak boleh melakukan scam classification sendiri.

---

# 59. SEO Requirements

Homepage harus SEO-ready.

Target keywords:

* anti scam
* scam detector
* scam message checker
* suspicious message checker
* cek pesan penipuan
* cek chat penipuan
* deteksi pesan scam
* cek pesan WhatsApp penipuan
* AI scam detector
* deteksi penipuan online

---

# 60. SEO Metadata

Title:

**AntiScam — Know Before You Trust**

Description:

**Analyze suspicious messages and detect potential scam indicators before clicking links, sending money, or sharing sensitive information.**

Implement:

* Metadata
* Open Graph
* Canonical
* Sitemap
* robots.txt
* Semantic HTML
* Proper H1
* Heading hierarchy

SEO copy harus natural.

Jangan keyword stuffing.

---

# 61. Performance Requirements

Target:

Lighthouse Performance:

**90+**

Accessibility:

**90+**

SEO:

**90+**

Gunakan:

* Next.js optimization
* Optimized images
* Optimized fonts
* Minimal client-side JavaScript
* Lazy loading
* Server Components where appropriate

---

# 62. Security Considerations

Frontend harus:

* Tidak menyimpan API secret
* Tidak mengekspos credential
* Tidak menyimpan pesan sensitif secara permanen tanpa alasan
* Menghindari unsafe HTML rendering
* Sanitize data jika diperlukan
* Tidak menampilkan raw API errors kepada user

---

# 63. User Experience Rules

Primary action harus selalu jelas.

User tidak boleh bertanya:

> "Sekarang saya harus klik apa?"

Prioritas visual:

1. Input
2. Analyze
3. Risk
4. Explanation
5. Recommendation

---

# 64. Empty State

Ketika belum ada pesan:

```text
Paste a suspicious message
to analyze its potential risk.
```

CTA:

**Analyze Message**

---

# 65. Result State Hierarchy

Urutan visual:

```text
Risk Level
↓
Risk Score
↓
Summary
↓
Detected Indicators
↓
Why It Is Risky
↓
Recommendation
↓
Analyze Another Message
```

---

# 66. Error Handling

Error harus:

* Singkat
* Jelas
* Tidak teknis
* Actionable

Jangan menampilkan:

```text
AxiosError: ECONNRESET
```

User tidak membutuhkan kisah tragis network stack.

---

# 67. Browser Support

Target modern browsers:

* Chrome
* Edge
* Firefox
* Safari

Mobile:

* iOS Safari
* Android Chrome

Tidak perlu mendukung browser legacy kecuali ada requirement khusus.

---

# 68. Deployment

Platform:

**Vercel**

Workflow:

```text
GitHub
↓
Feature Branch
↓
Pull Request
↓
Vercel Preview
↓
Review
↓
Merge
↓
Production
```

Environment variables dikelola melalui Vercel.

---

# 69. Development Workflow

Setiap feature:

1. Buat branch.
2. Implementasi.
3. Test local.
4. Test responsive.
5. Test accessibility.
6. Run lint.
7. Review Vercel Preview.
8. Submit Pull Request.
9. Review.
10. Merge.

---

# 70. Testing Requirements

Minimum testing:

### Functional

* Input message
* Empty input
* Analyze
* Loading
* Success
* Error
* Retry
* Analyze again

### Responsive

Test:

* 320px
* 375px
* 768px
* 1024px
* 1280px
* 1440px

### Accessibility

Test:

* Keyboard navigation
* Focus
* Labels
* Contrast
* Screen reader basics

---

# 71. MVP Scope

## Must Have

* Homepage
* Navbar
* Footer
* Analyze page
* Message input
* Analyze button
* Loading state
* Result state
* Risk score
* Risk level
* Threat indicators
* Explanation
* Recommendation
* Error state
* Responsive layout
* SEO
* Accessibility
* Mock API
* API abstraction
* Vercel deployment

## Should Have

* How It Works
* About
* Privacy
* Terms
* Subtle animations
* Open Graph metadata

## Could Have

* Contact
* Analysis history
* Screenshot upload
* URL analysis
* Share result

## Won't Have in MVP

* Authentication
* User dashboard
* Database
* Admin dashboard
* Browser extension
* Mobile application
* AI model
* ML training pipeline

---

# 72. Future Features

Phase 2:

### Screenshot Analysis

Upload screenshot → OCR → Scam Analysis.

### URL Checker

Analyze suspicious URLs separately.

### Analysis History

Store previous analyses.

### Shareable Report

Generate a public/private result summary.

### Browser Extension

Analyze suspicious content directly from browser.

### Multi-language

Indonesian and English.

---

# 73. Success Metrics

## Product

* User understands primary CTA immediately.
* User can perform an analysis without instructions.
* User understands the result.
* User understands recommended action.

## Technical

* Lighthouse Performance 90+
* Lighthouse Accessibility 90+
* Lighthouse SEO 90+
* Responsive across supported breakpoints
* No critical console errors
* No horizontal overflow
* API error states handled correctly

---

# 74. Definition of Done

MVP dianggap selesai apabila:

* Homepage selesai.
* Analyzer selesai.
* Result interface selesai.
* Loading state selesai.
* Error state selesai.
* Mock API berjalan.
* API integration layer siap.
* Responsive pada mobile.
* Responsive pada tablet.
* Responsive pada desktop.
* Tidak ada horizontal overflow.
* Semua CTA berfungsi.
* Navbar responsive.
* Footer responsive.
* SEO metadata tersedia.
* Accessibility dasar tersedia.
* Poppins digunakan.
* Tidak ada emoji dalam UI.
* Semua icon menggunakan SVG.
* API URL menggunakan environment variable.
* Tidak ada API secret di client.
* Project dapat di-deploy ke Vercel.
* Production build berhasil.

---

# 75. Non-Negotiable Rules

1. **Frontend-first.**
2. **Next.js wajib digunakan.**
3. **TypeScript wajib digunakan.**
4. **Vercel digunakan untuk deployment.**
5. **Poppins menjadi font utama.**
6. **Visual dominan putih dengan black sebagai primary UI.**
7. **Design harus clean, modern, premium, dan minimal.**
8. **Responsive adalah requirement wajib.**
9. **Mobile harus dirancang sejak awal, bukan sekadar mengecilkan desktop.**
10. **Tidak boleh ada emoji dalam bentuk apa pun di UI.**
11. **Gunakan SVG untuk seluruh iconography.**
12. **Frontend tidak boleh memiliki scam detection logic.**
13. **Backend dianggap external API.**
14. **Frontend harus memiliki mock API.**
15. **API URL tidak boleh di-hardcode.**
16. **Secret tidak boleh diekspos ke client.**
17. **Risk level tidak boleh bergantung pada warna saja.**
18. **Loading, error, empty, success wajib tersedia.**
19. **SEO homepage wajib diperhatikan.**
20. **Accessibility dasar wajib diterapkan.**
21. **Tidak menambahkan dependency tanpa alasan yang jelas.**
22. **Tidak membuat fitur di luar scope MVP tanpa kebutuhan yang jelas.**
23. **Jangan mengorbankan usability demi visual.**
24. **Jangan menggunakan excessive animation.**
25. **Jangan menggunakan neon cybersecurity aesthetic.**
26. **Jangan menggunakan excessive glassmorphism.**
27. **Jangan menggunakan heavy shadows.**
28. **Jangan membuat UI yang bergantung pada screen width tertentu.**
29. **Semua data hasil analisis harus berasal dari API/mock API.**
30. **Semua klaim produk harus sesuai kemampuan sistem sebenarnya.**

---

# 76. Final Product Principle

AntiScam harus mengikuti prinsip:

> **Simple enough for everyone. Clear enough to trust. Useful enough to act.**

Produk bukan dibuat untuk terlihat paling kompleks.

Produk dibuat agar ketika seseorang menerima pesan mencurigakan, mereka dapat membuka AntiScam, memasukkan pesan tersebut, dan dalam beberapa detik memahami:

**"Apa risikonya, kenapa berisiko, dan apa yang harus saya lakukan."**
