import ReactSelect, { StylesConfig } from 'react-select';
import chroma from 'chroma-js';

export interface SelectOption<T> {
  readonly value: T;
  readonly label: string;
}

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const rgb = 'rgb(0, 0, 255)';
const selectStyles: StylesConfig<SelectOption<unknown>> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const color = chroma(rgb);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? rgb
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : rgb,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? rgb
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  singleValue: (styles) => ({ ...styles, ...dot(rgb) }),
};

interface SelectProps<T> {
  options: SelectOption<T>[];
}

const Select: React.FC<SelectProps<unknown>> = ({ options }) => (
  <ReactSelect options={options} className="text-black" styles={selectStyles} />
);

export default Select;
