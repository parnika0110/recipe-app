// src/components/IngredientInput.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Sparkles, Search, Leaf, Globe, BookOpen } from "lucide-react";

// Common ingredients for auto-suggestions
const COMMON_INGREDIENTS = [
  // Proteins
  "chicken",
  "beef",
  "pork",
  "lamb",
  "fish",
  "salmon",
  "tuna",
  "shrimp",
  "prawns",
  "crab",
  "eggs",
  "tofu",
  "tempeh",
  "paneer",
  "turkey",
  "duck",
  "bacon",
  "sausage",
  "ham",
  // Vegetables
  "tomato",
  "onion",
  "garlic",
  "potato",
  "carrot",
  "broccoli",
  "spinach",
  "lettuce",
  "cucumber",
  "bell pepper",
  "mushroom",
  "zucchini",
  "eggplant",
  "cabbage",
  "cauliflower",
  "celery",
  "corn",
  "peas",
  "green beans",
  "asparagus",
  "kale",
  "avocado",
  "artichoke",
  // Fruits
  "lemon",
  "lime",
  "orange",
  "apple",
  "banana",
  "mango",
  "pineapple",
  "strawberry",
  "blueberry",
  "raspberry",
  "grapes",
  "watermelon",
  "peach",
  "pear",
  "coconut",
  // Grains & Pasta
  "rice",
  "pasta",
  "noodles",
  "bread",
  "flour",
  "oats",
  "quinoa",
  "couscous",
  "barley",
  // Dairy
  "milk",
  "cheese",
  "butter",
  "cream",
  "yogurt",
  "sour cream",
  "mozzarella",
  "cheddar",
  "parmesan",
  "feta",
  "cream cheese",
  // Legumes
  "chickpeas",
  "lentils",
  "black beans",
  "kidney beans",
  "pinto beans",
  "white beans",
  // Herbs & Spices
  "basil",
  "oregano",
  "thyme",
  "rosemary",
  "cilantro",
  "parsley",
  "mint",
  "dill",
  "cumin",
  "paprika",
  "turmeric",
  "cinnamon",
  "ginger",
  "chili",
  "pepper",
  "salt",
  // Pantry Staples
  "olive oil",
  "vegetable oil",
  "soy sauce",
  "vinegar",
  "honey",
  "sugar",
  "maple syrup",
  "tomato sauce",
  "coconut milk",
  "stock",
  "broth",
  "mustard",
  "mayonnaise",
  "ketchup",
];

const DIETARY_OPTIONS = [
  { name: "Vegetarian", icon: "🥬" },
  { name: "Vegan", icon: "🌱" },
  { name: "Gluten-Free", icon: "🌾" },
  { name: "Dairy-Free", icon: "🥛" },
  { name: "Keto", icon: "🥑" },
  { name: "Paleo", icon: "🍖" },
  { name: "Halal", icon: "✓" },
];

const CUISINE_OPTIONS = [
  { name: "Italian", flag: "🇮🇹" },
  { name: "Indian", flag: "🇮🇳" },
  { name: "Mexican", flag: "🇲🇽" },
  { name: "Chinese", flag: "🇨🇳" },
  { name: "Japanese", flag: "🇯🇵" },
  { name: "Thai", flag: "🇹🇭" },
  { name: "Mediterranean", flag: "🌊" },
  { name: "American", flag: "🇺🇸" },
  { name: "Middle Eastern", flag: "🧆" },
];

export default function IngredientInput({
  onSearch,
  onRecipeSearch,
  isLoading = false,
}) {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState("ingredients"); // "ingredients" or "search"
  const [recipeSearchQuery, setRecipeSearchQuery] = useState("");
  const [recipeCount, setRecipeCount] = useState(3); // Default to 3 recipes

  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.trim().length > 0) {
      const filtered = COMMON_INGREDIENTS.filter(
        (ingredient) =>
          ingredient.toLowerCase().includes(inputValue.toLowerCase()) &&
          !ingredients.includes(ingredient)
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedSuggestionIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, ingredients]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddIngredient = (e) => {
    e?.preventDefault();
    const value = inputValue.trim();
    if (value && !ingredients.includes(value)) {
      setIngredients([...ingredients, value]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (!ingredients.includes(suggestion)) {
      setIngredients([...ingredients, suggestion]);
    }
    setInputValue("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) {
      if (e.key === "Enter") {
        handleAddIngredient(e);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
        } else {
          handleAddIngredient(e);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleDietaryToggle = (dietary) => {
    setSelectedDietary((prev) =>
      prev.includes(dietary)
        ? prev.filter((d) => d !== dietary)
        : [...prev, dietary]
    );
  };

  const handleSearch = () => {
    if (ingredients.length > 0) {
      onSearch(
        ingredients,
        selectedDietary.length > 0 ? selectedDietary : undefined,
        selectedCuisine || undefined,
        recipeCount
      );
    }
  };

  const handleRecipeSearch = (e) => {
    e.preventDefault();
    if (recipeSearchQuery.trim() && onRecipeSearch) {
      onRecipeSearch(recipeSearchQuery.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl shadow-stone-200/50 p-8 md:p-10 border border-stone-100"
      >
        {/* Tab Switcher */}
        <div className="flex gap-2 p-1.5 bg-stone-100 rounded-2xl mb-8">
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === "ingredients"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            <Leaf size={18} />
            <span>By Ingredients</span>
          </button>
          <button
            onClick={() => setActiveTab("search")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === "search"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            <BookOpen size={18} />
            <span>Search Recipe</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "ingredients" ? (
            <motion.div
              key="ingredients"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl mb-4 shadow-lg shadow-rose-500/30"
                >
                  <Search size={28} className="text-white" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                  What's in your kitchen?
                </h2>
                <p className="text-stone-500">
                  Add ingredients and we'll create something amazing
                </p>
              </div>

              {/* Ingredient Input with Auto-suggestions */}
              <form onSubmit={handleAddIngredient} className="mb-6 relative">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() =>
                      inputValue.trim() &&
                      suggestions.length > 0 &&
                      setShowSuggestions(true)
                    }
                    placeholder="Type an ingredient (e.g., chicken, tomato, pasta...)"
                    className="w-full px-6 py-4 pr-14 bg-stone-50 border-2 border-stone-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 text-stone-900 placeholder-stone-400 transition-all text-base"
                    disabled={isLoading}
                    autoComplete="off"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 disabled:from-stone-300 disabled:to-stone-300 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-rose-500/25 disabled:shadow-none"
                  >
                    <Plus size={20} />
                  </motion.button>
                </div>

                {/* Auto-suggestions Dropdown */}
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      ref={suggestionsRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-2 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-2">
                        <p className="text-xs text-stone-400 px-3 py-1 uppercase tracking-wide">
                          Suggestions
                        </p>
                        {suggestions.map((suggestion, index) => (
                          <motion.button
                            key={suggestion}
                            type="button"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                              index === selectedSuggestionIndex
                                ? "bg-rose-50 text-rose-700"
                                : "hover:bg-stone-50 text-stone-700"
                            }`}
                          >
                            <span className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center text-lg">
                              🥬
                            </span>
                            <span className="font-medium capitalize">
                              {suggestion}
                            </span>
                            {index === selectedSuggestionIndex && (
                              <span className="ml-auto text-xs text-rose-400">
                                Press Enter
                              </span>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Selected Ingredients */}
              <AnimatePresence>
                {ingredients.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Leaf size={14} className="text-green-600" />
                      </div>
                      <span className="text-sm font-semibold text-stone-700">
                        Your Ingredients ({ingredients.length})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map((ingredient, index) => (
                        <motion.div
                          key={ingredient}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          layout
                          className="group bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 px-4 py-2 rounded-full flex items-center gap-2 border border-green-200 hover:border-green-300 transition-colors"
                        >
                          <span className="font-medium text-sm">
                            {ingredient}
                          </span>
                          <button
                            onClick={() => handleRemoveIngredient(index)}
                            className="w-5 h-5 bg-green-200 hover:bg-red-400 hover:text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dietary Preferences */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xs">🍽️</span>
                  </div>
                  <span className="text-sm font-semibold text-stone-700">
                    Dietary Preferences
                  </span>
                  <span className="text-xs text-stone-400">(optional)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_OPTIONS.map((dietary) => (
                    <motion.button
                      key={dietary.name}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleDietaryToggle(dietary.name)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                        selectedDietary.includes(dietary.name)
                          ? "bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-lg shadow-rose-500/25"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                      }`}
                    >
                      <span>{dietary.icon}</span>
                      {dietary.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Cuisine Preference */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <Globe size={14} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-stone-700">
                    Cuisine Style
                  </span>
                  <span className="text-xs text-stone-400">(optional)</span>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {CUISINE_OPTIONS.map((cuisine) => (
                    <motion.button
                      key={cuisine.name}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setSelectedCuisine(
                          selectedCuisine === cuisine.name ? "" : cuisine.name
                        )
                      }
                      className={`p-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-1 ${
                        selectedCuisine === cuisine.name
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                      }`}
                    >
                      <span className="text-xl">{cuisine.flag}</span>
                      <span className="text-xs">{cuisine.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Number of Recipes */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-xs">📋</span>
                  </div>
                  <span className="text-sm font-semibold text-stone-700">
                    Number of Recipes
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((count) => (
                    <motion.button
                      key={count}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRecipeCount(count)}
                      className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${
                        recipeCount === count
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                      }`}
                    >
                      {count}
                    </motion.button>
                  ))}
                </div>
                <p className="text-xs text-stone-400 mt-2">
                  Generate up to 5 unique recipe variations
                </p>
              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                disabled={ingredients.length === 0 || isLoading}
                className="w-full bg-gradient-to-r from-rose-600 via-rose-500 to-orange-500 hover:from-rose-700 hover:via-rose-600 hover:to-orange-600 disabled:from-stone-300 disabled:via-stone-300 disabled:to-stone-300 text-white font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-rose-500/30 disabled:shadow-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>
                      Creating{" "}
                      {recipeCount === 1
                        ? "your recipe"
                        : `${recipeCount} recipes`}
                      ...
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>
                      Generate{" "}
                      {recipeCount === 1 ? "Recipe" : `${recipeCount} Recipes`}
                    </span>
                  </>
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Recipe Search Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-4 shadow-lg shadow-blue-500/30"
                >
                  <BookOpen size={28} className="text-white" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                  Search for a Recipe
                </h2>
                <p className="text-stone-500">
                  Type what you want to cook and let AI create it for you
                </p>
              </div>

              {/* Recipe Search Input */}
              <form onSubmit={handleRecipeSearch} className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    value={recipeSearchQuery}
                    onChange={(e) => setRecipeSearchQuery(e.target.value)}
                    placeholder="e.g., Butter Chicken, Spaghetti Carbonara, Pad Thai..."
                    className="w-full px-6 py-4 pr-14 bg-stone-50 border-2 border-stone-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-stone-900 placeholder-stone-400 transition-all text-base"
                    disabled={isLoading}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Search size={20} className="text-stone-400" />
                  </div>
                </div>
              </form>

              {/* Quick Recipe Suggestions */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-stone-700 mb-3">
                  Popular Recipes
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Butter Chicken",
                    "Pasta Carbonara",
                    "Pad Thai",
                    "Beef Tacos",
                    "Chicken Tikka Masala",
                    "Caesar Salad",
                    "Ramen",
                    "Pizza Margherita",
                  ].map((recipe) => (
                    <motion.button
                      key={recipe}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRecipeSearchQuery(recipe)}
                      className="px-4 py-2 bg-stone-100 hover:bg-blue-50 hover:text-blue-700 text-stone-600 rounded-xl text-sm font-medium transition-all border border-stone-200 hover:border-blue-200"
                    >
                      {recipe}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRecipeSearch}
                disabled={!recipeSearchQuery.trim() || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-600 disabled:from-stone-300 disabled:via-stone-300 disabled:to-stone-300 text-white font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/30 disabled:shadow-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Generating recipe...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>Generate This Recipe</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
