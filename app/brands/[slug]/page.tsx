import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrand, getProductsForBrand } from "@/lib/data";

export function generateStaticParams() {
  return [];
}

export default async function BrandDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrand(slug);

  if (!brand) {
    notFound();
  }

  const products = getProductsForBrand(brand.id);

  return (
    <main className="container">
      <div className="detail-layout">
        <article className="stack">
          <section className="panel stack">
            <p className="eyebrow">Brand</p>
            <h1>{brand.name}</h1>
            <p className="lead">{brand.positioning}</p>
          </section>

          <section className="panel stack">
            <h2>品牌简介</h2>
            <p>{brand.description}</p>
          </section>

          <section className="panel stack">
            <h2>演示产品</h2>
            <div className="grid">
              {products.map((product) => (
                <Link className="card" href={`/products/${product.slug}`} key={product.id}>
                  <h3>{product.nameCn}</h3>
                  <p className="meta">{product.nameOriginal}</p>
                  <p>{product.summary}</p>
                  <div className="tag-row">
                    <span className="tag">{product.category}</span>
                    {product.isDemo ? <span className="tag warning">Demo</span> : null}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>

        <aside className="stack">
          <section className="panel stack">
            <h2>国家</h2>
            <p>{brand.country}</p>
          </section>
          <section className="panel stack">
            <h2>官网</h2>
            <a href={brand.officialUrl} rel="noreferrer" target="_blank">
              {brand.officialUrl}
            </a>
          </section>
          <section className="panel stack">
            <h2>说明</h2>
            <p className="meta">品牌信息用于德国药房语境与产品归属展示，不代表平台背书。</p>
          </section>
        </aside>
      </div>
    </main>
  );
}
