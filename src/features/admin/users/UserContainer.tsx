import { Divider, Flex, Pagination } from "antd";
import UserItem from "./UserItem";
import { useGetUsersQuery } from "../../api/apiSlice";
import { usePagination } from "../../../hooks/usePagination";
import React, { useEffect } from "react";
const PAGE_SIZE = 5;
type Props = { query: string };
function UserContainer({ query }: Props) {
  const { currentPage, handlePageChange, setCurrentPage } =
    usePagination(PAGE_SIZE);

  const {
    data: usersData,
    isLoading: userIsLoading,
    error: userError,
  } = useGetUsersQuery({
    searchQuery: query,
    page: currentPage,
    limit: PAGE_SIZE,
  });
  useEffect(() => setCurrentPage(1), [query, setCurrentPage]);
  if (userIsLoading) {
    return <div>Loading...</div>;
  }
  if (userError) {
    return <div>Error occurred during fetch.</div>;
  }
  if (!usersData || !usersData.data) {
    return <div>Users not found.</div>;
  }
  const items = usersData.data;
  const paginatedItems = items;
  const styles = {
    container: { paddingRight: "10px", paddingLeft: "10px" },
    divider: { borderColor: "#ffffff20", margin: "0px" },
  };
  return (
    <>
      <Pagination
        current={currentPage}
        align="center"
        onChange={handlePageChange}
        pageSize={PAGE_SIZE}
        total={usersData?.count || 0}
      />
      <Flex vertical gap={10} style={styles.container}>
        {paginatedItems.map((item) => (
          <React.Fragment key={item.user_id}>
            <UserItem item={item} />
            <Divider style={styles.divider}></Divider>
          </React.Fragment>
        ))}
      </Flex>
    </>
  );
}

export default UserContainer;
