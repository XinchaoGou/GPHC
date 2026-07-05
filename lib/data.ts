import {
  brands,
  healthTopics,
  ingredientInteractions,
  ingredients,
  productIngredients,
  products,
  topicIngredients,
  topicProducts
} from "@/lib/demo-data";
import type { Brand, HealthTopic, Ingredient, Product } from "@/lib/types";

export function getBrand(slug: string) {
  return brands.find((brand) => brand.slug === slug);
}

export function getIngredient(slug: string) {
  return ingredients.find((ingredient) => ingredient.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getTopic(slug: string) {
  return healthTopics.find((topic) => topic.slug === slug);
}

export function searchCollection<T extends Brand | HealthTopic | Ingredient | Product>(
  collection: T[],
  query?: string
) {
  if (!query) {
    return collection;
  }

  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return collection;
  }

  return collection.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(normalized)
    )
  );
}

export function getProductsForBrand(brandId: string) {
  return products.filter((product) => product.brandId === brandId);
}

export function getProductIngredients(productId: string) {
  return productIngredients
    .filter((item) => item.productId === productId)
    .map((item) => ({
      ...item,
      ingredient: ingredients.find((ingredient) => ingredient.id === item.ingredientId)
    }))
    .filter((item) => item.ingredient);
}

export function getProductsForIngredient(ingredientId: string) {
  const links = productIngredients.filter((item) => item.ingredientId === ingredientId);

  return links
    .map((link) => ({
      link,
      product: products.find((product) => product.id === link.productId),
      brand: brands.find(
        (brand) =>
          brand.id === products.find((product) => product.id === link.productId)?.brandId
      )
    }))
    .filter((item) => item.product && item.brand);
}

export function getTopicsForIngredient(ingredientId: string) {
  return topicIngredients
    .filter((item) => item.ingredientId === ingredientId)
    .map((item) => ({
      ...item,
      topic: healthTopics.find((topic) => topic.id === item.topicId)
    }))
    .filter((item) => item.topic);
}

export function getIngredientInteractions(ingredientId: string) {
  return ingredientInteractions.filter((item) => item.ingredientId === ingredientId);
}

export function getTopicIngredientChain(topicId: string) {
  return topicIngredients
    .filter((item) => item.topicId === topicId)
    .map((topicIngredient) => {
      const ingredient = ingredients.find(
        (item) => item.id === topicIngredient.ingredientId
      );
      const matchingProducts = ingredient
        ? getProductsForIngredient(ingredient.id).map((item) => ({
            ...item,
            topicProduct: topicProducts.find(
              (topicProduct) =>
                topicProduct.topicId === topicId &&
                topicProduct.productId === item.product?.id
            )
          }))
        : [];

      return {
        topicIngredient,
        ingredient,
        products: matchingProducts
      };
    })
    .filter((item) => item.ingredient);
}

export function getTopicProducts(topicId: string) {
  return topicProducts
    .filter((item) => item.topicId === topicId)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((topicProduct) => ({
      ...topicProduct,
      product: products.find((product) => product.id === topicProduct.productId)
    }))
    .filter((item) => item.product);
}

export function getTopicsForProduct(productId: string) {
  return topicProducts
    .filter((item) => item.productId === productId)
    .map((topicProduct) => ({
      ...topicProduct,
      topic: healthTopics.find((topic) => topic.id === topicProduct.topicId)
    }))
    .filter((item) => item.topic);
}

export function getBrandForProduct(product: Product) {
  return brands.find((brand) => brand.id === product.brandId);
}

export {
  brands,
  healthTopics,
  ingredients,
  products,
  topicIngredients,
  topicProducts
};
