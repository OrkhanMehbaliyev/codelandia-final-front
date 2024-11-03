import { Flex, Image, message, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import CustomButton from "../../../ui/CustomButton";
import { useState } from "react";
import { WishlistItemType } from "../../../types/wishlist";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  useAddItemToCartMutation,
  useRemoveItemFromWishlistMutation,
} from "../../api/apiSlice";
type ItemProps = {
  item: WishlistItemType;
};
const styles = { title: { margin: 0 } };
function WishlistItem({ item }: ItemProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [removeItemFromWishlist] = useRemoveItemFromWishlistMutation();
  const [addItemToCart] = useAddItemToCartMutation();
  const { product_id } = item;
  const user = useSelector((state: RootState) => state.user);
  const handleAddItemToCart = async () => {
    try {
      await addItemToCart({
        product_id,
        user_id: user.user_id,
        quantity: 1,
      }).unwrap();
      message.success("Item added successfully to the cart.");
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
      message.error(err.data);
    }
  };
  const handleHover = () => {
    setIsHovered(!isHovered);
  };
  return (
    <Row
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      style={
        !isHovered
          ? {
              background: "",
              height: "130px",
              borderRadius: "10px",
              alignItems: "center",
              transition: "ease-in-out 300ms",
            }
          : {
              background: "#792800",
              height: "130px",
              borderRadius: "10px",
              alignItems: "center",
            }
      }
      justify={"space-between"}
    >
      <Space size={"large"}>
        <Image
          style={{ height: "130px", borderRadius: "3px" }}
          src={item.product_image}
        ></Image>
        <Flex vertical gap={5}>
          <Title style={styles.title} level={3}>
            {item.product_name}
          </Title>
          <Title style={styles.title} level={2}>
            ${item.product_price}.00
          </Title>
        </Flex>
      </Space>
      <Flex vertical align="center">
        <Title
          level={2}
          style={{ ...styles.title, color: "#ffffff10", fontWeight: "600" }}
        >
          {item.category_name}
        </Title>
      </Flex>
      <Space style={{ margin: "10px" }}>
        <CustomButton
          onClick={handleAddItemToCart}
          style={{ height: "40px", width: "120px" }}
          type="primary"
        >
          Add to cart
        </CustomButton>
        <CustomButton
          style={{ height: "40px", width: "70px" }}
          type="secondary"
          onClick={handleRemoveFromWishList}
        >
          Delete
        </CustomButton>
      </Space>
    </Row>
  );
}

export default WishlistItem;
