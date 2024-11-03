import { Col, Row } from "antd";
import WrappedCard from "../../../ui/WrappedCard";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../ui/CustomButton";
import {
  useGetPopularProductsQuery,
  useGetWishlistByUserIdQuery,
} from "../../api/apiSlice";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { WishlistItemType } from "../../../types/wishlist";

function PopularProducts() {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);
  const { data: wishListData, isLoading: wishListIsLoading } =
    useGetWishlistByUserIdQuery(userData.user_id, {
      skip: !userData.user_id,
    });
  const {
    data: popularProductsData,
    isLoading: popularProductsIsLoading,
    error: popularProductsError,
  } = useGetPopularProductsQuery();
  const isLoading = wishListIsLoading || popularProductsIsLoading;
  const error = popularProductsError;
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) return <div>Some error occurred.</div>;
  if (!popularProductsData || !popularProductsData.data) {
    return <div>There is no product </div>;
  }
  let wishListItems: WishlistItemType[];
  if (
    !wishListData ||
    !wishListData.data ||
    !wishListData.data.wishlist_items
  ) {
    wishListItems = [];
  } else {
    wishListItems = wishListData.data.wishlist_items;
  }
  const productArray = popularProductsData.data;

  return (
    <Row
      style={{
        marginTop: "20px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Col span={24} style={{ textAlign: "center" }}>
        <Title level={1} style={{ color: "white" }}>
          Our popular products
        </Title>
      </Col>

      <Row gutter={20}>
        {productArray.map((el) => {
          const isFavorite = wishListItems.find(
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
                rating={el.rating}
              />
            </Col>
          );
        })}
      </Row>

      <Col span={24} style={{ textAlign: "center", marginBottom: "20px" }}>
        <CustomButton onClick={() => navigate("/products")} type="primary">
          View all
        </CustomButton>
      </Col>
    </Row>
  );
}

export default PopularProducts;
