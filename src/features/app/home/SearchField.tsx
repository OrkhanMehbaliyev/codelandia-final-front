import { Button, Input } from "antd";
import { useDebouncing } from "../../../hooks/useDebouncing";
import { SetStateAction } from "react";
type SearchFieldProps = {
  setQuery: React.Dispatch<SetStateAction<string>>;
};
function SearchField({ setQuery }: SearchFieldProps) {
  const { input, updateSearch } = useDebouncing();
  const handleInputChange = (e: any) => {
    updateSearch(e.target.value, setQuery);
  };
  return (
    <Input
      placeholder="Search"
      style={{
        width: "700px",
        height: "60px",
        padding: "0px",
        border: "0px",
      }}
      value={input}
      onChange={handleInputChange}
      styles={{
        input: {
          background: "white",
          padding: "15px",
          fontSize: "20px",
          color: "black",
        },
        suffix: {
          background: "var(--color-primary)",
          border: "none",
          fontSize: "20px",
          height: "60px",
        },
      }}
      suffix={
        <Button
          type="primary"
          style={{
            background: "var(--color-primary)",
            border: "none",
            fontSize: "20px",
            height: "60px",
          }}
        >
          Generate
        </Button>
      }
    />
  );
}

export default SearchField;
