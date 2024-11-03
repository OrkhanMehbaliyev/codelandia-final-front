import { Input } from "antd";
import UserContainer from "../../features/admin/users/UserContainer";
import AdminPageHeader from "../../ui/AdminPageHeader";
import { useDebouncing } from "../../hooks/useDebouncing";
import { useState } from "react";

function UsersPanel() {
  const [query, setQuery] = useState("");
  const { input, updateSearch } = useDebouncing();
  const handleInputChange = (e: any) => {
    updateSearch(e.target.value, setQuery);
  };
  return (
    <>
      <AdminPageHeader>Users</AdminPageHeader>
      <Input value={input} onChange={handleInputChange}></Input>
      <UserContainer query={query} />
    </>
  );
}

export default UsersPanel;
