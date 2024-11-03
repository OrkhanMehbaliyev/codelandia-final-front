import { Flex, Rate } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { CSSProperties } from "react";
type InformationProps = {
  productName: string;
  price: string;
  shortDescription: string;
  rating: number;
  ratingCount: string;
};
const paragraphStyle: CSSProperties = {
  fontSize: "16px",
  margin: "0px",
  padding: "0px",
};
function ProductInformation({
  productName,
  price,
  shortDescription,
  rating,
  ratingCount,
}: InformationProps) {
  return (
    <>
      <Title level={2} style={{ margin: "0px", padding: "0px" }}>
        {productName}
      </Title>
      <Title level={1} style={{ margin: "0px", padding: "0px" }}>
        ${price}
      </Title>
      <Flex align="center">
        <Rate disabled value={rating} /> ({ratingCount})
      </Flex>
      <Paragraph style={{ ...paragraphStyle, fontWeight: "300" }}>
        {shortDescription}
      </Paragraph>
    </>
  );
}

export default ProductInformation;
