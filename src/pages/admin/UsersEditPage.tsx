import { Flex } from "antd";
import CustomButton from "../../ui/CustomButton";
import UserEditForm from "../../features/admin/users/UserEditForm";

function UsersEditPage() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <CustomButton type="back">Back</CustomButton>
      <UserEditForm />
    </Flex>
  );
}

export default UsersEditPage;
