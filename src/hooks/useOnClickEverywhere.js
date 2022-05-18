import { useEffect } from 'react';

export const useOnClickEverywhere = (ref, close, callback) => {
  const handleMouseUp = () => {
    close();
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);

    return () => document.removeEventListener('mouseup', handleMouseUp);
  });
};
