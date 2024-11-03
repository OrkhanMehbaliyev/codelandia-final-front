import { Collapse, message } from "antd";

import OrderLabel from "./OrderLabel";
import OrderChildren from "./OrderChildren";
import { useUpdateOrderStatusMutation } from "../../api/apiSlice";
import { Order } from "../../../types/order";
type Props = { item: Order };
const styles = {
  container: {
    background: "#202020",

    borderRadius: "10px",
    alignItems: "center",
    width: "90%",
  },
};
function OrderItem({ item }: Props) {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const creationDate = new Date(item.created_at);
  const formattedDate = creationDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
  const curStatus = item.status;

  const handleStatusChange = async (e: any) => {
    try {
      await updateOrderStatus({
        order_id: item.order_id,
        status: e,
      }).unwrap();

      message.success("Status updated.");
    } catch (err: any) {
      message.error(err.data);
    }
  };
  return (
    <Collapse
      style={styles.container}
      items={[
        {
          key: "1",
          label: (
            <OrderLabel
              curStatus={curStatus}
              onStatusChange={handleStatusChange}
              order_id={item.order_id}
              totalPrice={item.total_price}
              username={item.username}
              formattedDate={formattedDate}
              status={item.status}
            />
          ),
          children: <OrderChildren items={item.order_items} />,
        },
      ]}
    />
  );
}

export default OrderItem;
