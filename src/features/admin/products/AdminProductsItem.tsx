import { Flex, Image, message, Rate, Row, Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import CustomButton from "../../../ui/CustomButton";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../../api/apiSlice";
import { Product } from "../../../types/product";
type ItemProps = {
  item: Product & { category: string };
};

const styles = {
  title: { margin: 0 },
  container: {
    background: "#202020",
    height: "90px",
    borderRadius: "10px",
    alignItems: "center",
  },
  image: { height: "90px", width: "80px", borderRadius: "10px" },
  categoryTitle: { margin: 0, color: "#ffffff34", fontWeight: "300" },
  buttonBox: { margin: "10px" },
};
function AdminProductsItem({ item }: ItemProps) {
  const [deleteProduct] = useDeleteProductMutation();
  const handleDelete = async () => {
    try {
      await deleteProduct(item.product_id).unwrap();
      message.success("Product deleted.");
    } catch (err: any) {
      message.error(err.data);
    }
  };
  return (
    <Row style={styles.container} justify={"space-between"}>
      <Space>
        <Image style={styles.image} src={item.image}></Image>
        <Flex vertical gap={5}>
          <Title style={styles.title} level={5}>
            Price: ${item.price}
          </Title>
          <Paragraph style={styles.title}>
            Total sold: {item.soldAmount}
          </Paragraph>
          <Rate value={item.rating} disabled />
        </Flex>
      </Space>
      <Flex vertical align="center">
        <Title style={styles.title} level={4}>
          {item.name}
        </Title>
        <Paragraph style={styles.categoryTitle}>{item.category}</Paragraph>
      </Flex>
      <Space style={styles.buttonBox}>
        <Link to={`edit/${item.product_id}`}>
          <CustomButton type="primary">Edit</CustomButton>
        </Link>
        <CustomButton type="secondary" onClick={handleDelete}>
          Delete
        </CustomButton>
      </Space>
    </Row>
  );
}

export default AdminProductsItem;
