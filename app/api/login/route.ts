import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/app/models/User"; // make sure this has `id` + `passwordHash` fields

export async function POST(req: NextRequest) {
  try {
    const ADMIN_ID = 1;

    await connectDB();

    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { message: "Missing password" },
        { status: 400 }
      );
    }

    // 👇 Use the numeric `id` field from your seed, NOT _id
    const user = await User.findOne({ id: ADMIN_ID });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🔐 Create JWT
    const token = jwt.sign(
      { id: user.id, role: "ADMIN" }, // or user._id if you prefer
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // ✅ Set HttpOnly cookie
    const response = NextResponse.json({ message: "Login successful" });

    response.headers.set(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      })
    );

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}