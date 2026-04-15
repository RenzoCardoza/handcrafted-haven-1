import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { sql } from "@/app/lib/db";
import { authOptions } from "@/app/lib/auth";

const becomeSellerSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100, "Name is too long"),
  bio: z.string().min(5, "Bio is too short").max(2000, "Bio is too long"),
  location: z.string().min(2, "Location is too short").max(150, "Location is too long"),
  image_url: z.string().url("Please upload a valid image"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const parsed = becomeSellerSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid form data";

      return NextResponse.json(
        { error: firstError },
        { status: 400 }
      );
    }

    const { name, bio, location, image_url } = parsed.data;

    const userRows = await sql`
      SELECT id, role
      FROM users
      WHERE email = ${session.user.email}
      LIMIT 1
    `;

    const user = userRows[0];

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    await sql`
      UPDATE users
      SET
        name = ${name},
        role = 'seller'
      WHERE email = ${session.user.email}
    `;

    const artisanRows = await sql`
      SELECT id
      FROM artisans
      WHERE email = ${session.user.email}
      LIMIT 1
    `;

    if (artisanRows.length > 0) {
      await sql`
        UPDATE artisans
        SET
          name = ${name},
          bio = ${bio},
          location = ${location},
          image_url = ${image_url}
        WHERE email = ${session.user.email}
      `;
    } else {
      await sql`
        INSERT INTO artisans (name, email, bio, location, image_url)
        VALUES (
          ${name},
          ${session.user.email},
          ${bio},
          ${location},
          ${image_url}
        )
      `;
    }

    return NextResponse.json({
      success: true,
      message: "Seller profile created successfully.",
    });
  } catch (error) {
    console.error("Become seller error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}