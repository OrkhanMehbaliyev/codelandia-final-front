import { Card, Flex, Image } from "antd";
import Title from "antd/es/typography/Title";
import CustomButton from "../../../ui/CustomButton";
import { Link } from "react-router-dom";
type ItemProps = {
  item: { name: string; image: string; category_id: string };
};
const styles = { Title: { margin: "0px" } };
function AdminCategoriesItem({ item }: ItemProps) {
  return (
    <Card style={{ width: "280px" }} cover={<Image src={item.image}></Image>}>
      <Flex justify="space-between" align="center">
        <Title style={styles.Title} level={4}>
          {item.name}
        </Title>
        <Link to={`edit/${item.category_id}`}>
          <CustomButton type="primary"> Edit</CustomButton>
        </Link>
      </Flex>
    </Card>
  );
}

export default AdminCategoriesItem;
