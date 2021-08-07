import { Box, Slide } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import { useCard } from '../../../../context';

export default function CommentsPagination({ pageNum, calcPageCount, handlePageChange }) {
  const { commentsCount, maxCommentsShown } = useCard();

  return (
    <Slide in={commentsCount > maxCommentsShown} timeout={800} direction="left" unmountOnExit>
      <Box my={1.5}>
        <Pagination
          count={calcPageCount()}
          onChange={handlePageChange}
          page={pageNum}
          variant="outlined"
          shape="rounded"
          size="small"
        />
      </Box>
    </Slide>
  );
}
