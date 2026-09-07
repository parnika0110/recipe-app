// src/app/api/recipes/generate/route.js
import { NextResponse } from "next/server";
import {
  generateRecipe,
  generateMultipleRecipes,
  generateRecipeByName,
  generateRecipeImage,
} from "@/lib/recipe-generator";
import { z } from "zod";

const generateRecipeSchema = z.object({
  ingredients: z.array(z.string()).min(1).optional(),
  dietaryRestrictions: z.array(z.string()).optional(),
  cuisinePreference: z.string().optional(),
  recipeName: z.string().optional(),
  searchMode: z.boolean().optional(),
  recipeCount: z.number().min(1).max(5).optional(),
});

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Recipe generation request:", body);

    // Validate input
    const parsed = generateRecipeSchema.parse(body);
    console.log("Validated input:", parsed);

    let recipes = [];
    const recipeCount = parsed.recipeCount || 1;

    // Check if this is a recipe name search or ingredient-based generation
    if (parsed.searchMode && parsed.recipeName) {
      // Generate recipe by name (single recipe)
      const recipe = await generateRecipeByName(parsed.recipeName);
      recipes = [recipe];
    } else if (parsed.ingredients && parsed.ingredients.length > 0) {
      // Generate recipes by ingredients
      if (recipeCount > 1) {
        // Generate multiple recipes
        recipes = await generateMultipleRecipes(
          parsed.ingredients,
          parsed.dietaryRestrictions,
          parsed.cuisinePreference,
          recipeCount
        );
      } else {
        // Generate single recipe
        const recipe = await generateRecipe(
          parsed.ingredients,
          parsed.dietaryRestrictions,
          parsed.cuisinePreference
        );
        recipes = [recipe];
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Either ingredients or recipe name is required",
        },
        { status: 400 }
      );
    }

    // Generate images for all recipes (non-blocking — recipe succeeds even if image fails)
    const recipesWithImages = await Promise.all(
      recipes.map(async (recipe) => {
        let imageUrl = null;
        try {
          imageUrl = await generateRecipeImage(recipe.title);
        } catch (imgError) {
          console.warn(`Failed to generate image for "${recipe.title}":`, imgError.message);
          imageUrl = null;
        }
        return {
          ...recipe,
          imageUrl,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: recipesWithImages,
      count: recipesWithImages.length,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Recipe generation error:", errorMessage);
    console.error("Full error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: errorMessage || "Failed to generate recipe" },
      { status: 500 }
    );
  }
}
