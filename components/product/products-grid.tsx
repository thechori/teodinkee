import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";

async function getProducts() {
  try {
    const products = await db
      .selectFrom("products")
      .select([
        "id",
        "name",
        "brand",
        "price",
        "image_url",
        "image_alt",
        "slug",
        "category"
      ])
      .limit(12)
      .execute();

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsGrid() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {products.map((product) => (
        <Link
          href={`/products/${product.slug}`}
          key={product.id}
          className="group"
        >
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.image_alt || product.name}
              width={600}
              height={600}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium group-hover:text-gray-700">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
            <p className="font-medium">
              ${(product.price / 100).toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
