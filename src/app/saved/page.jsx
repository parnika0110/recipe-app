// src/app/saved/page.jsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import {
  ArrowLeft,
  Trash2,
  Heart,
  BookmarkCheck,
  Sparkles,
} from "lucide-react";

export default function SavedRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(`/api/recipes/saved?userId=${userId}`);
        const data = await response.json();

        if (data.success) {
          setSavedRecipes(data.data);
        }
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      await fetch("/api/recipes/saved", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, userId }),
      });

      setSavedRecipes(savedRecipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-emerald-50/30">
      {/* Hero Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-16 md:py-20"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-light">Back to Home</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <BookmarkCheck size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">
                My <span className="font-medium">Saved Recipes</span>
              </h1>
              <p className="text-white/80 mt-2 text-lg font-light flex items-center gap-2">
                <Heart size={16} className="text-red-300" />
                {savedRecipes.length} recipe
                {savedRecipes.length !== 1 ? "s" : ""} in your collection
              </p>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-emerald-600" />
              </div>
              <p className="mt-4 text-stone-600 font-light">
                Loading your recipes...
              </p>
            </div>
          </div>
        ) : savedRecipes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-block p-12 bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 max-w-md"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto">
                  <BookmarkCheck size={40} className="text-emerald-600" />
                </div>
              </motion.div>
              <h3 className="text-stone-900 text-2xl font-medium mb-3">
                No saved recipes yet
              </h3>
              <p className="text-stone-500 text-base mb-8 font-light leading-relaxed">
                Start exploring and save your favorite AI-generated recipes to
                build your personal cookbook
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5"
              >
                <Sparkles size={18} />
                Generate Recipes
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <>
            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-white rounded-xl border border-stone-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-stone-600 font-light">
                  Showing{" "}
                  <span className="font-medium text-stone-900">
                    {savedRecipes.length}
                  </span>{" "}
                  saved recipes
                </p>
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <Heart size={14} className="text-red-400" />
                  <span>Your favorites</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedRecipes.map((savedRecipe, index) => {
                let recipe;
                try {
                  recipe = JSON.parse(savedRecipe.recipe);
                } catch {
                  return null;
                }

                return (
                  <motion.div
                    key={savedRecipe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="relative group"
                  >
                    <RecipeCard
                      id={`saved-${savedRecipe.id}`}
                      title={recipe.title}
                      description={recipe.description}
                      imageUrl={recipe.imageUrl}
                      cookTime={recipe.cookTime}
                      difficulty={recipe.difficulty}
                      cuisine={recipe.cuisine}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(savedRecipe.id)}
                      className="absolute top-4 left-4 p-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                      title="Remove from saved"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
