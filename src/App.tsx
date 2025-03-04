import React, { useState, useEffect } from "react";
import { ChefHat, Heart } from "lucide-react";
import { Recipe, RecipeFilters } from "./types/recipe";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { getRecipeDetails, searchRecipes } from "./service/recipeService";
import { RecipeFilterBar } from "./components/recipe/recipeFilters";
import { RecipeCard } from "./components/recipe/recipeCard";
import { RecipeDialog } from "./components/recipe/recipeDialog";
import Header from "./components/header";
import { FavoritesSection } from "./components/recipe/favotiteSection";

export default function App(): React.ReactElement {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>("grid");
  const [activeTab, setActiveTab] = useState<string>("search");
  const [filters, setFilters] = useState<RecipeFilters>({
    query: "",
    cuisine: "all",
    diet: "all",
  });

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteRecipes");
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavoriteRecipes(parsedFavorites);

      // Recreate the Set of favorite IDs
      const favoriteIds = new Set<number>(
        parsedFavorites.map((recipe: Recipe) => recipe.id)
      );
      setFavorites(favoriteIds);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
    } else {
      localStorage.removeItem("favoriteRecipes");
    }
  }, [favoriteRecipes]);

  const handleFilterChange = (
    key: keyof RecipeFilters,
    value: string
  ): void => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = async (): Promise<void> => {
    if (!filters.query.trim()) return;

    setLoading(true);
    try {
      const data = await searchRecipes(
        filters.query,
        filters.cuisine,
        filters.diet
      );
      setRecipes(data.results);
    } catch (error) {
      console.error("Error searching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: number): void => {
    setFavorites((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
        // Remove from favoriteRecipes array
        setFavoriteRecipes(
          favoriteRecipes.filter((recipe) => recipe.id !== id)
        );
      } else {
        next.add(id);
        // Add to favoriteRecipes array
        const recipeToAdd = recipes.find((recipe) => recipe.id === id);
        if (recipeToAdd) {
          setFavoriteRecipes([...favoriteRecipes, recipeToAdd]);
        }
      }

      return next;
    });
  };

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleRecipeClick = async (id: number): Promise<void> => {
    try {
      const details = await getRecipeDetails(id);
      setSelectedRecipe(details);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="mb-6">
            <TabsTrigger value="search">Search Recipes</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="w-4 h-4" fill="currentColor" />
              My Favorites ({favoriteRecipes.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <RecipeFilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              isLoading={loading}
            />

            <Tabs
              value={activeView}
              onValueChange={setActiveView}
              className="mb-6"
            >
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                <p className="text-sm text-gray-600">
                  {recipes.length} recipes found
                </p>
              </div>

              <TabsContent value="grid">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        isFavorite={favorites.has(recipe.id)}
                        onFavoriteToggle={toggleFavorite}
                        onRecipeClick={handleRecipeClick}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="list">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        isFavorite={favorites.has(recipe.id)}
                        onFavoriteToggle={toggleFavorite}
                        onRecipeClick={handleRecipeClick}
                        view="list"
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {!loading && recipes.length === 0 && (
              <div className="text-center py-12">
                <div className="mb-4">
                  <ChefHat className="w-12 h-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No recipes found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters to find what you're
                  looking for
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            <FavoritesSection
              favoriteRecipes={favoriteRecipes}
              onFavoriteToggle={toggleFavorite}
              onRecipeClick={handleRecipeClick}
            />
          </TabsContent>
        </Tabs>
      </div>

      <RecipeDialog
        recipe={selectedRecipe}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedRecipe(null);
        }}
      />
    </div>
  );
}
