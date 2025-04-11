import {
  Clock,
  Users,
  DollarSign,
  ChefHat,
  ArrowLeft,
  Heart,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scrollArea";
import { RecipeDialogProps } from "../../types/recipeTypes";

export const RecipeDialog = ({
  recipe,
  isOpen,
  onClose,
  isFavorite = false,
  onFavoriteToggle,
}: RecipeDialogProps) => {
  if (!recipe) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden bg-white sm:rounded-lg">
        <div className="relative">
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white"
              onClick={onClose}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Button>
          </div>

          {onFavoriteToggle && (
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                className={`bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white ${
                  isFavorite ? "text-orange-500" : "text-gray-500"
                }`}
                onClick={() => onFavoriteToggle(recipe.id)}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </Button>
            </div>
          )}

          <div className="w-full h-48 sm:h-64 md:h-72 relative">
            <img
              src={recipe.image || "/api/placeholder/800/400"}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:hidden">
              <h2 className="text-xl font-bold text-white">{recipe.title}</h2>
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[calc(90vh-48px-72px)] sm:max-h-[calc(90vh-64px-88px)]">
          <div className="px-4 sm:px-6 py-4">
            <DialogHeader className="hidden sm:block mb-4">
              <DialogTitle className="text-2xl font-bold text-gray-800">
                {recipe.title}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center bg-orange-50 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 text-orange-500 mr-1.5" />
                <span className="text-sm font-medium text-gray-700">
                  {recipe.readyInMinutes} mins
                </span>
              </div>
              <div className="flex items-center bg-orange-50 px-3 py-1.5 rounded-full">
                <Users className="w-4 h-4 text-orange-500 mr-1.5" />
                <span className="text-sm font-medium text-gray-700">
                  {recipe.servings} servings
                </span>
              </div>
              {recipe.pricePerServing && (
                <div className="flex items-center bg-orange-50 px-3 py-1.5 rounded-full">
                  <DollarSign className="w-4 h-4 text-orange-500 mr-1.5" />
                  <span className="text-sm font-medium text-gray-700">
                    ${(recipe.pricePerServing / 100).toFixed(2)} per serving
                  </span>
                </div>
              )}
            </div>

            {recipe.diets && recipe.diets.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Dietary Information
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.diets.map((diet: string) => (
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
            )}

            {recipe.cuisines && recipe.cuisines.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Cuisine
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.cuisines.map((cuisine: string) => (
                    <Badge
                      key={cuisine}
                      className="bg-orange-100/50 text-orange-700 hover:bg-orange-100"
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                <ChefHat className="w-5 h-5 mr-2 text-orange-500" />
                Ingredients
              </h3>
              {recipe.extendedIngredients &&
              recipe.extendedIngredients.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1.5">
                  {recipe.extendedIngredients.map((ingredient: any) => (
                    <li key={ingredient.id} className="text-gray-700">
                      {ingredient.original}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  No ingredients information available
                </p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                <Clock className="w-5 h-5 mr-2 text-orange-500" />
                Instructions
              </h3>
              {recipe.instructions ? (
                <div
                  className="prose prose-sm max-w-none prose-headings:text-orange-600 prose-a:text-orange-500 prose-strong:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
              ) : (
                <p className="text-gray-500 italic">
                  No instructions available
                </p>
              )}
            </div>

            {recipe.creditsText && (
              <div className="mt-8 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Recipe source: {recipe.creditsText}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
