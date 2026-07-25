// src/components/RecipeCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, Clock, ChefHat, Utensils } from "lucide-react";
import { useState } from "react";

export default function RecipeCard({
  id,
  title,
  description,
  imageUrl,
  cookTime,
  difficulty,
  cuisine,
  rating,
  onSave,
  href,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  const linkHref = href || `/recipes/${id}`;

  // Check if it's a Pollinations URL (use regular img tag) or other source (use Next Image)
  const isPollinationsUrl = imageUrl?.includes("pollinations.ai");

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-200";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "hard":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-stone-100 text-stone-600 border-stone-200";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white rounded-3xl shadow-lg shadow-stone-200/50 overflow-hidden hover:shadow-2xl hover:shadow-stone-300/50 transition-all duration-300 border border-stone-100"
    >
      <Link href={linkHref}>
        <div className="relative w-full h-56 bg-stone-100 overflow-hidden">
          {isPollinationsUrl || imageError ? (
            <img
              src={imageError ? "/placeholder-food.svg" : imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 backdrop-blur-md ${
              isSaved
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/50"
                : "bg-white/90 text-stone-600 hover:bg-white hover:text-rose-500 shadow-lg"
            }`}
          >
            <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
          </motion.button>

          {/* Cook Time Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
            <Clock size={14} className="text-rose-500" />
            <span className="text-sm font-semibold text-stone-700">
              {cookTime} min
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={linkHref}>
          <h3 className="font-bold text-xl text-stone-900 group-hover:text-rose-600 transition-colors line-clamp-2 mb-3 leading-tight">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-stone-500 mb-5 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100">
            <Utensils size={12} />
            {cuisine}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${getDifficultyColor(
              difficulty
            )}`}
          >
            <ChefHat size={12} />
            {difficulty}
          </span>
        </div>

        {rating !== undefined && (
          <div className="flex items-center gap-2 pt-4 border-t border-stone-100">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-stone-200"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-stone-700">
              {rating.toFixed(1)}
            </span>
            <span className="text-xs text-stone-400">rating</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
