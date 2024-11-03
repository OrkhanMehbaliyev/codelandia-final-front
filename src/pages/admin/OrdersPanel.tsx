import { Flex } from "antd";
import OrderContainer from "../../features/admin/orders/OrderContainer";
import OrderFiltrationField from "../../features/admin/orders/OrderFiltrationField";
import AdminPageHeader from "../../ui/AdminPageHeader";
import { useState } from "react";
import { useDebouncing } from "../../hooks/useDebouncing";

function OrdersPanel() {
  const [queryObj, setQueryObj] = useState({
    search: "",
    sortBy: "order_id",
    sortOrder: "Ascending",
  });

  return (
    <Flex vertical gap={20}>
      <AdminPageHeader>Orders</AdminPageHeader>
      <OrderFiltrationField setQueryObj={setQueryObj} />
      <OrderContainer queryObj={queryObj} />
    </Flex>
  );
}

export default OrdersPanel;
