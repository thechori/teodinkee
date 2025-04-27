import Link from "next/link";
import Image from "next/image";

async function getRelatedProducts(productId: number) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || ""
      }/api/products/${productId}/related`,
      {
        cache: "no-store"
      }
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default async function RelatedProducts({
  productId
}: {
  productId: number;
}) {
  const relatedProducts = await getRelatedProducts(productId);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold mb-8">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedProducts.map((product: any) => (
          <Link
            href={`/products/${product.slug}`}
            key={product.id}
            className="group"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
              <Image
                src={product.img_url || "/placeholder.svg"}
                alt={product.img_alt || product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium group-hover:text-gray-700">
                {product.name}
              </h3>
              <p className="font-medium">${product.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
