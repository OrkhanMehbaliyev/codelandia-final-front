import { Flex } from "antd";
import CustomButton from "../../ui/CustomButton";

import CategoriesEditForm from "../../features/admin/categories/CategoriesEditForm";

function CategoriesEditPage() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <CustomButton type="back">Back</CustomButton>
      <CategoriesEditForm />
    </Flex>
  );
}

export default CategoriesEditPage;
