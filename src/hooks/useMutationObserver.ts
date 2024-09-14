"use Client";

import { MutableRefObject, useEffect } from "react";

const useMutationObserver = <T = HTMLElement>(
  elementRef: MutableRefObject<T>,
  cb: MutationCallback,
  options: MutationObserverInit
): void => {
  useEffect(() => {
    if (elementRef.current) {
      const observer = new MutationObserver(cb);

      observer.observe(elementRef.current as unknown as Node, options);

      return () => {
        observer.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef.current]);
};

export default useMutationObserver;
