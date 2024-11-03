import PageHeader from "../../ui/PageHeader";
import { useState } from "react";
import ProductContainer from "../../features/app/products/ProductContainer";
import ProductsFiltrationField from "../../features/app/products/ProductsFiltrationField";
import { QueryObjTypes } from "../../types/query";

function ProductsPage() {
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
      <PageHeader>Products</PageHeader>
      <ProductsFiltrationField queryObj={queryObj} setQueryObj={setQueryObj} />
      <ProductContainer queryObj={queryObj} />
    </>
  );
}

export default ProductsPage;
