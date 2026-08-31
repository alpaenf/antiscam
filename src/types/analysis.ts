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
  highlightSnippet?: string;
}

export interface RecommendedAction {
  id: string;
  priority: 'must_do' | 'should_do' | 'optional';
  actionText: string;
  explanation: string;
}

export interface SingleAnalysisRequest {
  messageText: string;
  clientTimestamp?: string;
  locale?: string;
}

export interface SingleAnalysisResponse {
  id: string;
  timestamp: string;
  riskLevel: RiskLevel;
  riskScore: number;
  summary: string;
  indicators: ThreatIndicator[];
  recommendations: RecommendedAction[];
  disclaimer: string;
}
