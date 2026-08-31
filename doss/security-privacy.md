# AntiScam — Standar Keamanan & Perlindungan Privasi Data (PII)

Dokumen ini mendefinisikan prinsip-prinsip privasi, kebijakan pemrosesan data sensitif, arsitektur penyensoran informasi pribadi (*Client-side Personally Identifiable Information / PII Masking*), serta standar keamanan frontend pada aplikasi **AntiScam**.

---

## 1. Prinsip Utama Keamanan & Privasi (*Privacy by Design*)

Karena AntiScam memproses pesan teks dan riwayat obrolan WhatsApp yang berpotensi mengandung percakapan pribadi, data keuangan, atau identitas pengguna, sistem menerapkan 4 pilar privasi fundamental:

1. **Client-Side First Processing**: Pembacaan dan parsing file `.txt` ekspor WhatsApp dilakukan sepenuhnya di browser pengguna menggunakan JavaScript lokal. File mentah tidak pernah diunggah secara langsung sebagai file fisik ke server.
2. **Automatic PII Redaction**: Sistem secara proaktif mendeteksi dan menyensor nomor telepon, nama pribadi, nomor rekening, dan NIK sebelum data teks dikirim ke model pendeteksi AI.
3. **Zero-Retention Policy (Data Ephemeral)**: Teks obrolan dan pesan yang dianalisis tidak disimpan secara permanen di basis data server tanpa persetujuan eksplisit. Data hanya berada di memori (*RAM*) selama sesi analisis berlangsung.
4. **Transparency & User Control**: Pengguna memiliki kendali penuh untuk melihat pratinjau teks yang telah disensor, memilih pesan mana saja yang ingin dikirim untuk dianalisis, atau membatalkan proses kapan saja.

---

## 2. Arsitektur Penyensoran Data Pribadi (*PII Sanitization Engine*)

Modul penyensoran ditempatkan pada `src/lib/parser/piiSanitizer.ts`. Modul ini beroperasi sebelum *payload* dikirimkan ke lapisan API.

```text
[ File Chat WhatsApp Mentah ]
              │
              ▼
[ Parser Sisi Klien (Local Browser Memory) ]
              │
              ▼
[ PII Sanitization Engine ]
  ├── 1. Regex Deteksi Nomor Telepon (+62 / 08 / Inter) ──► Mask: +62 812-****-7890
  ├── 2. Regex Deteksi NIK KTP (16 Digit)               ──► Mask: [NIK_DISENSOR]
  ├── 3. Regex Deteksi No. Rekening Bank (10-16 Digit)  ──► Mask: [REKENING_DISENSOR]
  └── 4. Pseudonim Pengirim & Penerima                  ──► Mask: Pengguna A / Lawan Bicara
              │
              ▼
[ Pratinjau Teks Bersih & Aman di UI ]
              │
              ▼ (Hanya data tersanitasi yang dikirim)
[ API Endpoint / AI Detection Engine ]
```

### 2.1 Pola Deteksi & Transformasi PII

```typescript
// src/lib/parser/piiSanitizer.ts

export const PII_MASKS = {
  // Sensor Nomor Telepon Indonesia & Internasional
  maskPhone: (text: string): string => {
    // Pola: (+62|62|08)[0-9]{8,13}
    return text.replace(
      /(?:\+?62|0)8[1-9][0-9]{1,2}[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,5}/g,
      (match) => {
        const cleaned = match.replace(/[-.\s]/g, '');
        if (cleaned.length < 8) return match;
        const prefix = cleaned.slice(0, 4);
        const suffix = cleaned.slice(-3);
        return `${prefix}-****-${suffix}`;
      }
    );
  },

  // Sensor Nomor Rekening Bank & NIK (Deret Angka Panjang)
  maskAccountNumbers: (text: string): string => {
    // Mendeteksi 10 hingga 16 digit berturut-turut
    return text.replace(/\b\d{10,16}\b/g, (match) => {
      const prefix = match.slice(0, 3);
      const suffix = match.slice(-2);
      return `${prefix}******${suffix}`;
    });
  },

  // Sensor Alamat Email
  maskEmail: (text: string): string => {
    return text.replace(
      /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
      (_, user, domain) => {
        const maskedUser = user.length > 2 ? `${user[0]}***${user[user.length - 1]}` : '***';
        return `${maskedUser}@${domain}`;
      }
    );
  },
};
```

---

## 3. Keamanan Sisi Klien (*Frontend Security Hardening*)

### 3.1 Pencegahan Serangan Cross-Site Scripting (XSS)
Pesan scam sering kali mengandung tag HTML berbahaya, script injeksi, atau karakter unicode khusus.
* Semua teks pesan yang dirender di komponen balon chat (`ChatBubbleItem`) atau teks preview diperlakukan sebagai **pure text nodes** (tidak menggunakan `dangerouslySetInnerHTML`).
* Jika ada URL terdeteksi di dalam pesan, URL tersebut ditampilkan sebagai teks atau tautan yang dinonaktifkan (*inert link*) dengan konfirmasi peringatan keamanan sebelum diklik.

### 3.2 Keamanan Tautan Eksternal (Safe Link Guard)
Jika pengguna ingin melihat link yang tertera di dalam pesan:
* Ditambahkan atribut wajib `rel="noopener noreferrer"`.
* Muncul dialog peringatan (*Security Interstitial Modal*): *"Tautan ini terindikasi berbahaya. Apakah Anda yakin ingin melanjutkan?"*

### 3.3 Tidak Ada Kunci Rahasia di Klien (*Zero Client Secrets*)
* Variabel lingkungan yang dapat diakses oleh browser hanyalah URL publik (`NEXT_PUBLIC_API_URL`).
* Kunci API kecerdasan buatan, token database, atau *master secret keys* dikelola sepenuhnya di backend server.

---

## 4. Kepatuhan Regulasi Privasi Data (UU PDP & GDPR Compliance)

Arsitektur privasi AntiScam diselaraskan dengan ketentuan **Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022)** di Indonesia:

1. **Persetujuan Pemrosesan (Consent)**: Sebelum menganalisis riwayat obrolan WhatsApp, antarmuka menyediakan disclaimer persetujuan: *"Dengan melanjutkan analisis, Anda menyetujui pemrosesan teks yang telah disensor demi tujuan deteksi risiko penipuan."*
2. **Hak Penghapusan Sesi (Right to Erasure)**: Menutup tab browser atau menekan tombol *"Bersihkan Percakapan"* akan langsung menghapus seluruh variabel obrolan dari memori (*garbage collected*).
3. **Minimisasi Data (Data Minimization)**: Hanya teks percakapan yang relevan dan diperlukan untuk analisis yang diproses. File media (gambar, video, dokumen biner) diabaikan secara total.
