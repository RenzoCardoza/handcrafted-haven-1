import postgres from "postgres";
import { reviews, products, users, artisans } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers(sql: any) {
    await sql `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql `
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role VARCHAR(255) NOT NULL
        );
    `;

    const insertedUsers = (await Promise.all(
        users.map((user) => sql `
            INSERT INTO users (
                name,
                email,
                password,
                role
            )
            VALUES (
                ${user.name},
                ${user.email},
                ${user.password},
                ${user.role}
            )
            ON CONFLICT (email) DO NOTHING
            RETURNING id
        `)
    )).map(res => res[0]);

    return insertedUsers;
}

async function seedArtisans(sql: any) {
    await sql `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql `
        CREATE TABLE IF NOT EXISTS artisans (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            bio VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            image_url VARCHAR(255) NOT NULL
        );
    `;

    const insertedArtisans = (await Promise.all(
        artisans.map(
            (artisan) => sql `
                INSERT INTO artisans (name, location, bio, email, image_url)
                VALUES (${artisan.name}, ${artisan.location}, ${artisan.bio}, ${artisan.email}, ${artisan.image_url})
                ON CONFLICT (email) DO NOTHING
                RETURNING id  
            `
        ),
    )).map(res => res[0]);

    return insertedArtisans;
}

async function seedProducts(sql: any, artisanResults: any[]) {
    await sql `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
        CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        material VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        artisan_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (artisan_id) REFERENCES artisans(id) ON DELETE CASCADE
        );
    `;

    const insertedProducts = (await Promise.all(
        products.map((product) => sql `
            INSERT INTO products (
                name, 
                material,
                price,
                description,
                image_url,
                artisan_id
            )
            VALUES (
                ${product.name},
                ${product.material},
                ${product.price},
                ${product.description},
                ${product.image_url},
                ${artisanResults[product.artisanIndex].id}
            )
            RETURNING id
        `)
    )).map(res => res[0]);

    console.log("artisanResults:", artisanResults);
    return insertedProducts;
}

async function seedReviews(sql: any, userResults: any[], productResults: any[]) {
    await sql `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
        CREATE TABLE IF NOT EXISTS reviews (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            rating INT NOT NULL,
            comment TEXT NOT NULL,
            user_id UUID NOT NULL,
            product_id UUID NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            UNIQUE (user_id, product_id)
        );
    `;
    
    const insertedReviews = (await Promise.all(
        reviews.map((review) => sql`
            INSERT INTO reviews (
                rating,
                comment,
                user_id,
                product_id
            )
            VALUES (
                ${review.rating},
                ${review.comment},
                ${userResults[review.userIndex].id},
                ${productResults[review.productIndex].id}
            )
            ON CONFLICT (user_id, product_id) DO NOTHING
            RETURNING id
        `)
    )).map(res => res[0]);

    return insertedReviews;
}

export async function GET() {
    try {
        await sql.begin(async (tx) => {
            console.log('seeding users');
            const userResults = await seedUsers(tx);
            console.log('seeing artisans');
            const artisanResults = await seedArtisans(tx);
            console.log('seeding products');
            const productResults = await seedProducts(tx, artisanResults);
            console.log('seeding reviews');
            await seedReviews(tx, userResults, productResults);
        });

        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}