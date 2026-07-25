// src/app/api/recipes/[id]/rate/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const rateRecipeSchema = z.object({
  rating: z.number().int().min(1).max(5),
  userId: z.string().optional(),
});

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = rateRecipeSchema.parse(body);

    // Ensure user exists or create one
    const userEmail = parsed.userId || "guest-" + Date.now();
    const user = await prisma.user.upsert({
      where: { email: userEmail },
      update: {},
      create: {
        email: userEmail,
        name: "Guest User",
      },
    });

    const rating = await prisma.rating.upsert({
      where: {
        userId_recipeId: {
          userId: user.id,
          recipeId: id,
        },
      },
      update: { rating: parsed.rating },
      create: {
        userId: user.id,
        recipeId: id,
        rating: parsed.rating,
      },
    });

    return NextResponse.json({
      success: true,
      data: rating,
    });
  } catch (error) {
    console.error("Rate recipe error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to rate recipe" },
      { status: 500 }
    );
  }
}
