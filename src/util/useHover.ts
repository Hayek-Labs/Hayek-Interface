import { MutableRefObject, useState, useRef, useEffect } from 'react';

export const useHover = <T extends HTMLElement>(): [
  MutableRefObject<T | null>,
  boolean,
] => {
  const ref = useRef<T | null>(null);
  const [value] = useHoverWithRef(ref);
  return [ref, value];
};

export const useHoverWithRef = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
): [boolean] => {
  const [value, setValue] = useState<boolean>(false);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref]);
  return [value];
};
