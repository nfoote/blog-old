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
    width: 100,
    height: 100
  }
}

const isBrowser = () => typeof window !== "undefined"

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  // const [hasWindowDimensions, setHasWindowDimensions] = useState(false);

  const delay = 500
  let throttled = false 

  useEffect(() => {
    if (isBrowser()) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      // window.addEventListener('resize', handleResize);

      // window.resize event listener
      window.addEventListener('resize', function() {
        // only run if we're not throttled
        // if (!throttled) {
        //   // actual callback action
        //   handleResize();
        //   // we're throttled!
        //   throttled = true;
        //   // set a timeout to un-throttle
        //   setTimeout(function() {
        //     throttled = false;
        //   }, delay);
        // }  
        // console.log("resize")
        // const {height:currentHeight, width:currentWidth} = getWindowDimensions();
        // if(windowDimensions?.height > currentHeight)
        //   console.log("higher")

        handleResize();

      });

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [windowDimensions]);

  return windowDimensions;
}