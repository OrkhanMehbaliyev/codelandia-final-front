import { Flex } from "antd";
import {
  useGetProductSalesQuery,
  useGetTotalSalesForCategoriesQuery,
} from "../../api/apiSlice";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import PieChartItemCategory from "./PieChartItem";
import PieChartItemProduct from "./PieChartItemProduct";
import Title from "antd/es/typography/Title";

function PieChartContainer() {
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryIsLoading,
  } = useGetTotalSalesForCategoriesQuery();
  const {
    data: productData,
    error: productError,
    isLoading: productIsLoading,
  } = useGetProductSalesQuery();
  if (categoryIsLoading || productIsLoading) return <LoadingSpinner />;
  if (
    !categoryData ||
    !categoryData.data ||
    categoryError ||
    !productData ||
    !productData.data ||
    productError
  ) {
    return <div>Some error occured.</div>;
  }
  return (
    <Flex style={styles.container} justify="space-around">
      <Flex align="center" vertical style={styles.box}>
        <Title style={styles.title} level={4}>
          Total category sales
        </Title>
        <PieChartItemCategory data={categoryData.data} />
      </Flex>

      <Flex align="center" vertical style={styles.box}>
        <Title style={styles.title} level={4}>
          Total product sales
        </Title>
        <PieChartItemProduct data={productData.data} />
      </Flex>
    </Flex>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    height: "400px",
  },
  box: {
    width: "50%",
  },
  title: {
    margin: "0px",
    marginBottom: "-50px",
  },
};

export default PieChartContainer;
