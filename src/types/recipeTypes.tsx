import { Recipe, RecipeFilters } from "./recipe";

export interface FavoritesSectionProps {
  favoriteRecipes: Recipe[];
  onFavoriteToggle: (id: number) => void;
  onRecipeClick: (id: number) => void;
}

export interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onFavoriteToggle: (id: number) => void;
  onRecipeClick: (id: number) => void;
  view?: "grid" | "list";
}

export interface RecipeDialogProps {
  recipe: any;
  isOpen: boolean;
  onClose: () => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: number) => void;
}

export interface RecipeFilterProps {
  filters: RecipeFilters;
  onFilterChange: (key: keyof RecipeFilters, value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}
