import { Form, FormProps, Input, message, Select } from "antd";
import { useParams } from "react-router-dom";
import { useGetOneUserQuery, useUpdateUserMutation } from "../../api/apiSlice";
import CustomButton from "../../../ui/CustomButton";
import { UserFormTypes } from "../../../types/user";

const options = [
  { value: "admin", key: "admin" },
  { value: "user", key: "user" },
];
const styles = { form: { width: "500px" } };
function UserEditForm() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [updateUser] = useUpdateUserMutation();

  const {
    data: oldUserData,
    error: oldUserError,
    isLoading: oldUserIsLoading,
  } = useGetOneUserQuery(id);

  const onFinishFailed: FormProps<UserFormTypes>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  if (oldUserIsLoading) {
    return <div>Loading...</div>;
  }
  if (oldUserError) {
    return <div>Error</div>;
  }
  if (!oldUserData || !oldUserData.data)
    return <div>Old data does not exist.</div>;
  const handleSubmit = async (values: UserFormTypes) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("role", values.role);
    try {
      const response = await updateUser({ id, formData }).unwrap();

      if (response) {
        message.success("User updated successfully!");
      }
    } catch (error) {
      message.error("Error updating user.");
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      style={styles.form}
      form={form}
    >
      <Form.Item
        required
        rules={[{ required: true, message: "Please input the user name." }]}
        initialValue={oldUserData.data.username}
        label="Username"
        name={"username"}
      >
        <Input
          placeholder="User"
          size="large"
          defaultValue={oldUserData.data.username}
        ></Input>
      </Form.Item>
      <Form.Item
        initialValue={oldUserData.data.role}
        required
        rules={[{ required: true, message: "Please input the role choice" }]}
        label="Role"
        name={"role"}
      >
        <Select
          defaultValue={oldUserData.data.role}
          size="large"
          options={options}
        />
      </Form.Item>
      <Form.Item>
        <CustomButton type="primary" htmlType="submit">
          Submit
        </CustomButton>
      </Form.Item>
    </Form>
  );
}

export default UserEditForm;
