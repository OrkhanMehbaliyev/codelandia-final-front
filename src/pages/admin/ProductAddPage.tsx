import { Flex } from "antd";
import CustomButton from "../../ui/CustomButton";

import ProductsAddForm from "../../features/admin/products/ProductsAddForm";
function ProductAddPage() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <CustomButton type="back">Back</CustomButton>
      <ProductsAddForm />
    </Flex>
  );
}

export default ProductAddPage;
