import { useCallback, useMemo, useState } from 'react';

export const useSeeMore = <T>(
  elements: T[],
  initialCount: number,
  incrementCount: number,
) => {
  const [countDisplayed, setCountDisplayed] = useState(
    initialCount <= elements.length ? initialCount : elements.length,
  );

  const elementsDisplayed = useMemo(() => {
    return elements.slice(0, countDisplayed);
  }, [elements, countDisplayed]);

  const increment = useCallback(() => {
    setCountDisplayed((prevCountDisplayed) =>
      Math.min(elements.length, prevCountDisplayed + incrementCount),
    );
  }, [elements.length, incrementCount]);

  const decrement = useCallback(() => {
    setCountDisplayed((prevCountDisplayed) =>
      Math.max(0, prevCountDisplayed - incrementCount),
    );
  }, [incrementCount]);

  const reset = useCallback(() => {
    setCountDisplayed(
      initialCount <= elements.length ? initialCount : elements.length,
    );
  }, [elements.length, initialCount]);

  const allElementsVisible = countDisplayed === elements.length;

  return {
    elementsDisplayed,
    allElementsVisible,
    increment,
    decrement,
    reset,
  };
};
