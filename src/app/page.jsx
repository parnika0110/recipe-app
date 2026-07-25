"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import IngredientInput from "@/components/IngredientInput";
import RecipeCard from "@/components/RecipeCard";
import {
  Sparkles,
  ChefHat,
  Clock,
  Users,
  Flame,
  ArrowDown,
} from "lucide-react";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (
    ingredients,
    dietary,
    cuisine,
    recipeCount = 3
  ) => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const response = await fetch("/api/recipes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients,
          dietaryRestrictions: dietary,
          cuisinePreference: cuisine,
          recipeCount: recipeCount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRecipes(data.data);
      } else {
        setError(data.error || "Failed to generate recipes");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate recipes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeSearch = async (recipeName) => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const response = await fetch("/api/recipes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeName,
          searchMode: true,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRecipes(data.data);
      } else {
        setError(data.error || "Failed to generate recipe");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section - Vintage Style */}
      <section className="relative overflow-hidden bg-[#f4e4c1]">
        {/* Decorative Border */}
        <div className="absolute inset-4 md:inset-8 border-2 border-[#8b7355]/30 rounded-lg pointer-events-none" />
        <div className="absolute inset-5 md:inset-9 border border-[#8b7355]/20 rounded-lg pointer-events-none" />

        {/* Corner Decorations */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 w-8 h-8 md:w-12 md:h-12 border-l-2 border-t-2 border-[#8b7355]/40 rounded-tl-lg" />
        <div className="absolute top-6 right-6 md:top-10 md:right-10 w-8 h-8 md:w-12 md:h-12 border-r-2 border-t-2 border-[#8b7355]/40 rounded-tr-lg" />
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-8 h-8 md:w-12 md:h-12 border-l-2 border-b-2 border-[#8b7355]/40 rounded-bl-lg" />
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-8 h-8 md:w-12 md:h-12 border-r-2 border-b-2 border-[#8b7355]/40 rounded-br-lg" />

        {/* Decorative Swirls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/4 left-[5%] text-[#8b7355] text-4xl md:text-6xl font-serif"
        >
          ❧
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.6 }}
          className="absolute top-1/4 right-[5%] text-[#8b7355] text-4xl md:text-6xl font-serif transform scale-x-[-1]"
        >
          ❧
        </motion.div>

        <div className="relative container mx-auto px-4 md:px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Chef Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6"
            >
              <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto">
                <Image
                  src="/logo.png"
                  alt="Chef"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent to-[#8b7355]/50" />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-[#8b7355] text-lg"
              >
                ✦
              </motion.div>
              <div className="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent to-[#8b7355]/50" />
            </div>
            {/* Main Heading - Vintage Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#5c4a3a] tracking-wide font-[family-name:var(--font-playfair)]"
            >
              KhanaKreation
            </motion.h1>{" "}
            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[2px] w-20 md:w-32 bg-[#8b7355]/40" />
              <span className="text-[#8b7355] text-xl">❖</span>
              <div className="h-[2px] w-20 md:w-32 bg-[#8b7355]/40" />
            </div>
            {/* Tagline */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl text-[#8b7355] mb-2 tracking-widest uppercase font-[family-name:var(--font-playfair)]"
            >
              Your Culinary Canvas
            </motion.h2>
            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] w-16 md:w-24 bg-[#8b7355]/30" />
              <div className="h-[1px] w-16 md:w-24 bg-[#8b7355]/30" />
            </div>
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-[#8b7355]/80 mb-8 tracking-wider uppercase"
            >
              Discover, Cook • Savour
            </motion.p>
            {/* Main Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-10"
            >
              <p className="text-lg md:text-xl text-[#5c4a3a] font-medium tracking-wide uppercase">
                Turn Ingredients Into Gourmet Dishes –
              </p>
              <p className="text-lg md:text-xl text-[#5c4a3a] font-medium tracking-wide uppercase">
                – Fast & AI-Powered!
              </p>
            </motion.div>
            {/* Get Started Button - Vintage Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document.getElementById("recipe-generator")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#5c4a3a] hover:bg-[#4a3c30] text-[#f4e4c1] font-semibold text-lg rounded-full shadow-xl transition-all border-2 border-[#8b7355]/50 tracking-wider uppercase"
              >
                <span>Get Started</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
            {/* Stats - Vintage Style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#5c4a3a]">
                  10K+
                </div>
                <div className="text-sm text-[#8b7355] font-medium tracking-wider uppercase">
                  Recipes Created
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#5c4a3a]">
                  50+
                </div>
                <div className="text-sm text-[#8b7355] font-medium tracking-wider uppercase">
                  Cuisines
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#5c4a3a]">
                  5K+
                </div>
                <div className="text-sm text-[#8b7355] font-medium tracking-wider uppercase">
                  Happy Cooks
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Input Section */}
      <section
        id="recipe-generator"
        className="relative py-16 md:py-24 bg-white scroll-mt-4"
      >
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#f4e4c1] to-transparent" />
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <IngredientInput
              onSearch={handleSearch}
              onRecipeSearch={handleRecipeSearch}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </section>

      {/* Error State */}
      {error && (
        <section className="container mx-auto px-4 md:px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <h3 className="font-semibold text-red-800 mb-1">
                  Something went wrong
                </h3>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Recipe Results */}
      {recipes.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#f4e4c1]/30">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5c4a3a]/10 rounded-full mb-6 border border-[#8b7355]/30">
                <Sparkles size={16} className="text-[#5c4a3a]" />
                <span className="text-sm font-semibold text-[#5c4a3a] tracking-wider uppercase">
                  Recipe Ready!
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#5c4a3a] mb-4 font-[family-name:var(--font-playfair)]">
                Your Perfect Recipe
              </h2>
              <p className="text-xl text-[#8b7355] max-w-xl mx-auto">
                Crafted with AI, perfected for your taste
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {recipes.map((recipe, index) => {
                const recipeHref = `/recipes/recipe-${index}?recipe=${encodeURIComponent(
                  JSON.stringify(recipe)
                )}`;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <RecipeCard
                      id={`recipe-${index}`}
                      title={recipe.title}
                      description={recipe.description}
                      imageUrl={recipe.imageUrl}
                      cookTime={recipe.cookTime}
                      difficulty={recipe.difficulty}
                      cuisine={recipe.cuisine}
                      href={recipeHref}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!isLoading && recipes.length === 0 && !error && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#f4e4c1]/30">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                <div className="relative">
                  <div className="w-32 h-32 mx-auto bg-[#f4e4c1] rounded-full flex items-center justify-center shadow-xl border-2 border-[#8b7355]/30 mb-8">
                    <ChefHat size={56} className="text-[#5c4a3a]" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-[#8b7355] rounded-full flex items-center justify-center"
                  >
                    <Sparkles size={16} className="text-[#f4e4c1]" />
                  </motion.div>
                </div>
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-bold text-[#5c4a3a] mb-4 font-[family-name:var(--font-playfair)]">
                Ready to Cook Something Amazing?
              </h3>
              <p className="text-lg text-[#8b7355] max-w-md mx-auto mb-8">
                Add your ingredients above and let our AI chef create the
                perfect recipe for you.
              </p>

              {/* Feature highlights */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#f4e4c1] rounded-full shadow-md border border-[#8b7355]/30">
                  <Clock size={18} className="text-[#5c4a3a]" />
                  <span className="text-sm font-medium text-[#5c4a3a]">
                    Quick Recipes
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#f4e4c1] rounded-full shadow-md border border-[#8b7355]/30">
                  <Users size={18} className="text-[#5c4a3a]" />
                  <span className="text-sm font-medium text-[#5c4a3a]">
                    Any Serving Size
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#f4e4c1] rounded-full shadow-md border border-[#8b7355]/30">
                  <Flame size={18} className="text-[#5c4a3a]" />
                  <span className="text-sm font-medium text-[#5c4a3a]">
                    Nutrition Info
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer - Vintage Style */}
      <footer className="bg-[#5c4a3a] text-[#f4e4c1] py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="KhanaKreation"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="text-xl font-semibold tracking-wide font-[family-name:var(--font-playfair)]">
                KhanaKreation
              </span>
            </div>
            <p className="text-sm text-[#f4e4c1]/70 tracking-wider">
              © 2025 KhanaKreation. Crafted with ❤️ and AI.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
