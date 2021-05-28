import { useEffect } from 'react';

const useSetDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `snapped! • ${title}`;
  }, []);
};

export { useSetDocumentTitle };
