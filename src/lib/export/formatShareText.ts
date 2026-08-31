import { SingleAnalysisResponse } from '@/types/analysis';
import { WhatsAppAnalysisResponse } from '@/types/whatsapp';

export function formatSingleAnalysisShareText(result: SingleAnalysisResponse): string {
  const levelUpper = result.riskLevel.toUpperCase();
  const indicatorList = result.indicators.map((i) => `• ${i.title}`).join('\n');
  const recommendationList = result.recommendations.map((r) => `• ${r.actionText}`).join('\n');

  return `🛡️ *HASIL DETEKSI ANTISCAM*
━━━━━━━━━━━━━━━━━━━━
Status Risiko: *${levelUpper}* (Skor: ${result.riskScore}/100)

📌 *Ringkasan:*
${result.summary}

⚠️ *Indikator Ancaman:*
${indicatorList}

💡 *Saran Tindakan:*
${recommendationList}

🔗 *Cek pesan mencurigakan gratis di AntiScam:*
https://antiscam.id
━━━━━━━━━━━━━━━━━━━━`.replace(/🛡️|📌|⚠️|💡|🔗/g, ''); // Ensure zero emoji even in string formatter
}

export function formatWhatsAppAnalysisShareText(result: WhatsAppAnalysisResponse): string {
  const levelUpper = result.overallRiskLevel.toUpperCase();
  const indicatorList = result.indicators.map((i) => `- ${i.title}`).join('\n');
  const recommendationList = result.recommendations.map((r) => `- ${r.actionText}`).join('\n');

  return `[HASIL DETEKSI CHAT ANTISCAM]
------------------------------------
Status Risiko: ${levelUpper} (Skor: ${result.overallRiskScore}/100)
Modus Terdeteksi: ${result.detectedScamType}

Ringkasan:
${result.summary}

Indikator Ancaman:
${indicatorList}

Saran Tindakan Keamanan:
${recommendationList}

Periksa pesan WhatsApp mencurigakan lainnya di:
https://antiscam.id
------------------------------------`;
}
