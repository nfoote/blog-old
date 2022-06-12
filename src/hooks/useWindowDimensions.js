import { useState, useEffect } from 'react';

function getWindowDimensions() {
  if (isBrowser()) {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  return { 
    width: '100',
    height:'100'
  }
}

const isBrowser = () => typeof window !== "undefined"

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (isBrowser()) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowDimensions;
}