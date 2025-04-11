import { Search, Filter, ChefHat, Utensils } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { RecipeFilterProps } from "../../types/recipeTypes";

const cuisineTypes = [
  "All",
  "Italian",
  "Mexican",
  "Asian",
  "Mediterranean",
  "American",
  "Indian",
];

const dietTypes = [
  "All",
  "Vegetarian",
  "Vegan",
  "Gluten Free",
  "Ketogenic",
  "Paleo",
];

export const RecipeFilterBar = ({
  filters,
  onFilterChange,
  onSearch,
  isLoading,
}: RecipeFilterProps) => {
  return (
    <div className="relative backdrop-blur-sm bg-white/70 rounded-2xl shadow-lg p-8 mb-8 border border-white/20">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/10 to-orange-100/10 rounded-2xl" />

      <div className="absolute -top-3 -right-3">
        <div className="relative bg-orange-100 p-2 rounded-full">
          <Filter className="w-5 h-5 text-orange-500" />
        </div>
      </div>
      <div className="absolute -bottom-3 -left-3">
        <div className="relative bg-orange-100 p-2 rounded-full">
          <ChefHat className="w-5 h-5 text-orange-500" />
        </div>
      </div>

      <div className="relative space-y-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="What would you like to cook today?"
            value={filters.query}
            onChange={(e) => onFilterChange("query", e.target.value)}
            className="w-full pl-12 h-14 bg-white/80 border-orange-100 rounded-xl 
                     focus:ring-orange-200 focus:border-orange-300 transition-all"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            value={filters.cuisine}
            onValueChange={(value) => onFilterChange("cuisine", value)}
          >
            <SelectTrigger className="h-12 bg-white/80 border-orange-100 rounded-xl hover:border-orange-200 transition-all">
              <div className="flex items-center">
                <Utensils className="w-4 h-4 mr-2 text-orange-400" />
                <SelectValue placeholder="Select cuisine" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-lg border-orange-100">
              {cuisineTypes.map((cuisine) => (
                <SelectItem
                  key={cuisine.toLowerCase()}
                  value={cuisine.toLowerCase()}
                  className="hover:bg-orange-50 focus:bg-orange-50 cursor-pointer"
                >
                  {cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.diet}
            onValueChange={(value) => onFilterChange("diet", value)}
          >
            <SelectTrigger className="h-12 bg-white/80 border-orange-100 rounded-xl hover:border-orange-200 transition-all">
              <div className="flex items-center">
                <Filter className="w-4 h-4 mr-2 text-orange-400" />
                <SelectValue placeholder="Select diet" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-lg border-orange-100">
              {dietTypes.map((diet) => (
                <SelectItem
                  key={diet.toLowerCase()}
                  value={diet.toLowerCase()}
                  className="hover:bg-orange-50 focus:bg-orange-50 cursor-pointer"
                >
                  {diet}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={onSearch}
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 
                     hover:from-orange-600 hover:to-orange-700 rounded-xl
                     text-white font-medium shadow-lg shadow-orange-200
                     hover:shadow-orange-300 transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Searching...
            </div>
          ) : (
            <div className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search Recipes
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};
