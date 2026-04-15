
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { sql } from "@/app/lib/db";
import { authOptions } from "@/app/lib/auth";

const ProductFormSchema = z.object({
  name: z.string().min(2, "Product name is too short."),
  description: z.string().min(5, "Description is too short."),
  price: z.coerce.number().gt(0, "Price must be greater than 0."),
  material: z.string().min(2, "Please enter a category/material."),
  image_url: z.string().url("Please upload a valid image."),
  quantity: z.coerce.number().int().min(0, "Quantity cannot be negative."),
});

const CreateProduct = ProductFormSchema;
const UpdateProduct = ProductFormSchema.omit({ image_url: true });

export type ProductFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    material?: string[];
    image_url?: string[];
    quantity?: string[];
  };
  message?: string | null;
};

export type UpdateProductState = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    material?: string[];
    quantity?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function createProduct(
  prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return {
      message: "You must be signed in to create a product.",
    };
  }

  const validatedFields = CreateProduct.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    material: formData.get("material"),
    image_url: formData.get("image_url"),
    quantity: formData.get("quantity"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create product.",
    };
  }

  const { name, description, price, material, image_url, quantity } =
    validatedFields.data;

  let artisanId: string;
  let newProductId: string;

  try {
    const artisanRows = await sql`
      SELECT id
      FROM artisans
      WHERE email = ${session.user.email}
      LIMIT 1
    `;

    const artisan = artisanRows[0];

    if (!artisan) {
      return {
        message:
          "No artisan account is linked to this email. Please create an artisan profile first.",
      };
    }

    artisanId = String(artisan.id);

    const insertedRows = await sql`
      INSERT INTO products (
        name,
        material,
        price,
        description,
        image_url,
        artisan_id,
        quantity
      )
      VALUES (
        ${name},
        ${material},
        ${price},
        ${description},
        ${image_url},
        ${artisan.id},
        ${quantity}
      )
      RETURNING id
    `;

    newProductId = String(insertedRows[0].id);
  } catch (error) {
    console.error("Database Error: Failed to create product.", error);
    return {
      message: "Database Error: Failed to create product.",
    };
  }

  revalidatePath("/products");
  revalidatePath(`/products/${newProductId}`);
  revalidatePath(`/artisans/${artisanId}`);
  revalidatePath("/artisans/dashboard");

  redirect(`/products/${newProductId}`);
}

export async function updateProduct(
  productId: string,
  prevState: UpdateProductState,
  formData: FormData
): Promise<UpdateProductState> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return {
      message: "You must be signed in to edit a product.",
    };
  }

  const validatedFields = UpdateProduct.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    material: formData.get("material"),
    quantity: formData.get("quantity"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update product.",
      success: false,
    };
  }

  const { name, description, price, material, quantity } =
    validatedFields.data;

  try {
    const artisanRows = await sql`
      SELECT id
      FROM artisans
      WHERE email = ${session.user.email}
      LIMIT 1
    `;

    const artisan = artisanRows[0];

    if (!artisan) {
      return {
        message: "No artisan profile is linked to this account.",
        success: false,
      };
    }

    const productRows = await sql`
      SELECT id, artisan_id
      FROM products
      WHERE id = ${productId}
      LIMIT 1
    `;

    const product = productRows[0];

    if (!product) {
      return {
        message: "Product not found.",
        success: false,
      };
    }

    if (String(product.artisan_id) !== String(artisan.id)) {
      return {
        message: "This product cannot be edited from this account.",
        success: false,
      };
    }

    await sql`
      UPDATE products
      SET
        name = ${name},
        description = ${description},
        price = ${price},
        material = ${material},
        quantity = ${quantity}
      WHERE id = ${productId}
    `;

    revalidatePath("/products");
    revalidatePath(`/products/${productId}`);
    revalidatePath(`/artisans/${artisan.id}`);
    revalidatePath("/artisans/dashboard");

    return {
      message: "Product updated successfully.",
      success: true,
    };
  } catch (error) {
    console.error("Database Error: Failed to update product.", error);
    return {
      message: "Database Error: Failed to update product.",
      success: false,
    };
  }
}

export async function deleteProduct(productId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const artisanRows = await sql`
    SELECT id
    FROM artisans
    WHERE email = ${session.user.email}
    LIMIT 1
  `;

  const artisan = artisanRows[0];

  if (!artisan) {
    return;
  }

  const productRows = await sql`
    SELECT id, artisan_id
    FROM products
    WHERE id = ${productId}
    LIMIT 1
  `;

  const product = productRows[0];

  if (!product) {
    return;
  }

  if (String(product.artisan_id) !== String(artisan.id)) {
    return;
  }

  try {
    await sql`
      DELETE FROM reviews
      WHERE product_id = ${productId}
    `;

    await sql`
      DELETE FROM products
      WHERE id = ${productId}
    `;

    revalidatePath("/products");
    revalidatePath(`/artisans/${artisan.id}`);
    revalidatePath("/artisans/dashboard");
  } catch (error) {
    console.error("Database Error: Failed to delete product.", error);
  }
}