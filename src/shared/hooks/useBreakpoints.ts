import { useState, useEffect, useMemo } from "react";

interface BreakpointInfo {
  width: number;
  height: number;
  smDown: boolean;
  smUp: boolean;
  mdDown: boolean;
  mdUp: boolean;
  lgDown: boolean;
  lgUp: boolean;
  xlDown: boolean;
  xlUp: boolean;
  xxlDown: boolean;
  xxlUp: boolean;
  isMobile: boolean;
  isLaptop: boolean;
  isPC: boolean;
}

interface windowSize {
  height: number;
  width: number;
}

export const useBreakpoints = (): BreakpointInfo => {
  const [windowSize, setWindowSize] = useState<windowSize>({width: window.innerWidth, height: window.innerHeight})

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  },[]);
  
  const breakpointInfo = useMemo(() => {
    const { width, height } = windowSize;

    const smDown = width <= 640;
    const smUp = width > 640;
    const mdDown = width <= 768;
    const mdUp = width > 768;
    const lgDown = width <= 1024;
    const lgUp = width > 1024;
    const xlDown = width <= 1280;
    const xlUp = width > 1280;
    const xxlDown = width <= 1536;
    const xxlUp = width > 1536;
    const isMobile = width <= 1024;
    const isLaptop = width > 1024 && width <= 1366;
    const isPC = width > 1366;

    return {
      width,
      height,
      smDown,
      smUp,
      mdDown,
      mdUp,
      lgDown,
      lgUp,
      xlDown,
      xlUp,
      xxlDown,
      xxlUp,
      isMobile,
      isLaptop,
      isPC,
    };
  }, [windowSize]);

  const handleWindowResize= () => {
    setWindowSize({width: innerWidth, height: innerHeight})
  }

  return breakpointInfo;
};
