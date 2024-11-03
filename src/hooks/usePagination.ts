import { useState } from "react";

const usePagination = (pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginateItems = (itemsList: Array<any>) =>
    itemsList.slice(startIndex, endIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return { currentPage, handlePageChange, paginateItems, setCurrentPage };
};
export { usePagination };
