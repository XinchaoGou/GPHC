# German Pharmacy Health Companion

面向中文用户的德国药房式健康知识与补剂决策辅助平台。项目目标不是做补剂商城，而是用结构化数据把健康主题、营养成分、科学证据、风险提示、德国品牌和产品连接起来，帮助用户更清楚地理解“为什么相关”和“风险边界在哪里”。

当前版本是 MVP foundation：使用本地 demo 数据跑通 Next.js Web App，并提供 Supabase/PostgreSQL schema 与 seed SQL。

## Tech Stack

- Next.js App Router
- TypeScript
- React
- Supabase / PostgreSQL schema
- Plain CSS, 德国药房风格：白色、蓝色、浅绿色、克制、可信

## Local Setup

```bash
git clone git@home-github.com:XinchaoGou/GPHC.git
cd GPHC
npm install
npm run dev
```

Then open:

```text
http://127.0.0.1:3000
```

If your SSH config does not have `home-github.com`, use the HTTPS URL instead:

```bash
git clone https://github.com/XinchaoGou/GPHC.git
```

## Useful Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

Notes:

- `npm run dev` starts the local development server.
- `npm run build` verifies the production build.
- `npm run lint` currently uses `next lint`; Next.js warns this command is deprecated for future major versions, but it works for this MVP.

## Supabase Files

Database schema:

```text
supabase/migrations/0001_initial_schema.sql
```

Demo seed data:

```text
supabase/seed.sql
```

Core tables:

- `brands`
- `products`
- `ingredients`
- `product_ingredients`
- `health_topics`
- `topic_products`
- `topic_ingredients`
- `ingredient_interactions`

The intended knowledge chain is:

```text
health_topics -> topic_ingredients -> ingredients -> product_ingredients -> products
```

## Current Pages

- `/` homepage
- `/topics` and `/topics/[slug]`
- `/ingredients` and `/ingredients/[slug]`
- `/products` and `/products/[slug]`
- `/brands` and `/brands/[slug]`

List pages include basic search. Detail pages show relationship explanations, evidence level, relevance level, warnings, caution notes, and non-diagnostic boundaries.

## Demo Data

The MVP includes a small demo dataset:

- Brands: Doppelherz, Orthomol, Mivolis, Abtei
- Ingredients: Magnesium, Omega-3, Vitamin D3, Zinc, CoQ10, Lutein
- Health topics: 睡眠、心血管健康、眼部健康、女性健康、骨骼健康、免疫支持
- Products: placeholder/demo product entries only

Product and dose information is intentionally marked as demo/placeholder. Do not treat it as verified label data or medical guidance.

## Product Principles

- Lifestyle first, supplements second.
- Risk warnings before product suggestions.
- Explain why a product or ingredient appears in a topic.
- Do not provide diagnosis, treatment claims, guaranteed effects, or dose adjustment advice.
- Future AI features should only explain, compare, summarize, and remind users to consult professionals when appropriate.

## Environment Variables

The current app renders from local demo data. Supabase client support is scaffolded and will use these variables when the app is wired to live data later:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

