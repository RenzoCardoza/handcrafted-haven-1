import { NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password, role, bio, location, image_url } =
      await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Name, email, password and account type are required" },
        { status: 400 }
      );
    }

    if (!["buyer", "seller"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid account type" },
        { status: 400 }
      );
    }

    if (role === "seller" && (!bio || !location || !image_url)) {
      return NextResponse.json(
        { error: "Seller accounts need bio, location and profile image" },
        { status: 400 }
      );
    }

    const existingUser = await sql`
      SELECT id
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role})
    `;

    if (role === "seller") {
      await sql`
        INSERT INTO artisans (name, email, bio, location, image_url)
        VALUES (${name}, ${email}, ${bio}, ${location}, ${image_url})
      `;
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}