import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceBadge, RelevanceBadge } from "@/components/LevelBadges";
import { getTopic, getTopicIngredientChain } from "@/lib/data";

export function generateStaticParams() {
  return [];
}

export default async function TopicDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopic(slug);

  if (!topic) {
    notFound();
  }

  const chain = getTopicIngredientChain(topic.id);

  return (
    <main className="container">
      <div className="detail-layout">
        <article className="stack">
          <div className="panel stack">
            <p className="eyebrow">Health Topic</p>
            <h1>{topic.title}</h1>
            <p className="lead">{topic.summary}</p>
          </div>

          <section className="panel stack">
            <h2>生活方式优先</h2>
            <p>{topic.lifestyleAdvice}</p>
          </section>

          <section className="panel stack">
            <h2>主题-成分-产品链路</h2>
            <div className="chain">
              {chain.map(({ topicIngredient, ingredient, products }) => (
                <div className="chain-step stack" key={topicIngredient.id}>
                  <div>
                    <h3>
                      <Link href={`/ingredients/${ingredient?.slug}`}>{ingredient?.nameCn}</Link>
                    </h3>
                    <div className="tag-row">
                      <RelevanceBadge level={topicIngredient.relevanceLevel} />
                      <EvidenceBadge level={topicIngredient.evidenceLevel} />
                    </div>
                  </div>
                  <p>{topicIngredient.explanation}</p>
                  <p className="meta">注意：{topicIngredient.cautionNote}</p>
                  <div className="grid">
                    {products.map(({ product, brand, topicProduct }) =>
                      product ? (
                        <Link className="card" href={`/products/${product.slug}`} key={product.id}>
                          <h3>{product.nameCn}</h3>
                          <p className="meta">{brand?.name}</p>
                          <p>{topicProduct?.recommendationNote ?? "该产品含有相关成分，因此出现在链路中。"}</p>
                          <p className="meta">
                            风险边界：{topicProduct?.cautionNote ?? product.warnings}
                          </p>
                        </Link>
                      ) : null
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="stack">
          <section className="panel stack">
            <h2>补剂说明</h2>
            <p>{topic.supplementNotes}</p>
          </section>
          <section className="panel stack">
            <h2>风险提示</h2>
            <p>{topic.warningNotes}</p>
          </section>
          <section className="panel stack">
            <h2>医疗边界</h2>
            <p>{topic.medicalBoundary}</p>
          </section>
        </aside>
      </div>
    </main>
  );
}
