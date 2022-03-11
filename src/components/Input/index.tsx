import clsx from 'clsx';
import { ChangeEventHandler, useCallback } from 'react';

export type NumberInputOnChangeGenerator = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: SetState<number>,
) => void;

export const useNumberInputOnChangeGenerator = () => {
  return useCallback<NumberInputOnChangeGenerator>((e, setState) => {
    const value = e.target.value;
    const numValue = Number(value);
    if (!isNaN(numValue) && isFinite(numValue)) {
      setState(numValue);
    }
  }, []);
};

export const useDefaultNumberInputOnChange = (
  onChangeGen: NumberInputOnChangeGenerator,
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

export const baseClassName = 'px-2 py-1 text-black rounded-lg';

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
