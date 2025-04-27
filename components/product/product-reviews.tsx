"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

type ReviewBreakdown = {
  rating: number;
  percentage: string;
};

type ReviewItem = {
  id: number;
  title: string;
  description: string | null;
  rating: number;
  author: string;
  created_at: string;
};

type ReviewSummary = {
  items: ReviewItem[];
  average: string;
  count: number;
  breakdown: ReviewBreakdown[];
};

export default function ProductReviews({
  productId,
  reviewSummary
}: {
  productId: number;
  reviewSummary: ReviewSummary;
}) {
  const [reviews, setReviews] = useState<ReviewItem[]>(
    reviewSummary.items || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreReviews = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await fetch(
        `/api/products/${productId}/reviews?limit=5&page=${nextPage}`
      );
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();

      if (data.reviews && data.reviews.length > 0) {
        setReviews([...reviews, ...data.reviews]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold mb-8">Customer Reviews</h2>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Review Summary */}
        <div className="md:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-center mb-6">
              <p className="text-5xl font-bold mb-2">
                {Number(reviewSummary.average).toFixed(1)}
              </p>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(Number(reviewSummary.average))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-500">
                Based on {reviewSummary.count} reviews
              </p>
            </div>

            <div className="space-y-2">
              {reviewSummary.breakdown.map((item) => (
                <div key={item.rating} className="flex items-center gap-2">
                  <div className="flex items-center w-16">
                    <span className="text-sm">{item.rating} star</span>
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${Number(item.percentage)}%` }}
                    ></div>
                  </div>
                  <div className="w-10 text-right text-sm text-gray-500">
                    {Number(item.percentage).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review List */}
        <div className="md:w-2/3">
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{review.title}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {review.author} -{" "}
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                  {review.description && (
                    <p className="text-gray-700">{review.description}</p>
                  )}
                </div>
              ))}

              {reviewSummary.count > reviews.length && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={loadMoreReviews}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More Reviews"}
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-6">
                No reviews yet. Be the first to review this product!
              </p>
              <Button>Write a Review</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
