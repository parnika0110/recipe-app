// src/components/CommentSection.jsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, User } from "lucide-react";

export default function CommentSection({ recipeId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}/comments`);
      const data = await response.json();
      if (data.success) {
        setComments(data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId") || "guest-" + Date.now();

      const response = await fetch(`/api/recipes/${recipeId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: commentText,
          userId,
        }),
      });

      if (response.ok) {
        setCommentText("");
        await fetchComments();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-stone-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
          <MessageCircle size={20} className="text-emerald-600" />
        </div>
        <div>
          <h3 className="font-semibold text-stone-900">Comments</h3>
          <p className="text-sm text-stone-500">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </p>
        </div>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-stone-100 to-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={18} className="text-stone-500" />
          </div>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts on this recipe..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-stone-900 placeholder:text-stone-400 bg-stone-50"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || !commentText.trim()}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-stone-300 disabled:to-stone-300 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-medium shadow-lg shadow-emerald-500/25 disabled:shadow-none transition-all"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={18} />
              )}
              <span className="hidden sm:inline">Post</span>
            </motion.button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {isFetching ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-stone-500">Loading comments...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10 bg-stone-50 rounded-xl border border-dashed border-stone-200">
          <MessageCircle size={32} className="text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500 font-medium">No comments yet</p>
          <p className="text-stone-400 text-sm mt-1">
            Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-3 p-4 bg-gradient-to-r from-stone-50 to-white rounded-xl border border-stone-100 hover:border-emerald-200 transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white font-semibold text-sm">
                  {(comment.user?.name || "A")[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-stone-900">
                    {comment.user?.name || "Anonymous"}
                  </p>
                  <span className="text-stone-300">•</span>
                  <p className="text-xs text-stone-400">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p className="text-stone-600 leading-relaxed">{comment.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
