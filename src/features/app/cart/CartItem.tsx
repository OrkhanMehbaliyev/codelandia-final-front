import { InputNumber, message, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import CustomButton from "../../../ui/CustomButton";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  useRemoveItemFromCartMutation,
  useUpdateQuantityOfItemMutation,
} from "../../api/apiSlice";
import { useDebouncing } from "../../../hooks/useDebouncing";
import { CartItemType, CartQueryObjType } from "../../../types/cart";
const styles = {
  marginZero: { margin: "0px", padding: "0px" },
};
type CartItemProps = {
  item: CartItemType;
};
function CartItem({ item }: CartItemProps) {
  const [isTitleHovered, setIsTitleHovered] = useState<boolean>(false);
  const [updateQuantity] = useUpdateQuantityOfItemMutation();
  const [queryObj, setQueryObj] = useState<CartQueryObjType>({
    cart_item_id: item.cart_item_id,
  });
  const { input: itemQuantity, updateQuery } = useDebouncing<CartQueryObjType>(
    1000,
    item.quantity
  );
  const handleItemQuantityChange = (val: string) => {
    updateQuery(val, setQueryObj, "quantity");
  };
  useEffect(() => {
    if (queryObj.quantity !== undefined) {
      const changeItemQuantity = async () => {
        try {
          await updateQuantity(queryObj);
          message.success("Quantity updated successfully");
        } catch (error) {
          message.error("Failed to update quantity");
        }
      };
      changeItemQuantity();
    }
  }, [queryObj, updateQuantity]);
  const [removeCartItem] = useRemoveItemFromCartMutation();
  const handleHover = () => setIsTitleHovered(!isTitleHovered);
  const onChangeWrapper = (value: string | null) => {
    if (value !== null) {
      handleItemQuantityChange(value);
    }
  };
  const handleDelete = async () => {
    try {
      const data = await removeCartItem(item.cart_item_id).unwrap();
      message.success("Item removed");
    } catch (err: any) {
      message.error(err.data);
    }
  };
  return (
    <Row
      style={{ background: "#202020", padding: "15px", borderRadius: "10px" }}
      justify={"space-between"}
    >
      <Link to={`/products/${item.product_id}`} style={{ width: "40%" }}>
        <Title
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          style={{
            ...styles.marginZero,
            color: `${isTitleHovered ? "var(--color-primary)" : "#E0E0E0"}`,
            transition: "ease 200ms",
          }}
          level={4}
        >
          {item.product_name}
        </Title>
      </Link>
      <Space>
        <InputNumber
          value={itemQuantity}
          onChange={onChangeWrapper}
          size="small"
          style={{ width: "60px", padding: "5px" }}
        />

        <Title level={4} style={styles.marginZero}>
          {Number(item.product_price) * Number(item.quantity)}$
        </Title>
      </Space>
      <Space>
        <CustomButton onClick={handleDelete} type="secondary">
          <DeleteOutlined />
        </CustomButton>
      </Space>
    </Row>
  );
}

export default CartItem;
