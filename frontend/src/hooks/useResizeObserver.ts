import { useState, useEffect } from "react";

interface Dimensions {
  width: number;
  height: number;
}

function useResizeObserver(selector: string): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    const element = document.querySelector(selector);
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      });
    });

    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
  }, [selector]);

  return dimensions;
}

export default useResizeObserver;
