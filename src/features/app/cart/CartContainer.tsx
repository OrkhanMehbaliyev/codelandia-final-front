import { Drawer, Flex, message, Row, Space } from "antd";
import CartItem from "./CartItem";
import Title from "antd/es/typography/Title";
import CustomButton from "../../../ui/CustomButton";
import { useAddOrderMutation, useClearCartMutation } from "../../api/apiSlice";
import { CartItemsType } from "../../../types/cart";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { StylesType } from "../../../types/style";

type CartContainerProps = {
  isCartOpen: boolean;
  onSetCartOpen: () => void;
  cart: CartItemsType | [];
  cart_id: string | undefined;
  totalPrice: string;
};

function CartContainer({
  isCartOpen,
  onSetCartOpen,
  cart = [],
  cart_id,
  totalPrice,
}: CartContainerProps) {
  const [clearCart] = useClearCartMutation();
  const [addOrder] = useAddOrderMutation();
  const { user_id } = useSelector((state: RootState) => state.user);

  const handleClearCart = async () => {
    try {
      await clearCart(cart_id);
      message.success("Cart cleared.");
    } catch (err: any) {
      message.error(err.data);
    }
  };
  const handleAddOrder = async () => {
    try {
      await addOrder({ user_id, cart_id }).unwrap();
      message.success("Order successfully added.");
    } catch (err: any) {
      message.error(err.data);
    }
  };
  const antDrawerStyle = {
    body: { padding: "0px" },
  };
  const styles: StylesType = {
    drawer: { background: "var(--color-background)" },
    container: { height: "100%" },
    box: { padding: "10px", overflowY: "scroll" },
    row: {
      background: "",
      width: "100%",
      height: "20%",
      padding: "10px",
    },
    clearButton: { height: "50px" },
    orderButton: { height: "50px", width: "150px" },
  };
  return (
    <Drawer
      styles={antDrawerStyle}
      style={styles.drawer}
      onClose={onSetCartOpen}
      title="cart"
      open={isCartOpen}
    >
      <Flex vertical gap={10} style={styles.container} justify="space-between">
        <Flex vertical gap={10} style={styles.box}>
          {cart.length !== 0
            ? cart.map((el) => <CartItem item={el} />)
            : "No item"}
        </Flex>
        <Row style={styles.row}>
          <Title level={2}>Total Price: {totalPrice}$</Title>
          <Space>
            <CustomButton
              onClick={handleClearCart}
              type="secondary"
              style={styles.clearButton}
            >
              Clear cart
            </CustomButton>
            <CustomButton
              onClick={handleAddOrder}
              type="primary"
              style={styles.orderButton}
            >
              Order
            </CustomButton>
          </Space>
        </Row>
      </Flex>
    </Drawer>
  );
}

export default CartContainer;
