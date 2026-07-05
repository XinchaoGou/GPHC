import { ProductCard } from "@/components/Cards";
import { SearchBox } from "@/components/SearchBox";
import { products, searchCollection } from "@/lib/data";

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const results = searchCollection(products, q);

  return (
    <main className="container">
      <div className="toolbar">
        <div>
          <p className="eyebrow">Products</p>
          <h1>产品</h1>
        </div>
        <SearchBox action="/products" defaultValue={q} placeholder="搜索产品、类别或注意事项" />
      </div>
      <div className="grid">
        {results.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
}
