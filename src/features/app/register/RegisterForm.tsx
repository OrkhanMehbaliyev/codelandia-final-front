import { Form, FormProps, Input, message } from "antd";
import { useSignupMutation } from "../../api/apiSlice";
import CustomButton from "../../../ui/CustomButton";
import { RegistrationFormTypes } from "../../../types/user";

function RegisterForm() {
  const [form] = Form.useForm();
  const [signup] = useSignupMutation();
  const onFinish: FormProps<RegistrationFormTypes>["onFinish"] = async (
    values
  ) => {
    try {
      const response = await signup(values).unwrap();
      message.success("Registered successfully");
    } catch (err: any) {
      message.error(err.data);
    }
  };
  const onFinishFailed: FormProps<RegistrationFormTypes>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
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
      >
        <Input size="large" placeholder="user@test.com"></Input>
      </Form.Item>
      <Form.Item
        required
        rules={[{ required: true, message: "Please input your username!" }]}
        label="Username"
        name={"username"}
      >
        <Input size="large" placeholder="Coni"></Input>
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
      >
        <Input size="large" type="password" placeholder="user1234"></Input>
      </Form.Item>
      <Form.Item>
        <CustomButton type="primary" htmlType="submit">
          Register
        </CustomButton>
      </Form.Item>
    </Form>
  );
}

export default RegisterForm;
