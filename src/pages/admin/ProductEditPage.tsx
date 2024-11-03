import { Flex } from "antd";
import CustomButton from "../../ui/CustomButton";

import ProductsEditForm from "../../features/admin/products/ProductsEditForm";

function ProductEditPage() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <CustomButton type="back">Back</CustomButton>
      <ProductsEditForm />
    </Flex>
  );
}

export default ProductEditPage;
