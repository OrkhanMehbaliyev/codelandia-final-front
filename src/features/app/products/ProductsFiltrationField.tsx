import { Checkbox, Collapse, Flex, Input, Select, Space } from "antd";
import { useDebouncing } from "../../../hooks/useDebouncing";
import { convertCategoriesToOptions, isNumber } from "../../../utils/helpers";
import { useGetCategoriesQuery } from "../../api/apiSlice";
import Paragraph from "antd/es/typography/Paragraph";
import { QueryObjTypes, SetQueryObjTypes } from "../../../types/query";
type FiltrationFieldProps = {
  queryObj: QueryObjTypes;
  setQueryObj: SetQueryObjTypes;
};
const styles = {
  paragraph: { margin: "0px" },
};
const sortOptions = [
  { key: 1, value: "Ascending", label: "Ascending" },
  { key: 2, value: "Descending", label: "Descending" },
];
const sortBy = [
  {
    key: 1,
    value: "price",
    label: "Price",
  },
  {
    key: 2,
    value: "name",
    label: "Name",
  },
  { key: 3, value: "rating", label: "Rating" },
  { key: 4, value: "soldAmount", label: "Sold amount" },
];
function ProductsFiltrationField({
  queryObj,
  setQueryObj,
}: FiltrationFieldProps) {
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useGetCategoriesQuery();
  const { input: searchInput, updateQuery: searchUpdateQuery } =
    useDebouncing<QueryObjTypes>();
  const { input: minPriceInput, updateQuery: minPriceUpdateQuery } =
    useDebouncing<QueryObjTypes>();
  const { input: maxPriceInput, updateQuery: maxPriceUpdateQuery } =
    useDebouncing<QueryObjTypes>();
  if (categoriesIsLoading) {
    return <div>Loading...</div>;
  }
  if (categoriesError) {
    return <div>Error</div>;
  }
  const categoriesArray = categoriesData?.data;
  const categoryOptions = convertCategoriesToOptions(categoriesArray);

  const handleCategorySelect = (list: string[]) => {
    const encodedList = list.map((el) => encodeURIComponent(el));

    setQueryObj((queryObj: QueryObjTypes) => ({
      ...queryObj,
      category: encodedList,
    }));
  };
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumber(e.target.value))
      minPriceUpdateQuery(e.target.value, setQueryObj, "minPrice");
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchUpdateQuery(e.target.value, setQueryObj, "search");
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumber(e.target.value))
      maxPriceUpdateQuery(e.target.value, setQueryObj, "maxPrice");
  };
  const handleSortChange = (val: string) =>
    setQueryObj((queryObj: QueryObjTypes) => ({ ...queryObj, sortOrder: val }));
  const handleSortByChange = (val: string) =>
    setQueryObj((queryObj: QueryObjTypes) => ({ ...queryObj, sortBy: val }));
  return (
    <Space direction="vertical" style={{ width: "100%", margin: "20px 0px" }}>
      <Flex justify="space-around" align="center" style={{ width: "100%" }}>
        <Collapse
          style={{ width: "300px" }}
          items={[
            {
              key: "1",
              label: "Categories",
              children: (
                <Checkbox.Group
                  onChange={handleCategorySelect}
                  options={categoryOptions}
                ></Checkbox.Group>
              ),
            },
          ]}
        />
        <Input.Search
          size="large"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearch}
          style={{ width: "500px" }}
          styles={{}}
        />
        <Flex align="center" gap={20}>
          <Paragraph style={styles.paragraph}>Sort by:</Paragraph>
          <Select
            options={sortBy}
            onChange={handleSortByChange}
            value={queryObj.sortBy}
          ></Select>
          <Paragraph style={styles.paragraph}>Sort order:</Paragraph>
          <Select
            options={sortOptions}
            onChange={handleSortChange}
            value={queryObj.sortOrder}
          ></Select>
        </Flex>
      </Flex>
      <Flex gap={20} align="center" justify="center">
        <Paragraph style={styles.paragraph}>Price range:</Paragraph>
        <Flex>
          <Input
            min={0}
            onChange={handleMinPriceChange}
            value={minPriceInput}
            style={{ width: "70px", height: "100%" }}
          />
          <Paragraph
            style={{
              ...styles.paragraph,
              fontSize: "20px",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            -
          </Paragraph>
          <Input
            value={maxPriceInput}
            onChange={handleMaxPriceChange}
            style={{ width: "70px", height: "100%" }}
          />
        </Flex>
      </Flex>
    </Space>
  );
}

export default ProductsFiltrationField;
