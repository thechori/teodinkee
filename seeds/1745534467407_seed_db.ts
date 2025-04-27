import { Kysely, sql } from "kysely";
import { DB } from "kysely-codegen";

export async function seed(db: Kysely<DB>) {
  // Clean up in case of rerun (for dev/testing purposes)
  await db.deleteFrom("related_blog_posts").execute();
  await db.deleteFrom("blog_posts").execute();
  await db.deleteFrom("blog_authors").execute();
  await db.deleteFrom("order_products").execute();
  await db.deleteFrom("orders").execute();
  await db.deleteFrom("related_products").execute();
  await db.deleteFrom("collection_products").execute();
  await db.deleteFrom("collections").execute();
  await db.deleteFrom("product_reviews").execute();
  await db.deleteFrom("product_review_breakdown").execute();
  await db.deleteFrom("product_review_summary").execute();
  await db.deleteFrom("product_specifications").execute();
  await db.deleteFrom("product_details").execute();
  await db.deleteFrom("products").execute();
  await db.deleteFrom("users").execute();

  const [user] = await db
    .insertInto("users")
    .values({
      google_id: "google-oauth2|1234567890",
      email: "user@example.com",
      display_name: "John Doe",
      bio: "Watch enthusiast and blogger."
    })
    .returningAll()
    .execute();

  const [product] = await db
    .insertInto("products")
    .values({
      name: "Submariner",
      brand: "Rolex",
      price: 1299999,
      slug: "rolex-submariner",
      category: "Dive Watches",
      image_url: "https://example.com/submariner.jpg",
      image_alt: "Rolex Submariner",
      description: "Iconic diver's watch by Rolex."
    })
    .returningAll()
    .execute();

  const [secondProduct] = await db
    .insertInto("products")
    .values({
      name: "Seamaster",
      brand: "Omega",
      price: 899999,
      slug: "omega-seamaster",
      category: "Dive Watches",
      image_url: "https://example.com/seamaster.jpg",
      image_alt: "Omega Seamaster",
      description: "Renowned diving watch by Omega."
    })
    .returningAll()
    .execute();

  await db
    .insertInto("product_details")
    .values({
      product_id: product.id,
      features: sql`ARRAY['Water Resistant', 'Ceramic Bezel']`,
      images: sql`ARRAY['https://example.com/submariner1.jpg', 'https://example.com/submariner2.jpg']`
    })
    .execute();

  await db
    .insertInto("product_specifications")
    .values({
      product_id: product.id,
      case_diameter: "40mm",
      case_thickness: "12.5mm",
      case_material: "Stainless Steel",
      dial_color: "Black",
      crystal: "Sapphire",
      movement: "Automatic",
      power_reserve: "48 hours",
      water_resistance: "300m",
      bracelet_or_strap: "Oystersteel Bracelet",
      clasp: "Folding",
      functions: "Date, Rotating Bezel"
    })
    .execute();

  const [summary] = await db
    .insertInto("product_review_summary")
    .values({
      product_id: product.id,
      average: 4.8,
      count: 10
    })
    .returningAll()
    .execute();

  await db
    .insertInto("product_review_breakdown")
    .values([
      { summary_id: summary.id, rating: 5, percentage: 80.0 },
      { summary_id: summary.id, rating: 4, percentage: 20.0 }
    ])
    .execute();

  await db
    .insertInto("product_reviews")
    .values({
      product_id: product.id,
      author: "Jane Smith",
      title: "Fantastic Watch!",
      description: "Love everything about this timepiece.",
      rating: 5
    })
    .execute();

  const [collection] = await db
    .insertInto("collections")
    .values({
      name: "Luxury Dive Watches",
      description: "Best dive watches in the market",
      img_url: "https://example.com/collection.jpg",
      img_alt: "Dive Watch Collection"
    })
    .returningAll()
    .execute();

  await db
    .insertInto("collection_products")
    .values({
      collection_id: collection.id,
      product_id: product.id
    })
    .execute();

  const [order] = await db
    .insertInto("orders")
    .values({
      user_id: user.id,
      total_price_in_cents: 1299999,
      status: "PROCESSED",
      tracking_number: "TRACK12345",
      notes: "Please handle with care."
    })
    .returningAll()
    .execute();

  await db
    .insertInto("order_products")
    .values({
      order_id: order.id,
      product_id: product.id,
      quantity: 1,
      price_at_purchase_in_cents: 1299999
    })
    .execute();

  const [author] = await db
    .insertInto("blog_authors")
    .values({
      name: "Watch Guru",
      bio: "Longtime collector and writer.",
      image: "https://example.com/author.jpg"
    })
    .returningAll()
    .execute();

  const [blogPost] = await db
    .insertInto("blog_posts")
    .values({
      title: "Top Dive Watches of 2025",
      slug: "top-dive-watches-2025",
      excerpt: "We reviewed the best dive watches...",
      content: "Here’s our deep dive into dive watches...",
      image_alt: "Dive Watch",
      image_url: "https://example.com/blog.jpg",
      author_id: author.id,
      category: "Reviews",
      read_time: "5 min"
    })
    .returningAll()
    .execute();

  const [secondBlogPost] = await db
    .insertInto("blog_posts")
    .values({
      title: "Best Watches Under $1000",
      slug: "best-watches-under-1000",
      excerpt: "Affordable yet stylish timepieces.",
      content: "A roundup of the best budget watches...",
      image_alt: "Affordable Watch",
      image_url: "https://example.com/blog2.jpg",
      author_id: author.id,
      category: "Buying Guides",
      read_time: "4 min"
    })
    .returningAll()
    .execute();

  await db
    .insertInto("related_blog_posts")
    .values({
      blog_post_id: blogPost.id,
      related_post_id: secondBlogPost.id
    })
    .execute();

  await db
    .insertInto("related_products")
    .values({
      product_id: product.id,
      related_product_id: secondProduct.id
    })
    .execute();

  console.log("✅ Seed data inserted successfully.");
}
