import { Checkbox, Collapse, Flex, Input, Select, Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useGetCategoriesQuery } from "../../api/apiSlice";
import { convertCategoriesToOptions, isNumber } from "../../../utils/helpers";
import { useDebouncing } from "../../../hooks/useDebouncing";
import { QueryObjTypes, SetQueryObjTypes } from "../../../types/query";
import { StylesType } from "../../../types/style";

const styles: StylesType = {
  paragraph: { margin: "0px" },
  collapse: { width: "300px" },
  input: { width: "500px" },
  priceInput: { width: "70px", height: "100%" },
  dashParagraph: {
    margin: "0px",
    fontSize: "20px",
    marginLeft: "5px",
    marginRight: "5px",
  },
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
type FiltrationFieldProps = {
  queryObj: QueryObjTypes;
  setQueryObj: SetQueryObjTypes;
};
function AdminProductsFiltrationField({
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

    setQueryObj((queryObj) => ({ ...queryObj, category: encodedList }));
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
  const handleSortChange = (val: string) => {
    setQueryObj((queryObj: QueryObjTypes) => ({ ...queryObj, sortOrder: val }));
  };
  const handleSortByChange = (val: string) =>
    setQueryObj((queryObj) => ({ ...queryObj, sortBy: val }));

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Flex justify="space-around" align="center" style={{ width: "100%" }}>
        <Collapse
          style={styles.collapse}
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
          style={styles.input}
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
            style={styles.priceInput}
          />
          <Paragraph style={styles.dashParagraph}>-</Paragraph>
          <Input
            value={maxPriceInput}
            onChange={handleMaxPriceChange}
            style={styles.priceInput}
          />
        </Flex>
      </Flex>
    </Space>
  );
}

export default AdminProductsFiltrationField;
