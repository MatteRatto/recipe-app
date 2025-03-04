import { Recipe } from "../types/recipe";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export const searchRecipes = async (
  query: string,
  cuisine?: string,
  diet?: string
): Promise<{ results: Recipe[] }> => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      query,
      addRecipeInformation: "true",
      number: "12",
      ...(cuisine && cuisine !== "all" && { cuisine }),
      ...(diet && diet !== "all" && { diet }),
    });

    const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
    if (!response.ok) throw new Error("Failed to fetch recipes");
    return response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getRecipeDetails = async (id: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch recipe details");
    return response.json();
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
};
