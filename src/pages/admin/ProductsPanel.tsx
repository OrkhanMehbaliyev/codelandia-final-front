import { Flex } from "antd";
import AdminPageHeader from "../../ui/AdminPageHeader";
import CustomButton from "../../ui/CustomButton";
import AdminProductsContainer from "../../features/admin/products/AdminProductsContainer";
import { Link } from "react-router-dom";
import AdminProductsFiltrationField from "../../features/admin/products/AdminProductsFiltrationField";
import { useState } from "react";
import { QueryObjTypes } from "../../types/query";
function ProductsPanel() {
  const [queryObj, setQueryObj] = useState<QueryObjTypes>({
    category: [],
    search: "",
    sortBy: "price",
    sortOrder: "Ascending",
    minPrice: "",
    maxPrice: "",
  });
  return (
    <>
      <AdminPageHeader>Products</AdminPageHeader>
      <Flex
        align="center"
        justify="space-between"
        style={{ position: "relative", margin: "10px" }}
      >
        <AdminProductsFiltrationField
          queryObj={queryObj}
          setQueryObj={setQueryObj}
        />
        <Link to={"add"}>
          <CustomButton
            style={{
              position: "absolute",
              right: "0px",
              bottom: "0px",
              margin: "5px",
              marginRight: "36px",
            }}
            type="primary"
          >
            Add product
          </CustomButton>
        </Link>
      </Flex>
      <AdminProductsContainer queryObj={queryObj} />
    </>
  );
}

export default ProductsPanel;
