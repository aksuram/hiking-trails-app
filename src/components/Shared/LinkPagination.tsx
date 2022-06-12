import { Link } from "react-router-dom";

import { Pagination, PaginationItem } from "@mui/material";

interface Props {
  linkRoute: string;
  pageIndex: number;
  totalPageCount: number;
}

const LinkPagination = ({ linkRoute, pageIndex, totalPageCount }: Props) => {
  return (
    <Pagination
      sx={{ mt: 1 }}
      showFirstButton
      showLastButton
      siblingCount={2}
      count={totalPageCount}
      page={pageIndex}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${linkRoute}${item.page === 1 ? "" : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
};

export default LinkPagination;
