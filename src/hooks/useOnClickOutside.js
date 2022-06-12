import { useEffect } from 'react';

export const useOnClickOutside = (ref, handler) => {
  const isBrowser = typeof window !== "undefined"
  useEffect(() => {
    if(isBrowser) {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
      };
    }
  },
  [ref, handler],
  );
};