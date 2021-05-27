import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useSetDocumentTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `snapped! • ${pathname}`;
  }, []);
};

export default useSetDocumentTitle;
