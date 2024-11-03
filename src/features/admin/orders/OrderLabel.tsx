import { Flex, message, Select } from "antd";
import { Order } from "../../../types/order";
import CustomButton from "../../../ui/CustomButton";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteOrderMutation } from "../../api/apiSlice";
import { MouseEventHandler } from "react";
import { StylesType } from "../../../types/style";

const options = [
  { key: "1", value: "pending", label: "pending" },
  { key: "2", value: "completed", label: "completed" },
  { key: "3", value: "cancelled", label: "cancelled" },
];
type Props = Partial<Order> & {
  totalPrice: string;
  formattedDate: string;
  curStatus: string;
  onStatusChange: any;
};
const styles: StylesType = {
  container: { position: "relative" },
  button: {
    position: "absolute",
    right: "0px",
    color: "var(--color-primary)",
  },
};
function OrderLabel({
  username,
  totalPrice,
  formattedDate,
  status,
  order_id,
  curStatus,
  onStatusChange,
}: Props) {
  const [deleteOrder] = useDeleteOrderMutation();
  const handleDelete = async (e: any) => {
    e.stopPropagation();
    try {
      const data = await deleteOrder(order_id).unwrap();
      message.success("Order deleted successfully.");
    } catch (err: any) {
      message.error(err.data.message);
    }
  };
  return (
    <Flex style={styles.container} align={"center"} justify="space-around">
      <div>ID: {order_id}</div>
      <div>User: {username}</div> <div>Order date: {formattedDate}</div>
      <div>Price: {totalPrice}$</div>{" "}
      <div>
        Status:{" "}
        <Select
          options={options}
          onClick={(e) => e.stopPropagation()}
          value={curStatus}
          onChange={onStatusChange}
        />
      </div>
      <CustomButton
        onClick={handleDelete}
        type="secondary"
        style={styles.button}
      >
        <DeleteOutlined />
      </CustomButton>
    </Flex>
  );
}

export default OrderLabel;
