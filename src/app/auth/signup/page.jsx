"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChefHat, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "Email already registered") {
          setError("This email is already registered. Please sign in instead.");
        } else if (data.error === "Invalid email") {
          setError("Please enter a valid email address");
        } else {
          setError(data.error || "Failed to create account. Please try again.");
        }
        return;
      }

      // Redirect to signin on success
      router.push("/auth/signin?success=Account created successfully");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 p-12 items-center justify-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30" />

        <div className="relative text-white text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8"
          >
            <Sparkles size={48} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold mb-4"
          >
            Start Your Journey
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 max-w-md"
          >
            Join thousands of home chefs creating amazing dishes with AI-powered
            recipes.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 space-y-4 text-left"
          >
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span>🎯</span>
              </div>
              <div>
                <p className="font-semibold">Personalized Recipes</p>
                <p className="text-sm text-white/70">
                  Tailored to your ingredients
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span>💾</span>
              </div>
              <div>
                <p className="font-semibold">Save Favorites</p>
                <p className="text-sm text-white/70">
                  Build your recipe collection
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-stone-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-stone-900">
                KhanaKreation
              </span>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-stone-200/50 p-8 md:p-10 border border-stone-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-stone-900 mb-2">
                Create Account
              </h2>
              <p className="text-stone-500">Join KhanaKreation today</p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span>⚠️</span>
                </div>
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 text-stone-900 font-medium placeholder:text-stone-400 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 text-stone-900 font-medium placeholder:text-stone-400 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 text-stone-900 font-medium placeholder:text-stone-400 transition-all"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 text-stone-900 font-medium placeholder:text-stone-400 transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-8 pt-6 border-t border-stone-100">
              <p className="text-stone-600">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-rose-600 hover:text-rose-700 font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
