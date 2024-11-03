import { useEffect, useRef, useState } from "react";
import { useLazyGetReviewsByProductQuery } from "../features/api/apiSlice";
import { Review } from "../types/review";

export const useReviewLazyLoading = (product_id: string) => {
  const observerRef = useRef(null);
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [trigger, { isLoading }] = useLazyGetReviewsByProductQuery();
  const [isDataFinished, setIsDataFinished] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading && !isDataFinished) {
        trigger({ product_id, page }).then((res) => {
          const newReviews = res?.data?.data || [];
          const totalReviewsCount = res?.data?.count || 0;

          if (newReviews.length > 0) {
            const refinedReviews = newReviews.filter((el) => {
              return !reviews.some(
                (item: Review) => item.created_at === el.created_at
              );
            });
            setReviews(() => [...reviews, ...refinedReviews]);

            if (reviews.length + newReviews.length < totalReviewsCount) {
              setPage((prevPage) => prevPage + 1);
            } else {
              setIsDataFinished(true);
            }
          } else {
            setIsDataFinished(true);
          }
        });
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [isLoading, isDataFinished, product_id, page, reviews, trigger]);
  return { observerRef, reviews, isLoading };
};
