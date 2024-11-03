import { Flex } from "antd";
import CustomButton from "../../ui/CustomButton";
import CategoriesAddForm from "../../features/admin/categories/CategoriesAddForm";

function CategoriesAddPage() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <CustomButton type="back">Back</CustomButton>
      <CategoriesAddForm />
    </Flex>
  );
}

export default CategoriesAddPage;
