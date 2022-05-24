import React, { useCallback, useEffect, useState } from 'react';

const isScrolledIntoView = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;

  // Only completely visible elements return true:
  // const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
  // Partially visible elements return true:
  const isVisible = elemTop < window.innerHeight && elemBottom >= 0;

  return isVisible;
};

const useInScrolledView = (
  itemRef: React.RefObject<HTMLElement>,
  containerRef: React.RefObject<HTMLElement>,
) => {
  const [inView, setInView] = useState(false);

  const listener = useCallback(() => {
    if (itemRef.current) {
      setInView(isScrolledIntoView(itemRef.current));
    }
  }, [itemRef]);

  useEffect(() => {
    listener();
  }, [listener]);

  useEffect(() => {
    if (itemRef.current && containerRef.current) {
      const containerNode = containerRef.current;
      containerNode.addEventListener('scroll', listener);
      return () => {
        containerNode.removeEventListener('scroll', listener);
      };
    }
  }, [containerRef, itemRef, listener]);

  return inView;
};

export { useInScrolledView };
