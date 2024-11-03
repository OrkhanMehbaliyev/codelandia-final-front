import { Flex, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import CustomButton from "../../../ui/CustomButton";
import { User } from "../../../types/user";
import Paragraph from "antd/es/typography/Paragraph";
import { Link } from "react-router-dom";
type ItemProps = {
  item: User;
};
const styles = {
  title: { margin: 0 },
  notHovered: {
    background: "",
    minHeight: "80px",
    borderRadius: "10px",
    alignItems: "center",
    padding: "10px",
    transition: "ease-in-out 300ms",
  },
  hovered: {
    background: "#792800",
    minHeight: "80px",
    padding: "10px",
    borderRadius: "10px",
    alignItems: "center",
  },
  paragraph: { margin: "0px", fontSize: "18px", color: "#fff" },
  span: { fontWeight: "500" },
  role: { margin: "0px", color: "#ffffff10", fontWeight: "600" },
  buttonContainer: { margin: "10px" },
  button: { height: "40px", width: "120px" },
};
function UserItem({ item }: ItemProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleHover = () => {
    setIsHovered(!isHovered);
  };
  const creationDate = new Date(item.created_at);
  const formattedDate = creationDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
  return (
    <Row
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      style={!isHovered ? styles.notHovered : styles.hovered}
      justify={"space-between"}
    >
      <Space size={"large"}>
        <Flex vertical gap={5}>
          <Paragraph style={styles.paragraph}>
            <span style={styles.span}>Username:</span> {item.username}
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            <span style={styles.span}>Email:</span> {item.email}
          </Paragraph>
        </Flex>
      </Space>
      <Flex vertical align="center" justify="center">
        <Paragraph style={styles.paragraph}>
          Created at: {formattedDate}
        </Paragraph>
      </Flex>
      <Flex vertical align="center">
        <Title level={2} style={styles.role}>
          {item.role}
        </Title>
      </Flex>
      <Space style={styles.buttonContainer}>
        <Link to={`edit/${item.user_id}`}>
          <CustomButton style={styles.button} type="primary">
            Edit
          </CustomButton>
        </Link>
      </Space>
    </Row>
  );
}

export default UserItem;
