// src/components/SaveButton.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Check } from "lucide-react";

export default function SaveButton({ recipeTitle, recipe, onSave }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId") || "guest-" + Date.now();
      if (!localStorage.getItem("userId")) {
        localStorage.setItem("userId", userId);
      }

      const response = await fetch("/api/recipes/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: recipeTitle,
          recipe: JSON.stringify(recipe),
          userId,
        }),
      });

      if (response.ok) {
        setIsSaved(true);
        onSave?.(true);
        setTimeout(() => setIsSaved(false), 2000);
      } else {
        const data = await response.json();
        console.error("Save error:", data?.error || data);
        onSave?.(false);
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      onSave?.(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleSave}
      disabled={isLoading}
      className={`w-full px-6 py-3.5 rounded-xl font-medium flex items-center justify-center gap-3 transition-all shadow-lg ${
        isSaved
          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/25"
          : "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30"
      }`}
    >
      {isSaved ? (
        <>
          <Check size={20} className="animate-pulse" />
          <span>Saved to Collection!</span>
        </>
      ) : isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Heart size={20} />
          <span>Save Recipe</span>
        </>
      )}
    </motion.button>
  );
}
