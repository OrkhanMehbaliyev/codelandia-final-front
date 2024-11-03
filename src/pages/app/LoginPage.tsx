import { Flex } from "antd";
import LoginForm from "../../features/app/login/LoginForm";

function LoginPage() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "80vh", width: "100%" }}
    >
      <LoginForm />
    </Flex>
  );
}

export default LoginPage;
