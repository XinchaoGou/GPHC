import type { EvidenceLevel, RelevanceLevel } from "@/lib/types";

const evidenceLabels: Record<EvidenceLevel, string> = {
  strong: "证据较强",
  moderate: "证据中等",
  limited: "证据有限"
};

const relevanceLabels: Record<RelevanceLevel, string> = {
  high: "高度相关",
  medium: "中度相关",
  low: "低度相关"
};

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  return <span className="tag">证据：{evidenceLabels[level]}</span>;
}

export function RelevanceBadge({ level }: { level: RelevanceLevel }) {
  return <span className="tag">相关性：{relevanceLabels[level]}</span>;
}
