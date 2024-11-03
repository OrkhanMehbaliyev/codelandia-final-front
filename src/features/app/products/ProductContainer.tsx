import { Col, Pagination, Row } from "antd";
import { useEffect } from "react";
import { useGetProductsQuery } from "../../api/apiSlice";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import WrappedCard from "../../../ui/WrappedCard";
import { usePagination } from "../../../hooks/usePagination";
import { QueryObjTypes } from "../../../types/query";
type ProductContainerProps = { queryObj: QueryObjTypes };
const PAGE_SIZE = 8;
function ProductContainer({ queryObj }: ProductContainerProps) {
  const { currentPage, handlePageChange, setCurrentPage } =
    usePagination(PAGE_SIZE);
  useEffect(() => setCurrentPage(1), [queryObj, setCurrentPage]);
  const {
    data: productsData,
    error: productsError,
    isLoading: productsIsLoading,
  } = useGetProductsQuery({ page: currentPage, queryObj, limit: PAGE_SIZE });
  if (productsError) {
    return <div>Error</div>;
  }
  if (productsIsLoading) {
    return <LoadingSpinner />;
  }
  if (!productsData || productsData.data.length === 0) {
    return <div>Product do not exist.</div>;
  }

  const itemsList = productsData.data;
  const paginatedItemsList = itemsList;
  return (
    <>
      <Pagination
        onChange={handlePageChange}
        current={currentPage}
        align="center"
        total={productsData?.count || 0}
        pageSize={PAGE_SIZE}
        style={{ margin: "30px" }}
      />
      <Row gutter={10}>
        {paginatedItemsList.map((el) => (
          <Col key={el.product_id} style={{ marginBottom: "30px" }} span={6}>
            <WrappedCard
              product_id={el.product_id}
              image={el.image}
              name={el.name}
              price={el.price}
              rating={el.rating}
            />
          </Col>
        ))}
      </Row>
      <Pagination
        onChange={handlePageChange}
        current={currentPage}
        align="center"
        total={productsData?.count || 0}
        pageSize={PAGE_SIZE}
        style={{ margin: "30px" }}
      />
    </>
  );
}

export default ProductContainer;
