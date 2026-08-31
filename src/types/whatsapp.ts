import { RiskLevel, ThreatCategory, ThreatIndicator, RecommendedAction } from './analysis';

export interface ParsedWhatsAppMessage {
  id: string;
  timestampRaw: string;
  sender: string;
  isOutgoing: boolean;
  content: string;
  hasMediaTag: boolean;
  isSelected: boolean;
  flaggedRisk?: RiskLevel;
  flaggedReason?: string;
  flaggedCategory?: ThreatCategory;
}

export interface ParsedWhatsAppChatSession {
  fileName?: string;
  totalMessages: number;
  participants: string[];
  firstMessageDate?: string;
  lastMessageDate?: string;
  messages: ParsedWhatsAppMessage[];
  sanitized: boolean;
}

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
  phaseName: string;
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
  detectedScamType: string;
  summary: string;
  escalationFlow: EscalationPhase[];
  flaggedMessages: FlaggedBubbleResult[];
  indicators: ThreatIndicator[];
  recommendations: RecommendedAction[];
  disclaimer: string;
}
