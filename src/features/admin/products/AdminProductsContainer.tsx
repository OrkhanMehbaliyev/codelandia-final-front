import { Flex, Pagination } from "antd";
import AdminProductsItem from "./AdminProductsItem";
import { useGetProductsQuery } from "../../api/apiSlice";
import { usePagination } from "../../../hooks/usePagination";
import { QueryObjTypes } from "../../../types/query";
import { StylesType } from "../../../types/style";
const PAGE_SIZE = 10;
type AdminProductsContainerProps = { queryObj: QueryObjTypes };
const styles: StylesType = { box: { padding: "10px" } };
function AdminProductsContainer({ queryObj }: AdminProductsContainerProps) {
  const { currentPage, handlePageChange } = usePagination(PAGE_SIZE);
  const {
    data: productsData,
    error: productsError,
    isLoading: productsIsLoading,
  } = useGetProductsQuery({ limit: 10, queryObj, page: currentPage });
  if (productsError) {
    return <div>Error</div>;
  }
  if (productsIsLoading) {
    return <div>Loading...</div>;
  }
  if (!productsData || productsData.data.length === 0) {
    return <div>Product do not exist.</div>;
  }
  const itemsArray = productsData.data.map((el) => ({
    ...el,
    category: el.categories.name,
  }));
  const paginatedItemsArray = itemsArray;
  return (
    <>
      <Pagination
        current={currentPage}
        align="center"
        onChange={handlePageChange}
        total={productsData?.count || 0}
      />
      <Flex vertical gap={10} style={styles.box}>
        {paginatedItemsArray.map((el) => (
          <AdminProductsItem key={el.product_id} item={el} />
        ))}
      </Flex>
    </>
  );
}

export default AdminProductsContainer;
