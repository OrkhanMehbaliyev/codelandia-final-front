import { Flex, Rate } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { Review } from "../../../types/review";
type Props = Partial<Review> & { date: string };
function ProductReviewItem({ username, rating, comment, date }: Props) {
  const creationDate = new Date(date);
  const formattedDate = creationDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
  return (
    <Flex
      vertical
      style={{
        background: "#202020",
        minHeight: "100px",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <Flex justify="space-between">
        <Title level={4}>
          {username}{" "}
          <span
            style={{
              marginLeft: "20px",
              fontWeight: "200",
              color: "#ffffff18",
              fontSize: "16px",
            }}
          >
            {formattedDate}
          </span>{" "}
        </Title>
        <Rate disabled value={rating} />
      </Flex>
      <Flex>
        <Paragraph>{comment}</Paragraph>
      </Flex>
    </Flex>
  );
}

export default ProductReviewItem;
