import { Col, Row } from "antd";
import WrappedCard from "../../../ui/WrappedCard";
import Title from "antd/es/typography/Title";
import {
  useGetProductsBySearchQuery,
  useGetWishlistByUserIdQuery,
} from "../../api/apiSlice";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { WishlistItemType } from "../../../types/wishlist";
type SearchedProductsProps = {
  query: string;
};
function SearchedProducts({ query }: SearchedProductsProps) {
  const userData = useSelector((state: RootState) => state.user);
  const { data: wishlistData, isLoading: wishlistIsLoading } =
    useGetWishlistByUserIdQuery(userData.user_id, {
      skip: !userData.user_id,
    });
  const {
    data: searchedProductsData,
    isLoading: searchedProductsIsLoading,
    error: searchedProductsError,
  } = useGetProductsBySearchQuery(query);
  const isLoading = wishlistIsLoading || searchedProductsIsLoading;
  const error = searchedProductsError;
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) return <div>Some error occurred.</div>;
  if (!searchedProductsData || !searchedProductsData.data) {
    return <div>There is no product </div>;
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
  const productArray = searchedProductsData.data;

  return (
    <Row
      style={{
        marginTop: "20px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Title
        level={2}
        style={{ color: "white", width: "100%", textAlign: "center" }}
      >
        Search result:
      </Title>
      {productArray.length === 0 ? (
        "No result."
      ) : (
        <Row gutter={20}>
          {productArray.map((el) => {
            const isFavorite = wishlistItems.find(
              (item) => item.product_id === el.product_id
            )
              ? true
              : false;
            return (
              <Col key={el.product_id}>
                <WrappedCard
                  isFavorite={isFavorite}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  product_id={el.product_id}
                />
              </Col>
            );
          })}
        </Row>
      )}
    </Row>
  );
}

export default SearchedProducts;
