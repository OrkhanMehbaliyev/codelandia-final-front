import { Flex, Image } from "antd";
import PageHeader from "../../ui/PageHeader";
import ProductFeatures from "../../features/app/productDetails/ProductFeatures";
import ProductInteraction from "../../features/app/productDetails/ProductInteraction";
import ProductDetailedDescription from "../../features/app/productDetails/ProductDetailedDescription";
import ProductInformation from "../../features/app/productDetails/ProductInformation";
import { useGetOneProductQuery } from "../../features/api/apiSlice";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ProductReviews from "../../features/app/productDetails/ProductReviews";
function ProductDetailsPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetOneProductQuery(id);
  const userData = useSelector((state: RootState) => state.user);
  if (error) {
    return <div>Error occurred.</div>;
  }
  if (isLoading) return <LoadingSpinner />;
  if (!data || !data.data) {
    return <div>Product is not available</div>;
  }
  const productData = data.data;
  return (
    <Flex vertical gap={20}>
      <PageHeader>Product</PageHeader>
      <Flex>
        <Flex justify="center" style={{ width: "50%" }}>
          <Image style={{ height: "650px" }} src={productData.image} />
        </Flex>
        <Flex
          vertical
          gap={30}
          justify="center"
          style={{ width: "50%", background: "" }}
        >
          <ProductInformation
            productName={productData.name}
            price={productData.price}
            shortDescription={productData.short_description}
            rating={productData.rating}
            ratingCount={productData.ratingCount}
          />
          {userData.isLoggedIn && (
            <ProductInteraction product_id={productData.product_id} />
          )}

          <ProductFeatures
            feat1={productData.feat_1}
            feat2={productData.feat_2}
            feat3={productData.feat_3}
          />
        </Flex>
      </Flex>

      <ProductDetailedDescription
        text={[
          {
            title: productData.name,
            paragraph: productData.long_description,
          },
        ]}
      />
      <ProductReviews product_id={productData.product_id} />
    </Flex>
  );
}

export default ProductDetailsPage;
