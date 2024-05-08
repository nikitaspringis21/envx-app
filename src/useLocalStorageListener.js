import { useEffect, useState } from 'react';

function useLocalStorageListener() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => {
      forceUpdate(n => n + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

}

export default useLocalStorageListener;
