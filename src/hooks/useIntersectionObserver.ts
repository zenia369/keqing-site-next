"use Client";

import { MutableRefObject, useEffect } from "react";

const useIntersectionObserver = <T = HTMLElement>(
  elementRef: MutableRefObject<T>,
  cb: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver(cb, options);

      observer.observe(elementRef.current as unknown as HTMLElement);

      return () => {
        observer.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef.current]);
};

export default useIntersectionObserver;
