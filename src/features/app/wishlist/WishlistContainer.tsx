import { Divider, Flex } from "antd";
import WishlistItem from "./WishlistItem";
import { useGetWishlistByUserIdQuery } from "../../api/apiSlice";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import { WishlistItemType } from "../../../types/wishlist";
import { RootState } from "../../../store";
import Paragraph from "antd/es/typography/Paragraph";
import React from "react";

function WishlistContainer() {
  const userData = useSelector((state: RootState) => state.user);
  const {
    data: wishlistData,
    isLoading: wishlistIsLoading,
    error: wishlistError,
  } = useGetWishlistByUserIdQuery(userData?.user_id);
  if (!userData) {
    return <div>You should login first.</div>;
  }
  if (wishlistIsLoading) {
    return <LoadingSpinner />;
  }
  if (wishlistError) {
    return <div>Some error occurred</div>;
  }
  let wishlistItems: WishlistItemType[];
  if (
    !wishlistData ||
    !wishlistData.data ||
    !wishlistData.data.wishlist_items
  ) {
    wishlistItems = [];
  } else {
    wishlistItems = wishlistData.data.wishlist_items;
  }
  return (
    <Flex
      vertical
      gap={10}
      style={{ paddingRight: "10px", paddingLeft: "10px" }}
    >
      {wishlistItems.length !== 0 ? (
        wishlistItems?.map((item: WishlistItemType) => (
          <React.Fragment key={item.product_id}>
            <WishlistItem item={item} />
            <Divider
              style={{ borderColor: "#ffffff20", margin: "0px" }}
            ></Divider>
          </React.Fragment>
        ))
      ) : (
        <Paragraph>Your wishlist is empty.</Paragraph>
      )}
    </Flex>
  );
}

export default WishlistContainer;
