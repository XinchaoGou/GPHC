export type EvidenceLevel = "strong" | "moderate" | "limited";
export type RelevanceLevel = "high" | "medium" | "low";
export type InteractionLevel = "low" | "medium" | "high";

export type Brand = {
  id: string;
  name: string;
  slug: string;
  country: string;
  positioning: string;
  officialUrl: string;
  description: string;
};

export type Ingredient = {
  id: string;
  nameCn: string;
  nameEn: string;
  nameDe: string;
  slug: string;
  category: string;
  foodSources: string;
  summary: string;
  functionSummary: string;
  warnings: string;
  evidenceLevel: EvidenceLevel;
};

export type Product = {
  id: string;
  brandId: string;
  nameCn: string;
  nameOriginal: string;
  slug: string;
  category: string;
  dosageForm: string;
  packageSize: string;
  imageUrl: string;
  summary: string;
  warnings: string;
  isDemo: boolean;
};

export type ProductIngredient = {
  id: string;
  productId: string;
  ingredientId: string;
  amount: number | null;
  unit: string;
  servingSize: string;
  ingredientForm: string;
  dailyValuePercent: number | null;
  note: string;
};

export type HealthTopic = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  lifestyleAdvice: string;
  supplementNotes: string;
  warningNotes: string;
  medicalBoundary: string;
};

export type TopicIngredient = {
  id: string;
  topicId: string;
  ingredientId: string;
  relevanceLevel: RelevanceLevel;
  evidenceLevel: EvidenceLevel;
  explanation: string;
  cautionNote: string;
};

export type TopicProduct = {
  id: string;
  topicId: string;
  productId: string;
  relevanceLevel: RelevanceLevel;
  displayOrder: number;
  recommendationNote: string;
  cautionNote: string;
};

export type IngredientInteraction = {
  id: string;
  ingredientId: string;
  interactionTarget: string;
  targetType: "ingredient" | "drug" | "condition";
  interactionLevel: InteractionLevel;
  description: string;
  recommendation: string;
};
