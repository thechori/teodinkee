import { Kysely, sql } from "kysely";
import { DB } from "kysely-codegen";

export async function seed(db: Kysely<DB>) {
  // Clean tables
  await db.deleteFrom("related_blog_posts").execute();
  await db.deleteFrom("blog_posts").execute();
  await db.deleteFrom("blog_authors").execute();
  await db.deleteFrom("order_products").execute();
  await db.deleteFrom("orders").execute();
  await db.deleteFrom("related_products").execute();
  await db.deleteFrom("collection_products").execute();
  await db.deleteFrom("collections").execute();
  await db.deleteFrom("product_reviews").execute();
  await db.deleteFrom("products").execute();
  await db.deleteFrom("users").execute();

  // Insert user
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

  // Insert products
  const [product] = await db
    .insertInto("products")
    .values({
      name: "Submariner",
      brand: "Rolex",
      price: 1299900,
      slug: "rolex-submariner",
      category: "Dive Watches",
      img_url:
        "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/diver-rolex-submariner-1G7eTveeomCLnlFqjx9BzCCbKVxgj0.webp",
      img_alt: "Rolex Submariner",
      description: "Iconic diver's watch by Rolex.",
      // @ts-ignore this is an error in kysely-codegen - the DB is proper, the TS type is wrong
      features: sql`ARRAY['Water Resistant', 'Ceramic Bezel']`,
      images: sql`ARRAY['https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/diver-rolex-submariner-1G7eTveeomCLnlFqjx9BzCCbKVxgj0.webp', 'https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/diver-rolex-submariner-2-M2pg1vCuRiSpxUuxZUkkdhCKS8IpHZ.png']`,
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
    .returningAll()
    .execute();

  const [secondProduct] = await db
    .insertInto("products")
    .values({
      name: "Seamaster",
      brand: "Omega",
      price: 575000,
      slug: "omega-seamaster",
      category: "Dive Watches",
      img_url:
        "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/aqua-explorer-omega-seamaster-aqua-terra-GXdlQ3IjUHMMUUKzAERhwaFvpk0ZAj.jpg",
      img_alt: "Omega Seamaster",
      description: "Renowned diving watch by Omega.",
      // @ts-ignore this is an error in kysely-codegen - the DB is proper, the TS type is wrong
      features: sql`ARRAY['Wave Dial', 'Helium Escape Valve']`,
      images: sql`ARRAY['https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/aqua-explorer-omega-seamaster-aqua-terra-GXdlQ3IjUHMMUUKzAERhwaFvpk0ZAj.jpg', 'https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/aqua-explorer-omega-seamaster-aqua-terra-2-rv0ROd8wCzjNvpdYLUvmXBfzvMQngT.png']`,
      case_diameter: "42mm",
      case_thickness: "13.5mm",
      case_material: "Stainless Steel",
      dial_color: "Blue",
      crystal: "Sapphire",
      movement: "Automatic",
      power_reserve: "55 hours",
      water_resistance: "300m",
      bracelet_or_strap: "Stainless Bracelet",
      clasp: "Foldover",
      functions: "Date, Rotating Bezel"
    })
    .returningAll()
    .execute();

  const [thirdProduct] = await db
    .insertInto("products")
    .values({
      name: "Carrera",
      brand: "Tag Heuer",
      price: 660000,
      slug: "tag-heuer-carrera",
      category: "Chronograph Watches",
      img_url:
        "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/chronograph-tag-heuer-carrera-dw3TlG7JabCrnQoKb5h3T6yaBzlQQR.avif",
      img_alt: "Tag Heuer Carrera",
      description: "Renowned racing watch by Tag Heuer.",
      // @ts-ignore this is an error in kysely-codegen - the DB is proper, the TS type is wrong
      features: sql`ARRAY['Chronograph', 'Helium Escape Valve']`,
      images: sql`ARRAY['https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/chronograph-tag-heuer-carrera-dw3TlG7JabCrnQoKb5h3T6yaBzlQQR.avif', 'https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/chronograph-tag-heuer-carrera-2-jpkgtmjSiMPHPPNr6ApK2GSRAFlTLI.png']`,
      case_diameter: "42mm",
      case_thickness: "13.5mm",
      case_material: "Stainless Steel",
      dial_color: "Black",
      crystal: "Sapphire",
      movement: "Automatic",
      power_reserve: "35 hours",
      water_resistance: "100m",
      bracelet_or_strap: "Stainless Bracelet",
      clasp: "Foldover",
      functions: "Date, Chronograph"
    })
    .returningAll()
    .execute();

  const [fourthProduct] = await db
    .insertInto("products")
    .values({
      name: "Big Pilot",
      brand: "IWC",
      price: 1250000,
      slug: "iwc-big-pilot",
      category: "Pilot Watches",
      img_url:
        "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/pilot-chronometer-iwc-big-pilot-Trh3XiQTw0oFbH7wkQTeJ6CJ5j7vP5.avif",
      img_alt: "IWC Big Pilot",
      description: "Preferred watch by pilots in the Air Force.",
      // @ts-ignore this is an error in kysely-codegen - the DB is proper, the TS type is wrong
      features: sql`ARRAY['Utility', 'Helium Escape Valve']`,
      images: sql`ARRAY['https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/pilot-chronometer-iwc-big-pilot-Trh3XiQTw0oFbH7wkQTeJ6CJ5j7vP5.avif', 'https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/pilot-chronometer-iwc-big-pilot-2-ZxrbdO6Lg2zTA7hOEURnc3K35Bpk87.jpg']`,
      case_diameter: "48mm",
      case_thickness: "13.5mm",
      case_material: "Stainless Steel",
      dial_color: "Black",
      crystal: "Sapphire",
      movement: "Automatic",
      power_reserve: "35 hours",
      water_resistance: "100m",
      bracelet_or_strap: "Leather Strap",
      clasp: "Foldover",
      functions: "Visibility, Utility"
    })
    .returningAll()
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

  // Collections
  const [collection] = await db
    .insertInto("collections")
    .values([
      {
        name: "Luxury Watches",
        description: "The most luxurious watches on the market",
        img_url:
          "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/collections-luxury-HAuXsLBljZEPdWpj6C6OPeXpJHSlMo.png",
        img_alt: "Luxury Watch Collection"
      },
      {
        name: "Sport Watches",
        description: "For people that crave to move",
        img_url:
          "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/collections-sport-5AnScCg97uIO5AU5VDAS9risc35pGb.png",
        img_alt: "Sport Watch Collection"
      },
      {
        name: "Classic Watches",
        description: "When versatility you just want to get back to the basics",
        img_url:
          "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/collections-classic-3wEW0tQopnJf9FRSkov9KwKkEBWHjp.png",
        img_alt: "Classic Watch Collection"
      }
      // {
      //   name: "Diving Watches",
      //   description: "Best dive watches in the market",
      //   img_url:
      //     "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/collection-divers-yFFBtE3QdRjst3teACszuf8XafEgKF.png",
      //   img_alt: "Dive Watch Collection"
      // },
    ])
    .returningAll()
    .execute();

  await db
    .insertInto("collection_products")
    .values({
      collection_id: collection.id,
      product_id: product.id
    })
    .execute();

  // Order
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

  // Blog
  const [author] = await db
    .insertInto("blog_authors")
    .values({
      name: "Watch Guru",
      bio: "Longtime collector and writer.",
      img_url: "https://ryanteodoro.com/images/headshot.png",
      img_alt: "picture of auther"
    })
    .returningAll()
    .execute();

  const [blogPost] = await db
    .insertInto("blog_posts")
    .values({
      featured: true,
      title: "Top Dive Watches of 2025",
      slug: "top-dive-watches-2025",
      excerpt: "We reviewed the best dive watches...",
      content: "Here’s our deep dive into dive watches...",
      img_alt: "Dive Watch",
      img_url:
        "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/blog-post-top-dive-watches-ieot2aYD39yUsQLxAfCSBIxFlwvykJ.avif",
      author_id: author.id,
      category: "Reviews",
      read_time: "5 min"
    })
    .returningAll()
    .execute();

  const [secondBlogPost] = await db
    .insertInto("blog_posts")
    .values({
      featured: true,
      title: "Best Watches Under $1000",
      slug: "best-watches-under-1000",
      excerpt: "Affordable yet stylish timepieces.",
      content: "A roundup of the best budget watches...",
      img_alt: "Affordable Watch",
      img_url:
        "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/blog-post-watches-under-1000-RNkFrWsOS3vJxVk4vOy8sso1yGjkYE.webp",
      author_id: author.id,
      category: "Buying Guides",
      read_time: "4 min"
    })
    .returningAll()
    .execute();

  const [thirdBlogPost] = await db
    .insertInto("blog_posts")
    .values({
      title: "Why John Mayer Loves Watches",
      featured: true,
      slug: "why-john-mayer-loves-watches",
      excerpt: "John Mayer makes great music. He also loves watches..",
      content: "Your timeeeepiece is a wonderlandddd...",
      img_alt: "John Mayer and Watch",
      img_url:
        "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/blog-post-john-mayer-watches-ABqZgoMSCc7m39ol4dRCGzD7B2rzXT.webp",
      author_id: author.id,
      category: "Fun Piece",
      read_time: "2 min"
    })
    .returningAll()
    .execute();

  await db
    .insertInto("blog_posts")
    .values([
      {
        title: "The Renaissance of Mechanical Watchmaking in the Digital Age",
        slug: "renaissance-mechanical-watchmaking",
        excerpt:
          "Despite the rise of smartwatches and digital technology, mechanical watches are experiencing a remarkable resurgence. We explore the factors driving this renaissance and why traditional horology continues to captivate enthusiasts worldwide.",
        content:
          "In this article, we take a deep dive into the revival of mechanical watchmaking, its cultural impact, and the enthusiasts fueling its growth.",
        img_alt: "watchmaker working on mechanical watch movement with loupe",
        img_url:
          "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/blog-post-generic-photo-vKvix5ahw8940VazsftkU6pmlFKflQ.jpeg",
        author_id: author.id,
        category: "Trends",
        read_time: "8 min read",
        published_at: new Date("2023-06-05")
      },
      {
        title: "The Art of Mechanical Movements",
        slug: "art-of-mechanical-movements",
        excerpt:
          "Exploring the intricate craftsmanship behind today's finest mechanical watch movements and the centuries of tradition they represent.",
        content:
          "A closer look at the engineering brilliance and artisanal craftsmanship behind mechanical watch movements.",
        img_alt: "close up of watch movement gears",
        img_url:
          "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/blog-post-generic-photo-vKvix5ahw8940VazsftkU6pmlFKflQ.jpeg",
        author_id: author.id,
        category: "Craftsmanship",
        read_time: "6 min read",
        published_at: new Date("2023-05-15")
      },
      {
        title: "Investing in Luxury Watches",
        slug: "investing-in-luxury-watches",
        excerpt:
          "How certain timepieces have become more than accessories, but valuable investment assets that appreciate over time.",
        content:
          "Luxury watches are increasingly viewed as investment vehicles. Here’s what collectors and investors should know.",
        img_alt: "luxury watches displayed in collection case",
        img_url:
          "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/blog-post-generic-photo-vKvix5ahw8940VazsftkU6pmlFKflQ.jpeg",
        author_id: author.id,
        category: "Investment",
        read_time: "5 min read",
        published_at: new Date("2023-04-28")
      },
      {
        title: "The Rise of Independent Watchmakers",
        slug: "rise-of-independent-watchmakers",
        excerpt:
          "Discover the small ateliers creating some of the most innovative designs in horology, challenging the dominance of established brands.",
        content:
          "Independent watchmakers are making waves with unique designs and boundary-pushing innovations.",
        img_alt: "watchmaker working at desk with tools",
        img_url:
          "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/blog-post-generic-photo-vKvix5ahw8940VazsftkU6pmlFKflQ.jpeg",
        author_id: author.id,
        category: "Industry",
        read_time: "7 min read",
        published_at: new Date("2023-04-10")
      },
      {
        title: "Understanding Watch Complications",
        slug: "understanding-watch-complications",
        excerpt:
          "A comprehensive guide to watch complications, from simple date displays to intricate perpetual calendars and minute repeaters.",
        content:
          "Let’s demystify watch complications and explore why they matter to collectors and horology lovers.",
        img_alt: "complicated watch movement showing multiple complications",
        img_url:
          "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/blog-post-generic-photo-vKvix5ahw8940VazsftkU6pmlFKflQ.jpeg",
        author_id: author.id,
        category: "Education",
        read_time: "9 min read",
        published_at: new Date("2023-03-22")
      },
      {
        title: "The History of Dive Watches",
        slug: "history-of-dive-watches",
        excerpt:
          "From military necessity to style statement: tracing the evolution of the dive watch from its utilitarian origins to modern luxury.",
        content:
          "Dive into the history of dive watches, their military origins, and their transformation into fashion icons.",
        img_alt: "vintage and modern dive watches side by side",
        img_url:
          "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/blog-post-generic-photo-vKvix5ahw8940VazsftkU6pmlFKflQ.jpeg",
        author_id: author.id,
        category: "History",
        read_time: "6 min read",
        published_at: new Date("2023-03-05")
      },
      {
        title: "Watch Care and Maintenance",
        slug: "watch-care-maintenance",
        excerpt:
          "Essential tips for keeping your timepiece in perfect condition, from daily care to professional servicing schedules.",
        content:
          "Watches require care and attention. Here's a guide to keeping yours ticking perfectly.",
        img_alt: "watch being serviced by watchmaker",
        img_url:
          "https://rhvc6oqjdslrsx4e.public.blob.vercel-storage.com/images/blog-post-generic-photo-vKvix5ahw8940VazsftkU6pmlFKflQ.jpeg",
        author_id: author.id,
        category: "Guides",
        read_time: "4 min read",
        published_at: new Date("2023-02-18")
      }
    ])
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

  console.log("✅ MVP seed data inserted successfully.");
}
