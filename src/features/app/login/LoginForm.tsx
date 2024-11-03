import { Form, FormProps, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/apiSlice";
import { LoginFormTypes } from "../../../types/user";
import { loginUser } from "../../authorization/userSlice";
import CustomButton from "../../../ui/CustomButton";

function LoginForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const onFinish: FormProps<LoginFormTypes>["onFinish"] = async (values) => {
    try {
      const loginData = await login(values).unwrap();

      message.success("Successfully logged in");
      dispatch(loginUser(loginData));
      navigate("/");
    } catch (err: any) {
      message.error(err.data);
    }
  };

  const onFinishFailed: FormProps<LoginFormTypes>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const navigateToRegister: () => void = () => {
    navigate("/register");
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      style={{ width: "500px" }}
      form={form}
    >
      <Form.Item
        required
        rules={[
          { type: "email", message: "Please enter a valid email." },
          { required: true, message: "Please input your email!" },
        ]}
        label="Email"
        name={"email"}
        tooltip={{ title: "Admin mail: admin@test.com" }}
      >
        <Input size="large" placeholder="admin@test.com"></Input>
      </Form.Item>
      <Form.Item
        required
        rules={[
          { required: true, message: "Please input your password!" },
          {
            min: 8,
            message: "Password should contain at least 8 characters.",
          },
        ]}
        label="Password"
        name={"password"}
        tooltip={{ title: "Admin password: admin123" }}
      >
        <Input size="large" type="password" placeholder="admin123"></Input>
      </Form.Item>
      <Form.Item>
        <CustomButton htmlType="submit" type="primary">
          Login
        </CustomButton>
        <CustomButton type="secondary" onClick={navigateToRegister}>
          Register
        </CustomButton>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
