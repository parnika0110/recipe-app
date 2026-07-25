// src/components/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, LogOut, User, ChefHat, Sparkles } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-stone-200/50 border-b border-stone-200/50"
          : "bg-white/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="relative w-14 h-14 md:w-16 md:h-16"
          >
            <Image
              src="/logo.png"
              alt="KhanaKreation Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-stone-900 tracking-tight group-hover:text-rose-600 transition-colors">
              KhanaKreation
            </span>
            <span className="text-[10px] text-stone-500 font-medium tracking-wider uppercase hidden sm:block">
              Your Culinary Canvas
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all font-medium text-sm"
          >
            Home
          </Link>
          <Link
            href="/saved"
            className="flex items-center gap-2 px-4 py-2 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all font-medium text-sm group"
          >
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Heart size={18} className="group-hover:fill-rose-100" />
            </motion.div>
            <span className="hidden sm:inline">Saved</span>
          </Link>

          {/* Auth Section */}
          {session ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-stone-100 to-stone-50 hover:from-stone-200 hover:to-stone-100 transition-all border border-stone-200"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {session.user?.name?.charAt(0) ||
                      session.user?.email?.charAt(0) ||
                      "U"}
                  </span>
                </div>
                <span className="text-sm font-medium text-stone-700 hidden md:inline max-w-[120px] truncate">
                  {session.user?.name || session.user?.email?.split("@")[0]}
                </span>
              </motion.button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-200 overflow-hidden z-50"
                  >
                    <div className="p-4 bg-gradient-to-br from-rose-50 to-orange-50 border-b border-stone-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                          <span className="text-white font-bold">
                            {session.user?.name?.charAt(0) || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-stone-900 text-sm">
                            {session.user?.name}
                          </p>
                          <p className="text-xs text-stone-500 truncate max-w-[140px]">
                            {session.user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          signOut();
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-3 font-medium text-sm transition-colors"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/signin"
                className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors hidden sm:block"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 rounded-full transition-all shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
