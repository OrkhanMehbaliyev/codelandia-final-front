import { Flex } from "antd";
import RegisterForm from "../../features/app/register/RegisterForm";

function RegisterPage() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "80vh", width: "100%" }}
    >
      <RegisterForm />
    </Flex>
  );
}

export default RegisterPage;
