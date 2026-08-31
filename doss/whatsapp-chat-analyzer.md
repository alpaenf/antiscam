# AntiScam — Spesifikasi Fitur Analisis Ekspor Chat WhatsApp

Dokumen ini mendefinisikan spesifikasi fungsional, teknis, antarmuka pengguna (UI/UX), dan alur parsing untuk **Fitur Analisis Ekspor Chat WhatsApp (WhatsApp Chat Export & Analyzer)** pada aplikasi AntiScam.

---

## 1. Latar Belakang & Motivasi

Penipuan digital (social engineering, phising, APK malware, fake reward, pinjaman online ilegal, impersonasi bank) sering kali tidak terjadi hanya dalam satu kalimat pendek, melainkan dalam bentuk **rangkaian percakapan bertahap (conversational grooming/manipulation)** di WhatsApp.

Pengguna sering kali merasa bingung saat membaca percakapan panjang dan ingin memvalidasi seluruh obrolan dengan cara mengekspor riwayat obrolan dari WhatsApp (`.txt`) atau menempelkan potongan log chat.

Fitur **WhatsApp Chat Analyzer** memungkinkan pengguna:
1. Mengunggah file `.txt` hasil ekspor chat dari aplikasi WhatsApp (Android maupun iOS).
2. Menempelkan (*paste*) teks log percakapan langsung ke form input khusus obrolan.
3. Membaca dan mem-parsing percakapan menjadi tampilan visual balon pesan (*chat bubbles preview*) yang interaktif.
4. Menganalisis percakapan secara keseluruhan (*Full Conversation Risk Assessment*) maupun per balon pesan tertentu (*Suspicious Bubble Highlight*).
5. Menyaring data pribadi (*Client-side PII Masking*) demi keamanan privasi.
6. Mengekspor hasil laporan ringkasan analisis risiko (*Export Analysis Report*).

---

## 2. User Journey & Flow

```text
[ Pengguna di WhatsApp ]
         │
         ▼
[ Ekspor Chat (Tanpa Media / Without Media) ]
         │
         ▼  (Dihasilkan file .txt)
[ Masuk ke Halaman AntiScam /analyze ]
         │
         ├───► Tab 1: Single Message Input (Pesan Teks Biasa)
         │
         └───► Tab 2: WhatsApp Chat Analyzer (Ekspor Chat WA)
                   │
                   ├── Opsi A: Drag & Drop / Upload file `.txt`
                   └── Opsi B: Paste teks log ekspor WhatsApp
                             │
                             ▼
                   [ Client-Side Parser Engine ]
                   (Validasi format, ekstraksi timestamp, sender, text)
                             │
                             ▼
                   [ Visualizer Balon Obrolan (Preview UI) ]
                   - Toggle PII Masking (Sensor No HP / Nama / Rekening)
                   - Opsi Filter / Seleksi pesan tertentu vs Analisis Semua
                             │
                             ▼
                   [ Klik "Analisis Percakapan" ]
                             │
                             ▼
                   [ Loading State dengan Progress Indikator ]
                             │
                             ▼
                   [ Tampilan Hasil Analisis Komprehensif ]
                   - Tingkat Risiko Obrolan (Overall Conversation Risk)
                   - Timeline Titik Kritis Penipuan (Scam Escalation Phase)
                   - Indikator Ancaman yang Terdeteksi
                   - Sorotan Pesan Berbahaya (Flagged Bubbles)
                   - Rekomendasi Langkah Aman Tindak Lanjut
                             │
                             ▼
                   [ Ekspor Laporan Analisis ]
                   (Download Ringkasan / Copy Link / Print PDF Card)
```

---

## 3. Format Ekspor WhatsApp yang Didukung (Parsing Specification)

WhatsApp memiliki berbagai variasi format timestamp dan penamaan tergantung pada sistem operasi (Android vs iOS), pengaturan bahasa, dan format waktu (12 jam AM/PM vs 24 jam).

### 3.1 Varian Format Umum

#### Varian 1: Android (24 Jam & 12 Jam)
```text
20/08/24 14.30 - +62 812-3456-7890: Halo kak, ada promo cashback 500rb dari Bank XYZ.
20/08/24 14.31 - Anda: Wah beneran min? Gimana caranya?
20/08/24 14.32 - +62 812-3456-7890: Cukup instal aplikasi verifikasi berikut: bit.ly/bankxyz-update.apk
```

#### Varian 2: Android (Format Internasional / Koma & Titik Dua)
```text
20/08/2024, 14:30 - John Doe: Selamat! Anda memenangkan undian berhadiah.
20/08/2024, 14:31 - John Doe: Segera konfirmasi data diri Anda.
```

#### Varian 3: iOS (Kurung Siku `[...]`)
```text
[20/08/24, 14.30.15] +62 812-9988-7766: Selamat siang, ini dari layanan kurir paket.
[20/08/24, 14.31.02] +62 812-9988-7766: Paket Anda tertahan, silakan unduh surat jalan di https://surat-paket-lacak.xyz/resi.apk
[20/08/24, 14.32.40] User: Baik saya cek dulu.
```

#### Varian 4: iOS 12 Jam (AM / PM / b.d. / a.m. / p.m.)
```text
[8/20/24, 2:30:15 PM] Support Center: Mohon kirimkan kode OTP 6 digit yang masuk ke SMS Anda.
```

### 3.2 Penanganan Pesan Khusus & Multi-Line

1. **Multi-line Messages**: Jika sebuah baris baru tidak diawali pola timestamp yang valid, baris tersebut secara otomatis digabungkan (*appended*) ke isi pesan sebelumnya.
2. **System Messages**: Menghilangkan atau menandai pesan sistem bawaan WhatsApp seperti:
   * `Messages and calls are end-to-end encrypted.`
   * `Pesan dan panggilan dienkripsi secara end-to-end.`
   * `You deleted this message.` / `Anda telah menghapus pesan ini.`
3. **Media Omitted Tags**: Mendeteksi dan menandai pesan berisi attachment media yang tidak terikut dalam file teks:
   * `<Media omitted>` / `<Media tidak disertakan>`
   * `image omitted` / `document omitted` / `audio omitted`

---

## 4. Logika Parser Sisi Klien (Client-Side Parsing Engine)

Demi menjaga performa antarmuka dan privasi pengguna, parsing dilakukan 100% di browser sebelum dikirim ke API.

### 4.1 Regular Expression (RegEx) Pattern Rules

```typescript
// Pola pengenalan baris pesan WhatsApp
export const WA_PATTERNS = {
  // Pola iOS: [DD/MM/YY, HH.mm.ss] Sender: Message
  IOS_BRACKET: /^\[(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}),?\s+(\d{1,2}[:.]\d{2}(?:[:.]\d{2})?(?:\s?[APap][Mm])?)\]\s+([^:]+):\s+(.*)$/,
  
  // Pola Android: DD/MM/YY, HH.mm - Sender: Message atau DD/MM/YYYY HH:mm - Sender: Message
  ANDROID_STANDARD: /^(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}),?\s+(\d{1,2}[:.]\d{2}(?:[:.]\d{2})?(?:\s?[APap][Mm])?)\s+-\s+([^:]+):\s+(.*)$/,
  
  // Deteksi Pesan Sistem (Enkripsi / Keamanan)
  SYSTEM_NOTICE: /(end-to-end encrypt|enkripsi end-to-end|security code changed|kode keamanan berubah)/i,
  
  // Deteksi Media Omitted
  MEDIA_OMITTED: /<media (omitted|tidak disertakan)>|((image|video|audio|document|sticker|contact card)\s+omitted)/i,
};
```

### 4.2 Data Model Obrolan Parsed (TypeScript Interface)

```typescript
export interface ParsedWhatsAppMessage {
  id: string;             // UUID unik untuk setiap balon
  timestampRaw: string;   // e.g. "20/08/24, 14.30"
  sender: string;         // e.g. "+62 812-3456-7890" atau "Layanan Pelanggan"
  isOutgoing: boolean;    // true jika pengguna sendiri ("You" / "Anda"), false jika lawan bicara
  content: string;        // Isi pesan teks asli / tersanitasi
  hasMediaTag: boolean;   // true jika pesan mengandung <Media omitted>
  isSelected: boolean;    // status seleksi untuk analisis
  flaggedRisk?: 'low' | 'medium' | 'high' | 'critical'; // diisi setelah API mengembalikan hasil
  flaggedReason?: string; // e.g. "Permintaan instalasi file .APK mencurigakan"
}

export interface ParsedWhatsAppChatSession {
  fileName?: string;
  totalMessages: number;
  participants: string[];
  firstMessageDate?: string;
  lastMessageDate?: string;
  messages: ParsedWhatsAppMessage[];
  sanitized: boolean;     // apakah PII Masking sedang aktif
}
```

---

## 5. Komponen Antarmuka Pengguna (UI/UX)

Antarmuka WhatsApp Chat Analyzer dirancang dengan nuansa **Clean, Modern, Minimal, dan Trustworthy** sesuai standar PRD (Poppins font, dominan warna putih/abu-abu netral, ikon Lucide, tanpa emoji).

### 5.1 Mode Switcher (Input Mode Selector)

Pada halaman `/analyze`, disediakan selector mode yang bersih:

```text
+-----------------------------------+-----------------------------------+
|   [Ikon Pesan] Single Message     |   [Ikon Obrolan] WhatsApp Chat    |
+-----------------------------------+-----------------------------------+
```

### 5.2 File Dropzone & Paste Box

Area unggah file WhatsApp dirancang intuitif:
* **Drag-and-Drop Target**: Area penerima file `.txt` dengan status visual hover (*dashed border transition*).
* **Direct Paste Box**: Textarea sekunder bagi pengguna yang menyalin beberapa baris chat secara manual tanpa menyimpan file `.txt`.
* **Petunjuk Panduan Ekspor (Helper Card)**: Accordion mini "Cara Ekspor Chat dari WhatsApp":
  1. Buka percakapan yang mencurigakan di WhatsApp.
  2. Ketuk menu titik tiga (Android) atau ketuk nama kontak di atas (iOS).
  3. Pilih **Lainnya (More)** → **Ekspor Chat (Export Chat)**.
  4. Pilih **Tanpa Media (Without Media)**.
  5. Simpan file `.txt` dan unggah ke AntiScam.

### 5.3 Interactive Chat Timeline Preview (Visualizer)

Setelah file berhasil di-parse:
1. **Header Obrolan**: Menampilkan jumlah pesan yang terdeteksi, daftar nama/nomor lawan bicara, dan toggle **"Sensor Data Pribadi (PII Masking)"**.
2. **Balon Percakapan (Chat Bubbles)**:
   * Balon lawan bicara (kiri, latar belakang abu-abu terang `#F3F4F6`, border `#E5E7EB`).
   * Balon pengguna (kanan, latar belakang `#111827`, teks putih `#FFFFFF`).
   * Checkbox seleksi pada setiap balon jika pengguna ingin mengecualikan pesan obrolan santai yang tidak relevan.
3. **Quick Selection Controls**:
   * Tombol: "Pilih Semua Pesan" (`Select All`).
   * Tombol: "Pilih Hanya Pesan Lawan Bicara" (`Incoming Only`).
   * Tombol: "Pilih Pesan dengan Link/File" (`Auto-Detect Suspicious Lines`).

### 5.4 Tombol Aksi Utama (Action Bar)

* **Primary CTA**: `Analisis Percakapan WhatsApp (X Pesan Dipilih)`.
* **Secondary Action**: `Ganti File / Bersihkan Percakapan`.

---

## 6. Integrasi Analisis & Output Hasil (Analysis Results)

Ketika analisis percakapan selesai dilakukan, sistem menampilkan hasil spesifik untuk obrolan multi-pesan:

### 6.1 Ringkasan Risiko Obrolan (Conversation Risk Card)

1. **Overall Risk Badge**: `LOW`, `MEDIUM`, `HIGH`, atau `CRITICAL`.
2. **Conversational Risk Score**: Skala 0–100.
3. **Pola Modus yang Teridentifikasi (Scam Archetype)**:
   * *Contoh*: "Social Engineering: Impersonasi Kurir Ekspedisi via File APK".
4. **Analisis Fase Eskalasi (Scam Escalation Flow)**:
   * *Fase 1 (Approach)*: Membuka percakapan dengan nada mendesak mengenai kiriman paket.
   * *Fase 2 (Hook/Bait)*: Mengirimkan dokumen yang diklaim sebagai resi pelacakan.
   * *Fase 3 (Malicious Action)*: Menginstruksikan pengunduhan file berekstensi `.apk`.

### 6.2 Sorotan Balon Berbahaya (Flagged Chat Bubbles)

Pada visualizer obrolan, balon-balon pesan yang memiliki indikator penipuan diberi highlight border warna semantik:
* Garis border merah/oranye dengan badge kecil Lucide `AlertTriangle`.
* Mengetuk balon yang disorot akan membuka tooltip penjelasan spesifik: mengapa kalimat tersebut dianggap berisiko tinggi.

### 6.3 Rekomendasi Tindakan Cepat (Actionable Steps)

* Jangan mengunduh atau mengeksekusi file `.apk`.
* Jangan membagikan kode OTP atau PIN perbankan.
* Laporkan nomor pengirim ke WhatsApp (Fitur Report & Block).
* Konfirmasi langsung ke kontak resmi lembaga terkait.

---

## 7. Fitur Ekspor Laporan Hasil (Export Analysis Report)

Sesuai kebutuhan pengguna untuk membagikan atau menyimpan hasil investigasi pesan scam, AntiScam menyediakan fitur ekspor laporan:

### 7.1 Format Ekspor yang Tersedia

1. **Download Ringkasan Gambar (Shareable Image Card - PNG)**:
   * Kartu rangkuman minimalis resolusi tinggi berisi Skor Risiko, Indikator Utama, dan Petikan Pesan Berbahaya.
   * Cocok dibagikan ke keluarga atau grup WhatsApp sebagai peringatan (*awareness alert*).
2. **Download Dokumen PDF Ringkas (Printable Security Report)**:
   * Laporan terstruktur 1 halaman berisi data audit pesan, riwayat timestamp kritis, skor risiko, dan rekomendasi mitigasi.
3. **Salin Ringkasan Teks (Copy Text Summary)**:
   * Teks terformat rapi untuk dibagikan via chat:
     ```text
     [Hasil Pengecekan AntiScam]
     Status: TINGGI (High Risk - Skor 88/100)
     Modus: Penipuan File APK Kurir Palsu
     Indikator: Link mencurigakan, Ekstensi APK berbahaya, Urgensi palsu.
     Saran: Jangan instal file dan segera blokir nomor.
     Diverifikasi di AntiScam: https://antiscam.id
     ```

---

## 8. Spesifikasi Privasi & Keamanan Data (Security & PII Rules)

1. **Client-Side First Processing**: File `.txt` hasil ekspor chat dibaca secara lokal menggunakan `FileReader` API browser.
2. **Automatic PII Masking (Default: Aktif)**:
   * Nomor telepon: `+62 812-3456-7890` → `+62 812-****-7890`.
   * Nama kontak pengguna: `John Doe` → `User A`.
   * Nomor rekening / NIK (jika ada deret 10–16 digit): `1234567890` → `**********`.
3. **Zero Chat Log Retention**: Server API tidak menyimpan transkrip lengkap percakapan ke database permanen tanpa otorisasi pengguna.
4. **File Size Limit**: Maksimal ukuran file `.txt` ekspor WhatsApp adalah **5 MB** (setara dengan ±50.000 baris pesan teks) demi menjaga kestabilan memori browser.

---

## 9. Matriks Kasus Uji & Penanganan Kesalahan (Edge Cases)

| Skenario | Kondisi | Ekspektasi Perilaku Sistem |
| :--- | :--- | :--- |
| **File Format Salah** | Pengguna mengunggah `.pdf`, `.docx`, atau `.zip`. | Menampilkan pesan error: *"Harap unggah file chat WhatsApp berformat .txt tanpa media."* |
| **File Kosong / Rusak** | File `.txt` berukuran 0 bytes atau teks acak biner. | Menampilkan pesan error: *"File tidak berisi format pesan WhatsApp yang valid."* |
| **Bahasa Asing / Non-Latin** | Chat dalam aksara Arab, Mandarin, atau Cyrillic. | Parser tetap memisahkan timestamp dan nama pengirim dengan benar. |
| **Chat Sangat Panjang** | File berisi > 10.000 pesan. | UI menampilkan peringatan dan membatasi/memotong 500 pesan terakhir yang paling relevan untuk dianalisis. |
| **Pesan Khusus WhatsApp** | Terdapat pesan "Panggilan tak terjawab", "Location: shared", dsb. | Sistem menandai baris sebagai *non-text metadata* agar tidak merusak alur percakapan. |
