import LoadingSpinner from "../../../ui/LoadingSpinner";
import { useReviewLazyLoading } from "../../../hooks/useReviewLazyLoading";
import Title from "antd/es/typography/Title";
import ProductReviewItem from "./ProductReviewItem";
import AddReview from "./AddReview";
import { useSelector } from "react-redux";
import { Flex } from "antd";
import { RootState } from "../../../store";
type Props = { product_id: string };
function ProductReviews({ product_id }: Props) {
  const { user_id } = useSelector((state: RootState) => state.user);
  const { observerRef, reviews, isLoading } = useReviewLazyLoading(product_id);
  return (
    <Flex vertical gap={20}>
      <Title
        level={2}
        style={{ textAlign: "center", marginTop: "10px", padding: "0px" }}
      >
        Reviews
      </Title>
      {user_id && <AddReview product_id={product_id} />}

      <Flex vertical gap={10}>
        {reviews.map((el) =>
          isLoading ? (
            <LoadingSpinner />
          ) : (
            <ProductReviewItem
              key={el.users.username}
              rating={el.rating}
              date={el.created_at}
              comment={el.comment}
              username={el.users.username}
            />
          )
        )}
        <div style={{ height: 1 }} ref={observerRef}></div>
      </Flex>
    </Flex>
  );
}

export default ProductReviews;
