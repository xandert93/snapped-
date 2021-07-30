import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

export default function CommentsPagination({
  getPageCount,
  handlePageChange,
  pageNum,
}) {
  return (
    <Box my={1.5}>
      <Pagination
        count={getPageCount()}
        onChange={handlePageChange}
        page={pageNum}
        variant="outlined"
        shape="rounded"
        size="small"
      />
    </Box>
  );
}
