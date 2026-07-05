import { IngredientCard } from "@/components/Cards";
import { SearchBox } from "@/components/SearchBox";
import { ingredients, searchCollection } from "@/lib/data";

export default async function IngredientsPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const results = searchCollection(ingredients, q);

  return (
    <main className="container">
      <div className="toolbar">
        <div>
          <p className="eyebrow">Ingredients</p>
          <h1>成分</h1>
        </div>
        <SearchBox action="/ingredients" defaultValue={q} placeholder="搜索成分、食物来源或风险" />
      </div>
      <div className="grid">
        {results.map((ingredient) => (
          <IngredientCard ingredient={ingredient} key={ingredient.id} />
        ))}
      </div>
    </main>
  );
}
