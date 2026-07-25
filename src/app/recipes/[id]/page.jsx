// src/app/recipes/[id]/page.jsx
"use client";

import { useState, use, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SaveButton from "@/components/SaveButton";
import RatingComponent from "@/components/RatingComponent";
import CommentSection from "@/components/CommentSection";
import {
  ArrowLeft,
  Clock,
  Users,
  Flame,
  BookOpen,
  ChefHat,
  Sparkles,
  Utensils,
  Check,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function RecipePage({ params }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(4);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  // Try to get recipe data from URL params or fetch from DB
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Check if recipe data is in URL params (passed from home page)
        const recipeParam = searchParams.get("recipe");
        if (recipeParam) {
          const parsedRecipe = JSON.parse(decodeURIComponent(recipeParam));
          setRecipe(parsedRecipe);
          setServings(parsedRecipe.servings);
          setImageUrl(parsedRecipe.imageUrl);
          setLoading(false);
          return;
        }

        // Otherwise try to fetch from database
        const response = await fetch(`/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error("Recipe not found");
        }
        const data = await response.json();
        setRecipe(data);
        setServings(data.servings);
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        // Show error state
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id, searchParams]);

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-emerald-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <ChefHat className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-emerald-600" />
          </div>
          <p className="mt-4 text-stone-600 font-light">
            Loading your recipe...
          </p>
        </div>
      </main>
    );
  }

  if (!recipe) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-emerald-50/30">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md shadow-sm border-b border-stone-200/50 sticky top-0 z-50"
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors font-medium group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Back to Home</span>
            </Link>
          </div>
        </motion.header>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block p-8 bg-white rounded-2xl shadow-lg border border-stone-100">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils size={32} className="text-stone-400" />
            </div>
            <p className="text-stone-600 font-light text-lg">
              Recipe not found.
            </p>
            <Link
              href="/"
              className="inline-block mt-6 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              ← Go back home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const scaleAmount = (amount) => (amount * servings) / recipe.servings;

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-emerald-50/30">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md shadow-sm border-b border-stone-200/50 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-stone-600 hover:text-emerald-600 font-medium transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <ChefHat size={16} className="text-white" />
            </div>
            <span className="text-lg font-medium bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Recipe
            </span>
          </div>
          <div className="w-24"></div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl shadow-stone-200/50 overflow-hidden border border-stone-100"
        >
          {/* Recipe Image and Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-80 lg:h-auto lg:min-h-[500px]">
              {imageUrl &&
                (imageUrl.includes("pollinations.ai") ? (
                  <img
                    src={imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={imageUrl}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating badges on image */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-stone-800 rounded-full text-sm font-medium shadow-lg">
                  {recipe.cuisine}
                </span>
                <span
                  className={`px-3 py-1.5 backdrop-blur-sm rounded-full text-sm font-medium shadow-lg ${
                    recipe.difficulty === "Easy"
                      ? "bg-green-500/90 text-white"
                      : recipe.difficulty === "Medium"
                      ? "bg-yellow-500/90 text-white"
                      : "bg-red-500/90 text-white"
                  }`}
                >
                  {recipe.difficulty}
                </span>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-8 lg:p-10 flex flex-col">
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 text-emerald-600 mb-3">
                    <Sparkles size={16} />
                    <span className="text-sm font-medium">
                      AI Generated Recipe
                    </span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4 leading-tight">
                    {recipe.title}
                  </h1>
                  <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                    {recipe.description}
                  </p>
                </motion.div>

                {/* Time & Servings Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-3 gap-4 mb-8"
                >
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Clock size={20} className="text-emerald-600" />
                    </div>
                    <p className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                      Prep
                    </p>
                    <p className="text-xl font-bold text-stone-900">
                      {recipe.prepTime}m
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Flame size={20} className="text-teal-600" />
                    </div>
                    <p className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                      Cook
                    </p>
                    <p className="text-xl font-bold text-stone-900">
                      {recipe.cookTime}m
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl border border-cyan-100">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Users size={20} className="text-cyan-600" />
                    </div>
                    <p className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                      Servings
                    </p>
                    <input
                      type="number"
                      value={servings}
                      onChange={(e) =>
                        setServings(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-full text-center border-0 bg-transparent font-bold text-xl text-stone-900 focus:outline-none focus:ring-0"
                      min="1"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <SaveButton recipeTitle={recipe.title} recipe={recipe} />
              </motion.div>
            </div>
          </div>

          {/* Ingredients and Instructions */}
          <div className="border-t border-stone-200 px-6 lg:px-10 py-10">
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-10 p-1.5 bg-stone-100 rounded-xl inline-flex">
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`px-6 py-3 font-medium text-sm rounded-lg transition-all ${
                  activeTab === "ingredients"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab("instructions")}
                className={`px-6 py-3 font-medium text-sm rounded-lg transition-all ${
                  activeTab === "instructions"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Instructions
              </button>
              <button
                onClick={() => setActiveTab("nutrition")}
                className={`px-6 py-3 font-medium text-sm rounded-lg transition-all ${
                  activeTab === "nutrition"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Nutrition
              </button>
            </div>

            {/* Ingredients Tab */}
            {activeTab === "ingredients" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-stone-900">
                    Ingredients
                  </h3>
                  <span className="text-sm text-stone-500">
                    {Object.values(checkedIngredients).filter(Boolean).length}{" "}
                    of {recipe.ingredients.length} checked
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => toggleIngredient(index)}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        checkedIngredients[index]
                          ? "bg-emerald-50 border-emerald-200"
                          : "bg-stone-50 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          checkedIngredients[index]
                            ? "bg-emerald-500 border-emerald-500"
                            : "border-stone-300"
                        }`}
                      >
                        {checkedIngredients[index] && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                      <span
                        className={`transition-all ${
                          checkedIngredients[index]
                            ? "text-stone-500 line-through"
                            : "text-stone-800"
                        }`}
                      >
                        <span className="font-semibold text-emerald-700">
                          {scaleAmount(ingredient.amount).toFixed(1)}
                        </span>{" "}
                        {ingredient.unit} {ingredient.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Instructions Tab */}
            {activeTab === "instructions" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                <h3 className="text-2xl font-bold text-stone-900 mb-6">
                  Instructions
                </h3>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="flex gap-5 p-6 bg-gradient-to-r from-stone-50 to-white rounded-xl border border-stone-200 hover:border-emerald-200 hover:shadow-md transition-all"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg shadow-emerald-500/20">
                        {index + 1}
                      </div>
                      <p className="text-stone-700 leading-relaxed pt-2">
                        {instruction}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Nutrition Tab */}
            {activeTab === "nutrition" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl"
              >
                <h3 className="text-2xl font-bold text-stone-900 mb-6">
                  Nutrition Per Serving
                </h3>
                <div className="space-y-4">
                  {/* Calories - Featured */}
                  <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white shadow-lg shadow-emerald-500/25">
                    <p className="text-emerald-100 text-sm font-medium uppercase tracking-wide mb-1">
                      Total Calories
                    </p>
                    <p className="text-5xl font-bold">
                      {recipe.nutrition?.calories || 0}
                    </p>
                  </div>

                  {/* Macros Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl text-center border border-blue-100">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold text-lg">
                          P
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">
                        Protein
                      </p>
                      <p className="font-bold text-2xl text-stone-900">
                        {recipe.nutrition?.protein || 0}g
                      </p>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl text-center border border-amber-100">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <span className="text-amber-600 font-bold text-lg">
                          C
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">
                        Carbs
                      </p>
                      <p className="font-bold text-2xl text-stone-900">
                        {recipe.nutrition?.carbs || 0}g
                      </p>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl text-center border border-rose-100">
                      <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <span className="text-rose-600 font-bold text-lg">
                          F
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">
                        Fat
                      </p>
                      <p className="font-bold text-2xl text-stone-900">
                        {recipe.nutrition?.fat || 0}g
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Rating and Comments Section */}
          <div className="border-t border-stone-200 px-6 lg:px-10 py-10 bg-gradient-to-br from-stone-50 to-white">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-10"
            >
              <RatingComponent recipeId={id} />
            </motion.div>

            <CommentSection recipeId={id} />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
