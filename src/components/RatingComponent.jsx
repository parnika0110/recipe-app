// src/components/RatingComponent.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

export default function RatingComponent({ recipeId, onRate }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleRate = async (value) => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId") || "guest-" + Date.now();

      const response = await fetch(`/api/recipes/${recipeId}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: value,
          userId,
        }),
      });

      if (response.ok) {
        setRating(value);
        onRate?.(value);
      }
    } catch (error) {
      console.error("Error rating recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
          <Sparkles size={20} className="text-amber-600" />
        </div>
        <div>
          <h4 className="font-semibold text-stone-900">Rate this recipe</h4>
          <p className="text-sm text-stone-500">Share your experience</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{
                scale: 1.2,
                rotate: star <= (hoverRating || rating) ? 15 : 0,
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              disabled={isLoading}
              className="transition-all p-1"
            >
              <Star
                size={28}
                className={`transition-all ${
                  star <= (hoverRating || rating)
                    ? "fill-amber-400 text-amber-400 drop-shadow-md"
                    : "text-stone-300 hover:text-amber-200"
                }`}
              />
            </motion.button>
          ))}
        </div>
        {rating > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200"
          >
            <span className="font-bold text-amber-700">{rating}</span>
            <span className="text-amber-600 text-sm">/ 5</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
