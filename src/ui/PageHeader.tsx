import { Flex } from "antd";
import Title from "antd/es/typography/Title";
type PageHeaderProps = { children: React.ReactNode };
function PageHeader({ children }: PageHeaderProps) {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        width: "100%",

        height: "150px",
        backgroundImage: "url(/headerBg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Title
        level={1}
        style={{ textAlign: "center", padding: "0px", margin: "0px" }}
      >
        {children}
      </Title>
    </Flex>
  );
}

export default PageHeader;
