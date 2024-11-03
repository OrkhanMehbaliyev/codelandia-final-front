import { Card, Flex, Image, message, Rate, Space } from "antd";
import Title from "antd/es/typography/Title";
import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { HeartOutlined } from "@ant-design/icons";
import { Product } from "../types/product";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useAddItemToWishlistMutation,
  useRemoveItemFromWishlistMutation,
} from "../features/api/apiSlice";
type WrappedCardProps = Partial<Product> & { isFavorite?: boolean };
const buttonStyle: CSSProperties = {
  position: "absolute",
  zIndex: "1000",
  width: "40px",
  height: "40px",
  right: "0px",
  top: "140px",
  marginRight: "10px",
  border: "0px",
  outline: "0px",
  borderRadius: "15px",
};
function WrappedCard({
  product_id,
  image,
  name,
  price,
  isFavorite,
  rating,
}: WrappedCardProps) {
  const user = useSelector((state: RootState) => state.user);
  const [addItemToWishlist] = useAddItemToWishlistMutation();
  const [removeItemFromWishlist] = useRemoveItemFromWishlistMutation();
  const [isHovered, setIsHovered] = useState(false);
  function handleHover() {
    setIsHovered(!isHovered);
  }
  const handleAddToWishList = async (e: any) => {
    e.stopPropagation();
    try {
      await addItemToWishlist({
        product_id: product_id,
        user_id: user.user_id,
      }).unwrap();
      message.success("Item added to wishlist successfully.");
    } catch (err: any) {
      message.error(err.data.message);
    }
  };
  const handleRemoveFromWishList = async (e: any) => {
    e.stopPropagation();
    try {
      await removeItemFromWishlist({
        product_id: product_id,
        user_id: user.user_id,
      }).unwrap();
      message.success("Item removed from wishlist successfully.");
    } catch (err: any) {
      message.error(err.data.message);
    }
  };
  const handleClick = isFavorite
    ? handleRemoveFromWishList
    : handleAddToWishList;
  const navigate = useNavigate();
  return (
    <Card
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      hoverable={true}
      bordered={false}
      onClick={(e) => {
        e.stopPropagation();
        return navigate(`/products/${product_id}`);
      }}
      cover={
        <>
          {isHovered && user.user_id ? (
            <>
              <CustomButton
                onClick={handleClick}
                type="primary"
                style={
                  isFavorite
                    ? {
                        ...buttonStyle,
                        background: "white",
                        color: "var(--color-primary)",
                      }
                    : { ...buttonStyle }
                }
              >
                <HeartOutlined />
              </CustomButton>
            </>
          ) : null}

          <Image
            style={{
              borderRadius: "20px",
              maxHeight: "400px",
              objectFit: "cover",
            }}
            src={image}
          />
        </>
      }
      style={{ width: "350px", borderRadius: "20px" }}
      styles={{
        cover: { borderRadius: "20px" },
      }}
    >
      <Space size={"small"} direction="vertical" style={{ width: "100%" }}>
        <Title
          level={2}
          style={
            !isHovered
              ? { color: "#ffffffb8", transition: "300ms ease-in" }
              : { color: "var(--color-primary)", transition: "300ms ease-in" }
          }
        >
          {name}
        </Title>
        <Flex align="center" justify="self-between" style={{ width: "100%" }}>
          <Title style={{ margin: "0px" }}>${price}.00</Title>
          <Rate
            value={rating}
            disabled
            style={{ fontSize: "20px", marginLeft: "30px" }}
          />
        </Flex>
      </Space>
    </Card>
  );
}

export default WrappedCard;
