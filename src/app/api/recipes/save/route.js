// src/app/api/recipes/save/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const saveRecipeSchema = z.object({
  title: z.string(),
  recipe: z.string(), // JSON stringified recipe
  userId: z.string().optional(),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = saveRecipeSchema.parse(body);

    // For now, we'll use localStorage ID or generate a session-based ID
    const userEmail = parsed.userId || "guest-" + Date.now();

    // Create or get user
    const user = await prisma.user.upsert({
      where: { email: userEmail },
      update: {},
      create: {
        email: userEmail,
        name: "Guest User",
      },
    });

    // Check if recipe already exists
    const existing = await prisma.savedRecipe.findUnique({
      where: {
        userId_title: {
          userId: user.id,
          title: parsed.title,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Recipe already saved" },
        { status: 400 }
      );
    }

    const savedRecipe = await prisma.savedRecipe.create({
      data: {
        userId: user.id,
        title: parsed.title,
        recipe: parsed.recipe,
      },
    });

    return NextResponse.json({
      success: true,
      data: savedRecipe,
    });
  } catch (error) {
    console.error("Save recipe error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save recipe",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
