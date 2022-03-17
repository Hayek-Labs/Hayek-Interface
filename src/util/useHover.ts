import { MutableRefObject, useState, useRef, useEffect } from 'react';

// hook returns tuple(array) with type [any, boolean]
export const useHover = <T extends HTMLElement>(): [
  MutableRefObject<T | null>,
  boolean,
] => {
  const ref = useRef<T | null>(null);
  const [value] = useHoverWithRef(ref);
  return [ref, value];
};

// hook returns tuple(array) with type [any, boolean]
export const useHoverWithRef = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
): [boolean] => {
  const [value, setValue] = useState<boolean>(false);
  const handleMouseOver = (): void => setValue(true);
  const handleMouseOut = (): void => setValue(false);
  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [ref], // Recall only if ref changes
  );
  return [value];
};
