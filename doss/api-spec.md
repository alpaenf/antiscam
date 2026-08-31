# AntiScam — Spesifikasi API & Kontrak Data

Dokumen ini mendefinisikan kontrak komunikasi data antara Frontend AntiScam dengan Backend Engine / Layanan Deteksi AI, mencakup spesifikasi endpoint, skema payload, definisi tipe TypeScript, serta struktur mock dataset.

---

## 1. Standar & Konvensi Umum

* **Format Data**: JSON (`application/json; charset=utf-8`)
* **Protokol**: HTTPS REST API
* **Base URL**: Dikonfigurasi melalui environment variable `NEXT_PUBLIC_API_URL`
* **Format Timestamp**: ISO 8601 UTC (`YYYY-MM-DDTHH:mm:ss.sssZ`)
* **Tingkat Risiko (Risk Level Enum)**:
  * `low`: Skor 0 – 30 (Indikasi mencurigakan sangat rendah / pesan normal).
  * `medium`: Skor 31 – 60 (Terdapat pola yang perlu diwaspadai / promosi agresif).
  * `high`: Skor 61 – 85 (Indikator kuat penipuan digital / phising / hadiah palsu).
  * `critical`: Skor 86 – 100 (Ancaman berbahaya mendesak: permintaan OTP, file malware APK, impersonasi resmi).

---

## 2. Definisi Tipe TypeScript (Core Data Models)

```typescript
// types/analysis.ts

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type ThreatCategory =
  | 'suspicious_link'
  | 'malicious_apk'
  | 'urgency_pressure'
  | 'financial_request'
  | 'credential_harvesting'
  | 'fake_reward'
  | 'impersonation'
  | 'suspicious_language'
  | 'unknown_sender'
  | 'social_engineering';

export interface ThreatIndicator {
  id: string;
  category: ThreatCategory;
  title: string;
  description: string;
  severity: RiskLevel;
  highlightSnippet?: string; // Potongan teks yang memicu indikator
}

export interface RecommendedAction {
  id: string;
  priority: 'must_do' | 'should_do' | 'optional';
  actionText: string;
  explanation: string;
}

// Analisis Pesan Tunggal
export interface SingleAnalysisRequest {
  messageText: string;
  clientTimestamp?: string;
  locale?: string; // default: 'id-ID'
}

export interface SingleAnalysisResponse {
  id: string;
  timestamp: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  summary: string;
  indicators: ThreatIndicator[];
  recommendations: RecommendedAction[];
  disclaimer: string;
}

// Analisis Percakapan WhatsApp (Multi-Bubble Context)
export interface WhatsAppMessageItem {
  id: string;
  timestampRaw: string;
  sender: string;
  isOutgoing: boolean;
  content: string;
}

export interface WhatsAppAnalysisRequest {
  sessionTitle?: string;
  totalMessages: number;
  participants: string[];
  messages: WhatsAppMessageItem[];
  locale?: string;
}

export interface EscalationPhase {
  phaseNumber: number;
  phaseName: string; // e.g. "Tahap 1: Pendekatan & Umpan"
  description: string;
  messageIdRef?: string;
}

export interface FlaggedBubbleResult {
  messageId: string;
  riskLevel: RiskLevel;
  triggerCategory: ThreatCategory;
  reason: string;
}

export interface WhatsAppAnalysisResponse {
  id: string;
  timestamp: string;
  overallRiskLevel: RiskLevel;
  overallRiskScore: number;
  detectedScamType: string; // e.g. "Penipuan Kurir Paket via APK Malware"
  summary: string;
  escalationFlow: EscalationPhase[];
  flaggedMessages: FlaggedBubbleResult[];
  indicators: ThreatIndicator[];
  recommendations: RecommendedAction[];
  disclaimer: string;
}
```

---

## 3. Spesifikasi Endpoint

### 3.1 Analisis Pesan Teks Tunggal

* **Route**: `POST /api/v1/analyze/message`
* **Deskripsi**: Menganalisis potongan satu teks pesan yang dicurigai sebagai scam.

#### Contoh Request:
```json
{
  "messageText": "Selamat! Nomor Anda terpilih mendapatkan subsidi pulsa Rp2.000.000 dari Telkomsel. Klaim hadiah di: https://telkomsel-pembagian-dana.club/klaim sekarang juga!",
  "locale": "id-ID"
}
```

#### Contoh Response (200 OK):
```json
{
  "id": "res_single_98234",
  "timestamp": "2026-08-31T07:00:00.000Z",
  "riskLevel": "critical",
  "riskScore": 94,
  "summary": "Pesan ini terindikasi kuat sebagai penipuan phishing dengan modus pembagian dana palsu dan penggunaan domain tidak resmi.",
  "indicators": [
    {
      "id": "ind_1",
      "category": "fake_reward",
      "title": "Hadiah / Subsidi Palsu",
      "description": "Menjanjikan uang atau pulsa cuma-cuma tanpa dasar transaksi yang jelas.",
      "severity": "critical",
      "highlightSnippet": "mendapatkan subsidi pulsa Rp2.000.000"
    },
    {
      "id": "ind_2",
      "category": "suspicious_link",
      "title": "Link Domain Mencurigakan",
      "description": "Domain '.club' bukan situs resmi dari operator seluler terkait.",
      "severity": "critical",
      "highlightSnippet": "https://telkomsel-pembagian-dana.club/klaim"
    },
    {
      "id": "ind_3",
      "category": "urgency_pressure",
      "title": "Tekanan Waktu",
      "description": "Menggunakan kata 'sekarang juga' untuk mendesak korban bertindak tergesa-gesa.",
      "severity": "medium",
      "highlightSnippet": "sekarang juga!"
    }
  ],
  "recommendations": [
    {
      "id": "act_1",
      "priority": "must_do",
      "actionText": "Jangan Klik Link",
      "explanation": "Tautan dapat mengarahkan ke formulir pencurian data kredensial atau unduhan berbahaya."
    },
    {
      "id": "act_2",
      "priority": "must_do",
      "actionText": "Blokir & Laporkan Pengirim",
      "explanation": "Tandai nomor tersebut sebagai spam di aplikasi perpesanan Anda."
    }
  ],
  "disclaimer": "Hasil analisis dihasilkan secara otomatis oleh sistem deteksi pola AntiScam dan bukan jaminan hukum mutlak. Selalu verifikasi langsung ke kontak resmi penyedia layanan."
}
```

---

### 3.2 Analisis Konteks Percakapan WhatsApp (Export Chat)

* **Route**: `POST /api/v1/analyze/whatsapp`
* **Deskripsi**: Menganalisis rangkaian pesan percakapan berurutan dari log chat WhatsApp.

#### Contoh Request:
```json
{
  "sessionTitle": "Chat Ekspor WhatsApp",
  "totalMessages": 4,
  "participants": ["+62 812-9988-7766", "Anda"],
  "messages": [
    {
      "id": "msg_1",
      "timestampRaw": "20/08/24 14.30",
      "sender": "+62 812-9988-7766",
      "isOutgoing": false,
      "content": "Selamat siang, paket atas nama Anda gagal dikirim karena alamat kurang lengkap."
    },
    {
      "id": "msg_2",
      "timestampRaw": "20/08/24 14.31",
      "sender": "Anda",
      "isOutgoing": true,
      "content": "Paket apa ya pak? Saya tidak merasa pesan barang."
    },
    {
      "id": "msg_3",
      "timestampRaw": "20/08/24 14.32",
      "sender": "+62 812-9988-7766",
      "isOutgoing": false,
      "content": "Silakan cek foto resi dan surat jalan pengiriman di aplikasi ini: LIHAT_FOTO_PAKET.apk"
    },
    {
      "id": "msg_4",
      "timestampRaw": "20/08/24 14.33",
      "sender": "+62 812-9988-7766",
      "isOutgoing": false,
      "content": "Wajib diinstal sekarang untuk konfirmasi agar tidak diretur."
    }
  ]
}
```

#### Contoh Response (200 OK):
```json
{
  "id": "res_wa_87211",
  "timestamp": "2026-08-31T07:05:00.000Z",
  "overallRiskLevel": "critical",
  "overallRiskScore": 96,
  "detectedScamType": "Sniffing Malware (Modus APK Kurir Paket)",
  "summary": "Percakapan ini memperlihatkan pola rekayasa sosial kurir palsu yang berupaya menyusupkan aplikasi berbahaya (.APK) untuk mencuri data SMS/OTP perbankan pengguna.",
  "escalationFlow": [
    {
      "phaseNumber": 1,
      "phaseName": "Pendekatan Awal (Bait)",
      "description": "Pengirim menciptakan skenario mendesak tentang kiriman paket tertahan.",
      "messageIdRef": "msg_1"
    },
    {
      "phaseNumber": 2,
      "phaseName": "Penyelundupan Malware (Payload)",
      "description": "Pengirim mengirim file berekstensi .apk dengan menyamarkannya sebagai dokumen foto/resi.",
      "messageIdRef": "msg_3"
    },
    {
      "phaseNumber": 3,
      "phaseName": "Pemaksaan / Urgensi (Coercion)",
      "description": "Mengancam paket akan diretur jika korban tidak segera menginstal aplikasi.",
      "messageIdRef": "msg_4"
    }
  ],
  "flaggedMessages": [
    {
      "messageId": "msg_3",
      "riskLevel": "critical",
      "triggerCategory": "malicious_apk",
      "reason": "Pengiriman file berekstensi .APK yang merupakan malware pencuri SMS perbankan."
    },
    {
      "messageId": "msg_4",
      "riskLevel": "high",
      "triggerCategory": "urgency_pressure",
      "reason": "Mendesak korban untuk langsung menginstal file tanpa verifikasi."
    }
  ],
  "indicators": [
    {
      "id": "ind_wa_1",
      "category": "malicious_apk",
      "title": "Ekstensi File .APK Berbahaya",
      "description": "File APK Android yang dikirim melalui chat berpotensi membaca SMS dan mencuri kode OTP.",
      "severity": "critical"
    },
    {
      "id": "ind_wa_2",
      "category": "impersonation",
      "title": "Penyalahgunaan Identitas Ekspedisi",
      "description": "Mengaku sebagai kurir resmi tanpa menggunakan nomor WhatsApp Business terverifikasi.",
      "severity": "high"
    }
  ],
  "recommendations": [
    {
      "id": "act_wa_1",
      "priority": "must_do",
      "actionText": "JANGAN BUKA ATAU INSTAL FILE .APK",
      "explanation": "Jika terlanjur diinstal, segera putuskan koneksi internet (Airplane mode) dan hapus aplikasi dari pengaturan perangkat."
    },
    {
      "id": "act_wa_2",
      "priority": "must_do",
      "actionText": "Blokir Nomor Kontak Pengirim",
      "explanation": "Laporkan nomor tersebut ke WhatsApp sebagai Spam/Penipuan."
    }
  ],
  "disclaimer": "Analisis ini didasarkan pada deteksi pola pesan teks. AntiScam tidak memiliki akses ke perangkat Anda."
}
```

---

## 4. Format Tanggapan Kesalahan Standar (Standard Error Schema)

```typescript
export interface ApiErrorResponse {
  statusCode: number;
  errorCode:
    | 'EMPTY_PAYLOAD'
    | 'PAYLOAD_TOO_LARGE'
    | 'INVALID_WHATSAPP_FORMAT'
    | 'PARSING_FAILED'
    | 'RATE_LIMIT_EXCEEDED'
    | 'INTERNAL_SERVICE_ERROR';
  message: string;
  userFriendlyMessage: string;
}
```

#### Contoh Error Response (422 Unprocessable Entity):
```json
{
  "statusCode": 422,
  "errorCode": "INVALID_WHATSAPP_FORMAT",
  "message": "The provided text does not match any known WhatsApp export pattern.",
  "userFriendlyMessage": "Format teks obrolan WhatsApp tidak dikenali. Pastikan file berupa ekspor teks tanpa media."
}
```

---

## 5. Mock Dataset untuk Pengujian Frontend (Development Mode)

Modul `src/lib/mock/mockAnalysisData.ts` menyediakan dataset pengujian:
1. **Mock 1: Pesan Menang Undian (High Risk - Fake Reward)**
2. **Mock 2: Chat APK Kurir Paket (Critical Risk - WhatsApp APK Malware)**
3. **Mock 3: Pesan Tagihan Resmi Toko Online (Low Risk - Normal Message)**
4. **Mock 4: Chat Pinjaman Online Ilegal (High Risk - Urgent Financial Offer)**
5. **Mock 5: Chat Permintaan OTP Bank (Critical Risk - Impersonation Credential Request)**
