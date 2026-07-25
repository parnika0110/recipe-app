import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.parse(body);

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: parsed.email },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: parsed.email,
        password: hashedPassword,
        name: parsed.name || "User",
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error instanceof z.ZodError) {
      const issues = error.issues;
      if (issues.some((i) => i.path.includes("email"))) {
        return NextResponse.json(
          { success: false, error: "Invalid email address" },
          { status: 400 }
        );
      }
      if (issues.some((i) => i.path.includes("password"))) {
        return NextResponse.json(
          { success: false, error: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to create account" },
      { status: 500 }
    );
  }
}
