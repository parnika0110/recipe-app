// src/app/api/recipes/[id]/comments/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createCommentSchema = z.object({
  text: z.string().min(1),
  userId: z.string().optional(),
});

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const comments = await prisma.comment.findMany({
      where: { recipeId: id },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("Get comments error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = createCommentSchema.parse(body);

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

    const comment = await prisma.comment.create({
      data: {
        text: parsed.text,
        userId: user.id,
        recipeId: id,
      },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    return NextResponse.json({
      success: true,
      data: comment,
    });
  } catch (error) {
    console.error("Create comment error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
