import { Flex, Pagination } from "antd";
import { usePagination } from "../../../hooks/usePagination";
import OrderItem from "./OrderItem";
import { useGetOrdersQuery } from "../../api/apiSlice";
import LoadingSpinner from "../../../ui/LoadingSpinner";
const PAGE_SIZE = 10;
const styles: { [key: string]: React.CSSProperties } = {
  pagination: { textAlign: "center", marginBottom: "0px" },
  box: { padding: "10px" },
};
function OrderContainer({ queryObj }) {
  const { currentPage, handlePageChange } = usePagination(PAGE_SIZE);
  console.log(queryObj);
  const {
    data: ordersData,
    error: ordersError,
    isLoading: ordersIsLoading,
  } = useGetOrdersQuery({
    page_size: PAGE_SIZE,
    current_page: currentPage,
    queryObj,
  });

  if (ordersIsLoading) return <LoadingSpinner />;
  if (ordersError) return <div>Some error occurred.</div>;

  const ordersArray = ordersData?.data || [];

  return (
    <>
      <Pagination
        align="center"
        current={currentPage}
        onChange={handlePageChange}
        total={ordersData?.count || 0}
        pageSize={PAGE_SIZE}
        style={styles.pagination}
      />

      <Flex vertical gap={10} style={styles.box} align="center">
        {ordersArray.map((order) => (
          <OrderItem key={order.order_id} item={order} />
        ))}
      </Flex>
    </>
  );
}

export default OrderContainer;
