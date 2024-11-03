import { Flex, Input, Select, Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useDebouncing } from "../../../hooks/useDebouncing";

const styles: { [key: string]: React.CSSProperties } = {
  container: { height: "40px" },
  box: { padding: "10px" },
  input: { width: "500px", fontSize: "16px", borderRadius: "5px" },
  select: { minWidth: "250px" },
  paragraph: { fontSize: "18px", margin: "0px" },
};
const sortByOptions = [
  {
    key: 1,
    value: "order_id",
    label: "Id",
  },
  {
    key: 2,
    value: "username",
    label: "Username",
  },
  { key: 3, value: "created_at", label: "Order date" },
  { key: 4, value: "price", label: "Price" },
  { key: 5, value: "status", label: "status" },
];
const sortOrderOptions = [
  {
    key: 1,
    value: "Ascending",
    label: "Ascending",
  },
  { key: 2, value: "Descending", label: "Descending" },
];
function OrderFiltrationField({ setQueryObj }) {
  const { input, updateQuery } = useDebouncing();
  const handleInputChange = (e: any) => {
    updateQuery(e.target.value, setQueryObj, "search");
  };
  const handleSortByChange = (val) => {
    setQueryObj((queryObj) => ({ ...queryObj, sortBy: val }));
  };
  const handleSortOrderChange = (val) => {
    setQueryObj((queryObj) => ({
      ...queryObj,
      sortOrder: val,
    }));
  };
  return (
    <Flex style={styles.box} justify="space-around">
      <div>
        <Paragraph style={styles.paragraph}>Username:</Paragraph>
        <Input
          onChange={handleInputChange}
          value={input}
          placeholder="Search by username..."
          style={styles.input}
        ></Input>
      </div>
      <Flex gap={10} style={{ height: "100%" }}>
        <div>
          <Paragraph style={styles.paragraph}>Sort by:</Paragraph>
          <Select
            onChange={handleSortByChange}
            options={sortByOptions}
            style={styles.select}
          ></Select>
        </div>
        <div>
          <Paragraph style={styles.paragraph}>Sort order:</Paragraph>
          <Select
            onChange={handleSortOrderChange}
            options={sortOrderOptions}
            style={styles.select}
          ></Select>
        </div>
      </Flex>
    </Flex>
  );
}

export default OrderFiltrationField;
