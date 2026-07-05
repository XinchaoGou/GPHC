import { BrandCard } from "@/components/Cards";
import { SearchBox } from "@/components/SearchBox";
import { brands, searchCollection } from "@/lib/data";

export default async function BrandsPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const results = searchCollection(brands, q);

  return (
    <main className="container">
      <div className="toolbar">
        <div>
          <p className="eyebrow">Brands</p>
          <h1>品牌</h1>
        </div>
        <SearchBox action="/brands" defaultValue={q} placeholder="搜索品牌或德国市场定位" />
      </div>
      <div className="grid">
        {results.map((brand) => (
          <BrandCard brand={brand} key={brand.id} />
        ))}
      </div>
    </main>
  );
}
