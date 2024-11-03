import { ShoppingCartOutlined } from "@ant-design/icons";
import CustomButton from "../../../ui/CustomButton";
import CartContainer from "./CartContainer";
import { CSSProperties, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useGetCartByUserIdQuery } from "../../api/apiSlice";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import { CartItemsType } from "../../../types/cart";
const cartButtonStyle: CSSProperties = {
  position: "fixed",
  bottom: "0px",
  right: "0px",

  margin: "30px",
  borderRadius: "100px",
  fontSize: "40px",
  padding: "40px",
  width: "50px",
  height: "50px",
  zIndex: "1000",
};

function Cart() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.user);
  const onSetCartOpen = useCallback(() => {
    setIsCartOpen(!isCartOpen);
  }, [isCartOpen]);
  const {
    data: cartData,
    error: cartError,
    isLoading: cartIsLoading,
  } = useGetCartByUserIdQuery(userData.user_id);
  if (cartIsLoading)
    return (
      <CustomButton style={cartButtonStyle} type="secondary" disabled={true}>
        <LoadingSpinner />{" "}
      </CustomButton>
    );
  if (cartError) {
    return <div>Some error occurred</div>;
  }
  let cart: CartItemsType;
  let totalPrice;
  if (!cartData || !cartData.data) {
    cart = [];
    totalPrice = "0";
  } else {
    cart = cartData.data.cart_items;
    totalPrice = cartData.data.total_price;
  }

  return (
    <>
      <CartContainer
        cart_id={cartData?.data.cart_id}
        cart={cart}
        onSetCartOpen={onSetCartOpen}
        isCartOpen={isCartOpen}
        totalPrice={totalPrice}
      />

      {!isCartOpen && (
        <CustomButton
          style={cartButtonStyle}
          onClick={onSetCartOpen}
          type="secondary"
          disabled={userData.username === null}
        >
          <ShoppingCartOutlined />
        </CustomButton>
      )}
    </>
  );
}

export default Cart;
