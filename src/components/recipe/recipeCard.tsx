import React from "react";
import { Clock, Users, Heart, BookOpen, DollarSign } from "lucide-react";
import { Recipe } from "../../types/recipe";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onFavoriteToggle: (id: number) => void;
  onRecipeClick: (id: number) => void;
  view?: "grid" | "list";
}

export const RecipeCard = ({
  recipe,
  isFavorite,
  onFavoriteToggle,
  onRecipeClick,
  view = "grid",
}: RecipeCardProps) => {
  const renderInfo = (icon: React.ReactNode, text: string) => (
    <div className="flex items-center gap-1.5 text-gray-600">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );

  if (view === "list") {
    return (
      <Card className="group relative h-[260px] overflow-hidden hover:shadow-xl transition-all duration-300 border-orange-100/50">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/10 to-orange-100/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div
          className="flex h-full cursor-pointer"
          onClick={() => onRecipeClick(recipe.id)}
        >
          <div className="relative w-[320px] overflow-hidden">
            <img
              src={recipe.image || "/api/placeholder/320/260"}
              alt={recipe.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </div>

          <div className="flex-1 p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
                  {recipe.title}
                </h3>
              </div>

              <div className="flex gap-6">
                {renderInfo(
                  <Clock className="w-4 h-4 text-orange-400" />,
                  `${recipe.readyInMinutes} mins`
                )}
                {renderInfo(
                  <Users className="w-4 h-4 text-orange-400" />,
                  `${recipe.servings} servings`
                )}
                {renderInfo(
                  <DollarSign className="w-4 h-4 text-orange-400" />,
                  `$${(recipe.pricePerServing / 100).toFixed(2)}`
                )}
              </div>

              <div className="flex flex-wrap gap-2 max-w-[80%]">
                {recipe.cuisines?.map((cuisine) => (
                  <Badge
                    key={cuisine}
                    className="bg-orange-100/50 text-orange-700 hover:bg-orange-100"
                  >
                    {cuisine}
                  </Badge>
                ))}
                {recipe.diets?.map((diet) => (
                  <Badge
                    key={diet}
                    variant="outline"
                    className="text-orange-600 border-orange-200 bg-white"
                  >
                    {diet}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <p className="text-sm text-gray-600">
                Price per serving:{" "}
                <span className="font-semibold text-orange-500">
                  ${(recipe.pricePerServing / 100).toFixed(2)}
                </span>
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
              >
                View Recipe
                <BookOpen className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group relative h-[480px] overflow-hidden hover:shadow-xl transition-all duration-300 border-orange-100/50">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/10 to-orange-100/10 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="h-[240px] relative overflow-hidden">
        <img
          src={recipe.image || "/api/placeholder/400/240"}
          alt={recipe.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg
                     ${isFavorite ? "text-orange-500" : "text-gray-400"}`}
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(recipe.id);
          }}
        >
          <Heart
            className="w-5 h-5"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </Button>
      </div>

      <CardHeader className="p-6 pb-4">
        <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-orange-500 transition-colors mb-6">
          {recipe.title}
        </h3>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {renderInfo(
              <Clock className="w-4 h-4 text-orange-400" />,
              `${recipe.readyInMinutes} mins`
            )}
            {renderInfo(
              <Users className="w-4 h-4 text-orange-400" />,
              `${recipe.servings} servings`
            )}
            {renderInfo(
              <DollarSign className="w-4 h-4 text-orange-400" />,
              `$${(recipe.pricePerServing / 100).toFixed(2)}`
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {recipe.cuisines?.map((cuisine) => (
              <Badge
                key={cuisine}
                className="bg-orange-100/50 text-orange-700 hover:bg-orange-100"
              >
                {cuisine}
              </Badge>
            ))}
            {recipe.diets?.map((diet) => (
              <Badge
                key={diet}
                variant="outline"
                className="text-orange-600 border-orange-200 bg-white"
              >
                {diet}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white to-white/95">
        <Button
          onClick={() => onRecipeClick(recipe.id)}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          View Recipe
        </Button>
      </CardContent>
    </Card>
  );
};
