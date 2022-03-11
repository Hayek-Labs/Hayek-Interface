import clsx from 'clsx';
import { ChangeEventHandler, useCallback } from 'react';

export const useNumberInputOnChangeGenerator = () => {
  return useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setState: SetState<number>) => {
      const value = e.target.value;
      const numValue = Number(value);
      if (!isNaN(numValue) && isFinite(numValue)) {
        setState(numValue);
      }
    },
    [],
  );
};

export const useDefaultNumberInputOnChange = (
  onChangeGen: (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: SetState<number>,
  ) => void,
  setState: SetState<number>,
): ChangeEventHandler<HTMLInputElement> => {
  return useCallback(
    (e) => {
      onChangeGen(e, setState);
    },
    [onChangeGen, setState],
  );
};

interface Props<T> {
  val: T;
  classOverwrite?: boolean;
}

type AllProps = Props<number> | Props<string>;

export const baseClassName = 'px-4 py-2 text-black';

const Input: React.FC<AllProps & HTML.Input> = ({
  val,
  classOverwrite,
  className: passedClassName,
  ...props
}) => {
  const className = classOverwrite
    ? passedClassName
    : clsx(baseClassName, passedClassName);

  return <input {...props} className={className} value={val} />;
};

export default Input;