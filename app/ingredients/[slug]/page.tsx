import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceBadge, RelevanceBadge } from "@/components/LevelBadges";
import {
  getIngredient,
  getIngredientInteractions,
  getProductsForIngredient,
  getTopicsForIngredient
} from "@/lib/data";

export function generateStaticParams() {
  return [];
}

export default async function IngredientDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ingredient = getIngredient(slug);

  if (!ingredient) {
    notFound();
  }

  const topics = getTopicsForIngredient(ingredient.id);
  const products = getProductsForIngredient(ingredient.id);
  const interactions = getIngredientInteractions(ingredient.id);

  return (
    <main className="container">
      <div className="detail-layout">
        <article className="stack">
          <section className="panel stack">
            <p className="eyebrow">Ingredient</p>
            <h1>{ingredient.nameCn}</h1>
            <p className="lead">
              {ingredient.nameEn} / {ingredient.nameDe}
            </p>
            <div className="tag-row">
              <span className="tag">{ingredient.category}</span>
              <EvidenceBadge level={ingredient.evidenceLevel} />
            </div>
          </section>

          <section className="panel stack">
            <h2>成分说明</h2>
            <p>{ingredient.summary}</p>
            <p>{ingredient.functionSummary}</p>
          </section>

          <section className="panel stack">
            <h2>相关健康主题</h2>
            <div className="grid">
              {topics.map((item) =>
                item.topic ? (
                  <Link className="card" href={`/topics/${item.topic.slug}`} key={item.id}>
                    <h3>{item.topic.title}</h3>
                    <div className="tag-row">
                      <RelevanceBadge level={item.relevanceLevel} />
                      <EvidenceBadge level={item.evidenceLevel} />
                    </div>
                    <p>{item.explanation}</p>
                    <p className="meta">注意：{item.cautionNote}</p>
                  </Link>
                ) : null
              )}
            </div>
          </section>

          <section className="panel stack">
            <h2>含有该成分的产品</h2>
            <div className="grid">
              {products.map(({ product, brand, link }) =>
                product ? (
                  <Link className="card" href={`/products/${product.slug}`} key={product.id}>
                    <h3>{product.nameCn}</h3>
                    <p className="meta">{brand?.name}</p>
                    <p>
                      {link.amount ?? "未录入"} {link.unit} / {link.servingSize}
                    </p>
                    <p className="meta">{link.note}</p>
                  </Link>
                ) : null
              )}
            </div>
          </section>
        </article>

        <aside className="stack">
          <section className="panel stack">
            <h2>食物来源</h2>
            <p>{ingredient.foodSources}</p>
          </section>
          <section className="panel stack">
            <h2>风险与注意事项</h2>
            <p>{ingredient.warnings}</p>
          </section>
          <section className="panel stack">
            <h2>相互作用</h2>
            {interactions.length ? (
              <ul className="info-list">
                {interactions.map((item) => (
                  <li key={item.id}>
                    <strong>{item.interactionTarget}</strong>
                    <p className="meta">
                      {item.interactionLevel} · {item.description} {item.recommendation}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="meta">暂无演示相互作用记录。后续可继续录入药物、疾病与成分风险。</p>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}
