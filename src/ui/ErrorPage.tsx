import { Flex } from "antd";
import Title from "antd/es/typography/Title";

function ErrorPage() {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: "100vh",
        width: "100vw",
        color: "white",
        background: "var(--color-background)",
      }}
    >
      <Title level={1}>Some error occurred.</Title>
    </Flex>
  );
}

export default ErrorPage;
