// src/lib/recipe-generator.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateRecipe(
  ingredients,
  dietaryRestrictions,
  cuisinePreference
) {
  if (
    !process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY === "your_gemini_api_key_here"
  ) {
    throw new Error(
      "Gemini API key not configured. Please set GEMINI_API_KEY in .env.local"
    );
  }

  const prompt = `Generate a detailed recipe using these ingredients: ${ingredients.join(
    ", "
  )}.
  ${
    dietaryRestrictions?.length
      ? `Dietary restrictions: ${dietaryRestrictions.join(", ")}.`
      : ""
  }
  ${cuisinePreference ? `Cuisine preference: ${cuisinePreference}.` : ""}
  
  Return the recipe as a JSON object with this exact structure. IMPORTANT: All amount values must be numbers (decimals), not fractions. Use 0.5 for 1/2, 0.25 for 1/4, etc:
  {
    "title": "Recipe Title",
    "description": "Brief description",
    "ingredients": [{"name": "ingredient", "amount": 1.0, "unit": "cup"}],
    "instructions": ["Step 1", "Step 2", "Step 3"],
    "servings": 4,
    "prepTime": 15,
    "cookTime": 30,
    "difficulty": "Easy",
    "cuisine": "Cuisine Type",
    "nutrition": {"calories": 300, "protein": 15, "carbs": 45, "fat": 10}
  }
  
  Ensure the response is valid JSON only. No markdown, no code blocks, just raw JSON.`;

  return await callGeminiAPI(prompt);
}

export async function generateMultipleRecipes(
  ingredients,
  dietaryRestrictions,
  cuisinePreference,
  count = 3
) {
  if (
    !process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY === "your_gemini_api_key_here"
  ) {
    throw new Error(
      "Gemini API key not configured. Please set GEMINI_API_KEY in .env.local"
    );
  }

  const prompt = `Generate ${count} DIFFERENT and UNIQUE detailed recipes using these ingredients: ${ingredients.join(
    ", "
  )}.
  ${
    dietaryRestrictions?.length
      ? `Dietary restrictions: ${dietaryRestrictions.join(", ")}.`
      : ""
  }
  ${cuisinePreference ? `Cuisine preference: ${cuisinePreference}.` : ""}
  
  IMPORTANT: Each recipe must be COMPLETELY DIFFERENT from the others - different cooking methods, different flavor profiles, different dish types.
  
  Return the recipes as a JSON array with this exact structure. IMPORTANT: All amount values must be numbers (decimals), not fractions. Use 0.5 for 1/2, 0.25 for 1/4, etc:
  [
    {
      "title": "Recipe Title 1",
      "description": "Brief description",
      "ingredients": [{"name": "ingredient", "amount": 1.0, "unit": "cup"}],
      "instructions": ["Step 1", "Step 2", "Step 3"],
      "servings": 4,
      "prepTime": 15,
      "cookTime": 30,
      "difficulty": "Easy",
      "cuisine": "Cuisine Type",
      "nutrition": {"calories": 300, "protein": 15, "carbs": 45, "fat": 10}
    },
    {
      "title": "Recipe Title 2",
      "description": "Brief description",
      "ingredients": [{"name": "ingredient", "amount": 1.0, "unit": "cup"}],
      "instructions": ["Step 1", "Step 2", "Step 3"],
      "servings": 4,
      "prepTime": 15,
      "cookTime": 30,
      "difficulty": "Easy",
      "cuisine": "Cuisine Type",
      "nutrition": {"calories": 300, "protein": 15, "carbs": 45, "fat": 10}
    }
  ]
  
  Generate exactly ${count} recipes. Ensure the response is valid JSON array only. No markdown, no code blocks, just raw JSON.`;

  return await callGeminiAPIMultiple(prompt);
}

export async function generateRecipeByName(recipeName) {
  if (
    !process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY === "your_gemini_api_key_here"
  ) {
    throw new Error(
      "Gemini API key not configured. Please set GEMINI_API_KEY in .env.local"
    );
  }

  const prompt = `Generate a detailed, authentic recipe for "${recipeName}".
  
  Create a complete recipe with all the traditional ingredients and cooking methods for this dish. Make it authentic and delicious.
  
  Return the recipe as a JSON object with this exact structure. IMPORTANT: All amount values must be numbers (decimals), not fractions. Use 0.5 for 1/2, 0.25 for 1/4, etc:
  {
    "title": "${recipeName}",
    "description": "Brief appetizing description of the dish",
    "ingredients": [{"name": "ingredient", "amount": 1.0, "unit": "cup"}],
    "instructions": ["Step 1", "Step 2", "Step 3"],
    "servings": 4,
    "prepTime": 15,
    "cookTime": 30,
    "difficulty": "Easy or Medium or Hard",
    "cuisine": "Cuisine Type (e.g., Italian, Indian, Mexican)",
    "nutrition": {"calories": 300, "protein": 15, "carbs": 45, "fat": 10}
  }
  
  Ensure the response is valid JSON only. No markdown, no code blocks, just raw JSON.`;

  return await callGeminiAPI(prompt);
}

async function callGeminiAPI(prompt) {
  // Try multiple models in case one is rate-limited
  const models = [
    "gemini-3.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
  ];

  let lastError = null;

  for (const modelName of models) {
    try {
      console.log(
        `Attempting to call Gemini API (${modelName}) with key:`,
        process.env.GEMINI_API_KEY?.substring(0, 10) + "..."
      );

      let model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const content = result.response.text();

      console.log("Gemini raw response length:", content.length);

      if (!content) {
        throw new Error("No response from Gemini");
      }

      // Extract JSON from the response
      let jsonStr = content.trim();

      // Remove markdown code blocks if present
      if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr
          .replace(/^```(?:json)?\s*/m, "")
          .replace(/\s*```$/, "");
      }

      // Find the first { and last } to extract JSON
      const firstBrace = jsonStr.indexOf("{");
      const lastBrace = jsonStr.lastIndexOf("}");

      if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
        console.error("Could not find JSON boundaries in response:", jsonStr);
        throw new Error("No valid JSON found in response");
      }

      let jsonMatch = jsonStr.substring(firstBrace, lastBrace + 1);

      // Sanitize JSON: fix fractions to decimals (1/2 -> 0.5, 1/4 -> 0.25, etc.)
      // Handle various fraction formats: "amount": 1/2 or "amount": 1/2, or "amount":1/4
      jsonMatch = jsonMatch.replace(
        /("amount"\s*:\s*)(\d+)\/(\d+)/g,
        (match, prefix, num, denom) => {
          const result = parseInt(num) / parseInt(denom);
          return `${prefix}${result}`;
        }
      );

      // Also handle mixed numbers like 1 1/2 -> 1.5
      jsonMatch = jsonMatch.replace(
        /("amount"\s*:\s*)(\d+)\s+(\d+)\/(\d+)/g,
        (match, prefix, whole, num, denom) => {
          const result = parseInt(whole) + parseInt(num) / parseInt(denom);
          return `${prefix}${result}`;
        }
      );

      // Remove any "notes" fields that might not be in our schema
      jsonMatch = jsonMatch.replace(/,?\s*"notes":\s*"[^"]*"/g, "");

      // Remove trailing commas before closing braces/brackets (invalid JSON)
      jsonMatch = jsonMatch.replace(/,\s*([\]}])/g, "$1");

      console.log(
        "Sanitized JSON string (first 500 chars):",
        jsonMatch.substring(0, 500)
      );

      const recipe = JSON.parse(jsonMatch);
      return recipe;
    } catch (error) {
      console.error(`Gemini API Error (${modelName}):`, error?.message);
      lastError = error;

      // If it's a rate limit error, try the next model
      if (
        error?.message?.includes("429") ||
        error?.message?.includes("quota")
      ) {
        console.log(`Model ${modelName} rate limited, trying next model...`);
        continue;
      }

      // For other errors, throw immediately
      throw error;
    }
  }

  // If all models failed, throw the last error
  console.error("All models failed. Last error:", lastError);
  throw lastError || new Error("All Gemini models failed");
}

async function callGeminiAPIMultiple(prompt) {
  // Try multiple models in case one is rate-limited
  const models = [
    "gemini-3.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
  ];

  let lastError = null;

  for (const modelName of models) {
    try {
      console.log(
        `Attempting to call Gemini API (${modelName}) for multiple recipes with key:`,
        process.env.GEMINI_API_KEY?.substring(0, 10) + "..."
      );

      let model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const content = result.response.text();

      console.log("Gemini raw response length:", content.length);

      if (!content) {
        throw new Error("No response from Gemini");
      }

      // Extract JSON from the response
      let jsonStr = content.trim();

      // Remove markdown code blocks if present
      if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr
          .replace(/^```(?:json)?\s*/m, "")
          .replace(/\s*```$/, "");
      }

      // Find the first [ and last ] to extract JSON array
      const firstBracket = jsonStr.indexOf("[");
      const lastBracket = jsonStr.lastIndexOf("]");

      if (
        firstBracket === -1 ||
        lastBracket === -1 ||
        lastBracket <= firstBracket
      ) {
        console.error(
          "Could not find JSON array boundaries in response:",
          jsonStr
        );
        throw new Error("No valid JSON array found in response");
      }

      let jsonMatch = jsonStr.substring(firstBracket, lastBracket + 1);

      // Sanitize JSON: fix fractions to decimals
      jsonMatch = jsonMatch.replace(
        /("amount"\s*:\s*)(\d+)\/(\d+)/g,
        (match, prefix, num, denom) => {
          const result = parseInt(num) / parseInt(denom);
          return `${prefix}${result}`;
        }
      );

      // Handle mixed numbers like 1 1/2 -> 1.5
      jsonMatch = jsonMatch.replace(
        /("amount"\s*:\s*)(\d+)\s+(\d+)\/(\d+)/g,
        (match, prefix, whole, num, denom) => {
          const result = parseInt(whole) + parseInt(num) / parseInt(denom);
          return `${prefix}${result}`;
        }
      );

      // Remove any "notes" fields
      jsonMatch = jsonMatch.replace(/,?\s*"notes":\s*"[^"]*"/g, "");

      // Remove trailing commas
      jsonMatch = jsonMatch.replace(/,\s*([\]}])/g, "$1");

      console.log(
        "Sanitized JSON array (first 500 chars):",
        jsonMatch.substring(0, 500)
      );

      const recipes = JSON.parse(jsonMatch);
      return Array.isArray(recipes) ? recipes : [recipes];
    } catch (error) {
      console.error(`Gemini API Error (${modelName}):`, error?.message);
      lastError = error;

      if (
        error?.message?.includes("429") ||
        error?.message?.includes("quota")
      ) {
        console.log(`Model ${modelName} rate limited, trying next model...`);
        continue;
      }

      throw error;
    }
  }

  console.error("All models failed. Last error:", lastError);
  throw lastError || new Error("All Gemini models failed");
}

export async function generateRecipeImage(recipeName) {
  // Use Pollinations.ai current unified API: https://gen.pollinations.ai/image/{prompt}
  // Documentation: https://gen.pollinations.ai/docs
  // Auth: "Authorization: Bearer sk_..." header (server-side) or ?key=pk_... query param (client-side/Browser).
  // NEVER expose sk_ keys in client-side code or public URLs.
  const apiKey = process.env.POLLINATIONS_API_KEY;
  const cleanName = recipeName.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  const prompt = `${cleanName} food dish, professional photography, appetizing, restaurant quality`;
  const encodedPrompt = encodeURIComponent(prompt);
  const baseUrl = "https://gen.pollinations.ai/image/" + encodedPrompt;

  // For server-side image fetching we would use Authorization header, but the image URL is returned
  // to the client for embedding. The Pollinations browser-compatible pattern is to pass the app key
  // (pk_...) as a query parameter so the browser can fetch the image directly.
  // If a sk_ key is provided we do NOT embed it in the URL — the browser will call the public endpoint
  // without auth, which is fine for the free tier. If a pk_ app key is available, include it so the
  // browser request is authenticated.
  if (apiKey && apiKey.startsWith("pk_")) {
    return `${baseUrl}?key=${encodeURIComponent(apiKey)}&width=512&height=512`;
  }

  // No valid public (pk_) key available — return the unauthenticated URL.
  // The free tier still works without a key for basic usage.
  return `${baseUrl}?width=512&height=512`;
}
