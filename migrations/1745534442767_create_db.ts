import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Create enum type for order status
  await db.schema
    .createType("order_status")
    .asEnum(["PENDING", "PROCESSED", "SHIPPED", "DELIVERED"])
    .execute();

  // Create users table
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("google_id", "varchar(255)", (col) => col.notNull().unique())
    .addColumn("email", "varchar(255)", (col) => col.notNull())
    .addColumn("display_name", "varchar(255)")
    .addColumn("bio", "text")
    .addColumn("created_at", sql`timestamp with time zone`, (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  // Create products table
  await db.schema
    .createTable("products")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("brand", "varchar(255)", (col) => col.notNull())
    .addColumn("price", "integer", (col) => col.notNull()) // Price in cents
    .addColumn("slug", "varchar(255)", (col) => col.notNull().unique())
    .addColumn("category", "varchar(255)", (col) => col.notNull())
    .addColumn("image_url", "text", (col) => col.notNull())
    .addColumn("image_alt", "text")
    .addColumn("description", "text")
    .addColumn("features", sql`text[]`)
    .addColumn("images", sql`text[]`)
    .addColumn("case_diameter", "varchar(255)")
    .addColumn("case_thickness", "varchar(255)")
    .addColumn("case_material", "varchar(255)")
    .addColumn("dial_color", "varchar(255)")
    .addColumn("crystal", "varchar(255)")
    .addColumn("movement", "varchar(255)")
    .addColumn("power_reserve", "varchar(255)")
    .addColumn("water_resistance", "varchar(255)")
    .addColumn("bracelet_or_strap", "varchar(255)")
    .addColumn("clasp", "varchar(255)")
    .addColumn("functions", "text")
    .execute();

  // Create product_reviews table
  await db.schema
    .createTable("product_reviews")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("product_id", "integer", (col) =>
      col.references("products.id").onDelete("cascade").notNull()
    )
    .addColumn("author", "varchar(255)", (col) => col.notNull())
    .addColumn("title", "varchar(255)", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("rating", "integer", (col) => col.notNull())
    .addColumn("created_at", sql`timestamp with time zone`, (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  // Create collections table
  await db.schema
    .createTable("collections")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("img_url", "text")
    .addColumn("img_alt", "text")
    .execute();

  // Create collection_products junction table
  await db.schema
    .createTable("collection_products")
    .addColumn("collection_id", "integer", (col) =>
      col.references("collections.id").onDelete("cascade").notNull()
    )
    .addColumn("product_id", "integer", (col) =>
      col.references("products.id").onDelete("cascade").notNull()
    )
    .addPrimaryKeyConstraint("collection_products_pkey", [
      "collection_id",
      "product_id"
    ])
    .execute();

  // Create related_products junction table
  await db.schema
    .createTable("related_products")
    .addColumn("product_id", "integer", (col) =>
      col.references("products.id").onDelete("cascade").notNull()
    )
    .addColumn("related_product_id", "integer", (col) =>
      col.references("products.id").onDelete("cascade").notNull()
    )
    .addPrimaryKeyConstraint("related_products_pkey", [
      "product_id",
      "related_product_id"
    ])
    .addCheckConstraint(
      "different_products_check",
      sql`product_id <> related_product_id`
    )
    .execute();

  // Create orders table
  await db.schema
    .createTable("orders")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "integer", (col) =>
      col.references("users.id").onDelete("set null")
    )
    .addColumn("total_price_in_cents", "integer", (col) => col.notNull())
    .addColumn("status", sql`order_status`, (col) =>
      col.notNull().defaultTo("PENDING")
    )
    .addColumn("tracking_number", "varchar(255)")
    .addColumn("notes", "text")
    .addColumn("created_at", sql`timestamp with time zone`, (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  // Create order_products junction table
  await db.schema
    .createTable("order_products")
    .addColumn("order_id", "integer", (col) =>
      col.references("orders.id").onDelete("cascade").notNull()
    )
    .addColumn("product_id", "integer", (col) =>
      col.references("products.id").onDelete("cascade").notNull()
    )
    .addColumn("quantity", "integer", (col) => col.notNull().defaultTo(1))
    .addColumn("price_at_purchase_in_cents", "integer", (col) => col.notNull())
    .addPrimaryKeyConstraint("order_products_pkey", ["order_id", "product_id"])
    .execute();

  // Create blog_authors table
  await db.schema
    .createTable("blog_authors")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("bio", "text")
    .addColumn("image", "text")
    .execute();

  // Create blog_posts table
  await db.schema
    .createTable("blog_posts")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "varchar(255)", (col) => col.notNull())
    .addColumn("slug", "varchar(255)", (col) => col.notNull().unique())
    .addColumn("excerpt", "text")
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("image_alt", "text")
    .addColumn("image_url", "text")
    .addColumn("author_id", "integer", (col) =>
      col.references("blog_authors.id").onDelete("set null")
    )
    .addColumn("category", "varchar(255)")
    .addColumn("read_time", "varchar(50)")
    .addColumn("published_at", sql`timestamp with time zone`, (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  // Create related_blog_posts junction table
  await db.schema
    .createTable("related_blog_posts")
    .addColumn("blog_post_id", "integer", (col) =>
      col.references("blog_posts.id").onDelete("cascade").notNull()
    )
    .addColumn("related_post_id", "integer", (col) =>
      col.references("blog_posts.id").onDelete("cascade").notNull()
    )
    .addPrimaryKeyConstraint("related_blog_posts_pkey", [
      "blog_post_id",
      "related_post_id"
    ])
    .addCheckConstraint(
      "different_posts_check",
      sql`blog_post_id <> related_post_id`
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // Drop tables in reverse order to avoid foreign key constraints
  await db.schema.dropTable("related_blog_posts").execute();
  await db.schema.dropTable("blog_posts").execute();
  await db.schema.dropTable("blog_authors").execute();
  await db.schema.dropTable("order_products").execute();
  await db.schema.dropTable("orders").execute();
  await db.schema.dropTable("related_products").execute();
  await db.schema.dropTable("collection_products").execute();
  await db.schema.dropTable("collections").execute();
  await db.schema.dropTable("product_reviews").execute();
  await db.schema.dropTable("products").execute();
  await db.schema.dropTable("users").execute();

  // Drop enum type
  await db.schema.dropType("order_status").execute();
}
