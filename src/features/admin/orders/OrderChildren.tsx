import { Flex } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { OrderItem } from "../../../types/order";
type Props = { items: OrderItem[] };
function OrderChildren({ items }: Props) {
  return (
    <Flex vertical>
      {items.map((el) => (
        <Paragraph key={el.product_name}>
          {el.product_name} {el.quantity} x {el.product_price}$
        </Paragraph>
      ))}
    </Flex>
  );
}

export default OrderChildren;
