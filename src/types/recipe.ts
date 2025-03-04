export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  cuisines?: string[];
  diets?: string[];
  dishTypes: string[];
  pricePerServing: number;
}

export interface RecipeFilters {
  cuisine: string;
  diet: string;
  query: string;
}
