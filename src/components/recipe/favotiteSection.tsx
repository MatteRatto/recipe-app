import React from "react";
import { Heart } from "lucide-react";
import { RecipeCard } from "./recipeCard";
import { FavoritesSectionProps } from "../../types/recipeTypes";

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  favoriteRecipes,
  onFavoriteToggle,
  onRecipeClick,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-orange-600 flex items-center">
        <Heart className="w-6 h-6 mr-2" fill="currentColor" />
        My Favorite Recipes
      </h2>

      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="mb-4">
            <Heart className="w-12 h-12 text-gray-300 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No favorite recipes yet
          </h3>
          <p className="text-gray-600">
            Click the heart icon on recipes you love to save them here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={true}
              onFavoriteToggle={onFavoriteToggle}
              onRecipeClick={onRecipeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
