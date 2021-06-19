import { useState, useEffect } from 'react';

export const useGridScroll = (
  initialNoOfPostsShown,
  noOfPosts,
  distanceFromPageEnd
) => {
  const [noOfPostsShown, setNoOfPostsShown] = useState(initialNoOfPostsShown);

  const arePostsExhausted = noOfPosts <= noOfPostsShown;

  useEffect(() => {
    if (arePostsExhausted) return;
    window.addEventListener('scroll', scrollHandler);

    function scrollHandler() {
      const isScrolledNearPageEnd =
        window.scrollY + window.innerHeight >
        document.body.clientHeight - distanceFromPageEnd;

      if (isScrolledNearPageEnd) setNoOfPostsShown((x) => x + 3);
    }

    return () => window.removeEventListener('scroll', scrollHandler); //gets called when arePostsExhausted changes from false --> true
  }, [arePostsExhausted]);

  return noOfPostsShown;
};
