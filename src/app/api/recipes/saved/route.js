// src/app/api/recipes/saved/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request) {
  try {
    const userEmail = request.nextUrl.searchParams.get("userId");

    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    // Find user by email (we store userId as email in localStorage)
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      // Return empty list if user doesn't exist yet
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const savedRecipes = await prisma.savedRecipe.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: savedRecipes,
    });
  } catch (error) {
    console.error("Get saved recipes error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch saved recipes" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id, userId } = body;

    if (!id || !userId) {
      return NextResponse.json(
        { success: false, error: "id and userId required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Delete saved recipe
    await prisma.savedRecipe.deleteMany({
      where: {
        id,
        userId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete saved recipe error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete saved recipe" },
      { status: 500 }
    );
  }
}
