import Link from "next/link";
import { notFound } from "next/navigation";
import { RelevanceBadge } from "@/components/LevelBadges";
import {
  getBrandForProduct,
  getProduct,
  getProductIngredients,
  getTopicsForProduct
} from "@/lib/data";

export function generateStaticParams() {
  return [];
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const brand = getBrandForProduct(product);
  const ingredients = getProductIngredients(product.id);
  const topics = getTopicsForProduct(product.id);

  return (
    <main className="container">
      <div className="detail-layout">
        <article className="stack">
          <section className="panel stack">
            <p className="eyebrow">Product</p>
            <h1>{product.nameCn}</h1>
            <p className="lead">{product.nameOriginal}</p>
            <div className="tag-row">
              <span className="tag">{product.category}</span>
              <span className="tag">{product.dosageForm}</span>
              {product.isDemo ? <span className="tag warning">Demo placeholder</span> : null}
            </div>
          </section>

          <section className="panel stack">
            <h2>产品简介</h2>
            <p>{product.summary}</p>
            <p className="meta">规格：{product.packageSize}</p>
          </section>

          <section className="panel stack">
            <h2>成分组成</h2>
            <div className="grid">
              {ingredients.map(({ ingredient, ...link }) =>
                ingredient ? (
                  <Link className="card" href={`/ingredients/${ingredient.slug}`} key={link.id}>
                    <h3>{ingredient.nameCn}</h3>
                    <p className="meta">
                      {link.amount ?? "未录入"} {link.unit} / {link.servingSize}
                    </p>
                    <p>形式：{link.ingredientForm}</p>
                    <p className="meta">{link.note}</p>
                  </Link>
                ) : null
              )}
            </div>
          </section>

          <section className="panel stack">
            <h2>相关健康主题</h2>
            <div className="grid">
              {topics.map((item) =>
                item.topic ? (
                  <Link className="card" href={`/topics/${item.topic.slug}`} key={item.id}>
                    <h3>{item.topic.title}</h3>
                    <RelevanceBadge level={item.relevanceLevel} />
                    <p>{item.recommendationNote}</p>
                    <p className="meta">风险边界：{item.cautionNote}</p>
                  </Link>
                ) : null
              )}
            </div>
          </section>
        </article>

        <aside className="stack">
          <section className="panel stack">
            <h2>品牌</h2>
            {brand ? (
              <Link href={`/brands/${brand.slug}`}>
                <strong>{brand.name}</strong>
                <p className="meta">{brand.positioning}</p>
              </Link>
            ) : (
              <p className="meta">未关联品牌。</p>
            )}
          </section>
          <section className="panel stack">
            <h2>注意事项</h2>
            <p>{product.warnings}</p>
          </section>
          <section className="panel stack">
            <h2>边界声明</h2>
            <p className="meta">
              产品页只解释成分、剂型和关联逻辑，不提供购买建议、治疗建议或剂量调整建议。
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
