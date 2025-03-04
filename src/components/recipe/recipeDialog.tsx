import { Clock, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface RecipeDialogProps {
  recipe: any;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeDialog = ({
  recipe,
  isOpen,
  onClose,
}: RecipeDialogProps) => {
  if (!recipe) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {recipe.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-lg"
          />

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{recipe.readyInMinutes} mins</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {recipe.diets?.map((diet: string) => (
              <Badge key={diet} variant="outline">
                {diet}
              </Badge>
            ))}
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Ingredients</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.extendedIngredients?.map((ingredient: any) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Instructions</h3>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
