create extension if not exists "pgcrypto";

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  country text not null default 'Germany',
  positioning text not null,
  official_url text,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands(id) on delete restrict,
  name_cn text not null,
  name_original text not null,
  slug text not null unique,
  category text not null,
  dosage_form text not null,
  package_size text,
  image_url text,
  summary text not null,
  warnings text not null,
  is_demo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ingredients (
  id uuid primary key default gen_random_uuid(),
  name_cn text not null,
  name_en text not null,
  name_de text,
  slug text not null unique,
  category text not null,
  food_sources text,
  summary text not null,
  function_summary text not null,
  warnings text not null,
  evidence_level text not null check (evidence_level in ('strong', 'moderate', 'limited')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_ingredients (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  ingredient_id uuid not null references public.ingredients(id) on delete restrict,
  amount numeric,
  unit text,
  serving_size text,
  ingredient_form text,
  daily_value_percent numeric,
  note text,
  created_at timestamptz not null default now(),
  unique (product_id, ingredient_id, ingredient_form)
);

create table public.health_topics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  lifestyle_advice text not null,
  supplement_notes text not null,
  warning_notes text not null,
  medical_boundary text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.topic_products (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.health_topics(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  relevance_level text not null check (relevance_level in ('high', 'medium', 'low')),
  display_order integer not null default 100,
  recommendation_note text not null,
  caution_note text not null,
  created_at timestamptz not null default now(),
  unique (topic_id, product_id)
);

create table public.topic_ingredients (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.health_topics(id) on delete cascade,
  ingredient_id uuid not null references public.ingredients(id) on delete restrict,
  relevance_level text not null check (relevance_level in ('high', 'medium', 'low')),
  evidence_level text not null check (evidence_level in ('strong', 'moderate', 'limited')),
  explanation text not null,
  caution_note text not null,
  created_at timestamptz not null default now(),
  unique (topic_id, ingredient_id)
);

create table public.ingredient_interactions (
  id uuid primary key default gen_random_uuid(),
  ingredient_id uuid not null references public.ingredients(id) on delete cascade,
  interaction_target text not null,
  target_type text not null check (target_type in ('ingredient', 'drug', 'condition')),
  interaction_level text not null check (interaction_level in ('low', 'medium', 'high')),
  description text not null,
  recommendation text not null,
  created_at timestamptz not null default now()
);

create index products_brand_id_idx on public.products(brand_id);
create index product_ingredients_product_id_idx on public.product_ingredients(product_id);
create index product_ingredients_ingredient_id_idx on public.product_ingredients(ingredient_id);
create index topic_products_topic_id_idx on public.topic_products(topic_id);
create index topic_products_product_id_idx on public.topic_products(product_id);
create index topic_ingredients_topic_id_idx on public.topic_ingredients(topic_id);
create index topic_ingredients_ingredient_id_idx on public.topic_ingredients(ingredient_id);
create index ingredient_interactions_ingredient_id_idx on public.ingredient_interactions(ingredient_id);
