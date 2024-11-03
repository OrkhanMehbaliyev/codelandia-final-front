import { Flex } from "antd";
import Title from "antd/es/typography/Title";
type HeaderProps = {
  children: React.ReactNode;
};
function AdminPageHeader({ children }: HeaderProps) {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        width: "100%",
        height: "50px",
      }}
    >
      <Title
        level={3}
        style={{ textAlign: "center", padding: "0px", margin: "0px" }}
      >
        {children}
      </Title>
    </Flex>
  );
}

export default AdminPageHeader;
