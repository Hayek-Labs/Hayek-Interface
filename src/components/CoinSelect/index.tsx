import { Coin, coinToLogo } from '@/constants/coin';
import ReactSelect, {
  components,
  DropdownIndicatorProps,
  OptionProps,
  SingleValueProps,
} from 'react-select';
import styles from './styles.less';
import { ReactComponent as Dropdown } from '@/assets/icons/dropdown.svg';

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<CoinOption, false>) => {
  const Logo = coinToLogo[props.data.value];
  const size = 30;
  return (
    <components.SingleValue {...props} isMulti={false}>
      <div className="flex flex-row items-center">
        <Logo width={size} height={size} className="mr-2" />
        {children}
      </div>
    </components.SingleValue>
  );
};

const Option = ({ children, ...props }: OptionProps<CoinOption, false>) => {
  const Logo = coinToLogo[props.data.value];
  const size = 30;
  return (
    <components.Option {...props} isMulti={false}>
      <div className="flex flex-row items-center">
        <Logo width={size} height={size} className="mr-2" />
        {children}
      </div>
    </components.Option>
  );
};

const DropdownIndicator = ({
  ...props
}: DropdownIndicatorProps<CoinOption, false>) => {
  return (
    <components.DropdownIndicator {...props} isMulti={false}>
      <Dropdown className="w-4 h-4 stroke-hblack-4" />
    </components.DropdownIndicator>
  );
};

export interface CoinOption {
  readonly value: Coin;
}

interface Props {
  options: Coin[];
  value: Coin;
  setValue?: (val: CoinOption) => void;
  canSelect?: boolean;
}

const coinToObject = (value: Coin): { value: Coin } => ({ value });

const CoinSelect: React.FC<Props> = ({
  options,
  value,
  setValue,
  canSelect = true,
}) => {
  return (
    <div className={styles['select-wrapper']}>
      <ReactSelect
        options={options.map((coin) => coinToObject(coin))}
        className="text-black"
        classNamePrefix="custom-select"
        defaultValue={coinToObject(value)}
        value={coinToObject(value)}
        isSearchable={false}
        isMulti={false}
        isDisabled={!canSelect}
        getOptionLabel={({ value }) => value}
        components={{
          SingleValue,
          Option,
          IndicatorSeparator: () => null,
          DropdownIndicator: canSelect ? DropdownIndicator : () => null,
        }}
        onChange={(newValue) => {
          if (newValue && setValue) {
            setValue(newValue);
          }
        }}
      />
    </div>
  );
};

export default CoinSelect;
