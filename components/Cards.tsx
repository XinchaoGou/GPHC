import Link from "next/link";
import type { Brand, HealthTopic, Ingredient, Product } from "@/lib/types";
import { getBrandForProduct } from "@/lib/data";

export function TopicCard({ topic }: { topic: HealthTopic }) {
  return (
    <Link className="card" href={`/topics/${topic.slug}`}>
      <h3>{topic.title}</h3>
      <p className="meta">{topic.summary}</p>
      <div className="tag-row">
        <span className="tag">生活方式优先</span>
        <span className="tag warning">非诊断</span>
      </div>
    </Link>
  );
}

export function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <Link className="card" href={`/ingredients/${ingredient.slug}`}>
      <h3>{ingredient.nameCn}</h3>
      <p className="meta">
        {ingredient.nameEn} / {ingredient.nameDe}
      </p>
      <p>{ingredient.summary}</p>
      <div className="tag-row">
        <span className="tag">{ingredient.category}</span>
        <span className="tag">证据：{ingredient.evidenceLevel}</span>
      </div>
    </Link>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const brand = getBrandForProduct(product);

  return (
    <Link className="card" href={`/products/${product.slug}`}>
      <h3>{product.nameCn}</h3>
      <p className="meta">
        {brand?.name} · {product.nameOriginal}
      </p>
      <p>{product.summary}</p>
      <div className="tag-row">
        <span className="tag">{product.category}</span>
        {product.isDemo ? <span className="tag warning">Demo</span> : null}
      </div>
    </Link>
  );
}

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link className="card" href={`/brands/${brand.slug}`}>
      <h3>{brand.name}</h3>
      <p className="meta">
        {brand.country} · {brand.positioning}
      </p>
      <p>{brand.description}</p>
    </Link>
  );
}
