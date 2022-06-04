import { Coin, coinToLogo, LP } from '@/constants/coin';
import ReactSelect, {
  components,
  DropdownIndicatorProps,
  OptionProps,
  SingleValueProps,
} from 'react-select';
import styles from './styles.less';
import { ReactComponent as Dropdown } from '@/assets/icons/dropdown.svg';
import PoolIcon from '../PoolIcon';

const renderCoin = (value: Coin | LP) => {
  if (typeof value === 'object') {
    const size = 20;
    const coin1 = value.coin1;
    const coin2 = value.coin2;
    return (
      <div className="mr-3">
        <PoolIcon coin1={coin1} coin2={coin2} size={size} />
      </div>
    );
  } else {
    const size = 30;
    const Logo = coinToLogo[value];
    return <Logo width={size} height={size} className="mr-2" />;
  }
};

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<CoinOption, false>) => {
  return (
    <components.SingleValue {...props} isMulti={false}>
      <div className="flex flex-row items-center">
        {renderCoin(props.data.value)}
        {children}
      </div>
    </components.SingleValue>
  );
};

const Option = ({ children, ...props }: OptionProps<CoinOption, false>) => {
  return (
    <components.Option {...props} isMulti={false}>
      <div className="flex flex-row items-center">
        {renderCoin(props.data.value)}
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
  readonly value: Coin | LP;
}

interface Props {
  options: readonly (Coin | LP)[];
  value: Coin | LP;
  setValue?: (val: CoinOption) => void;
  canSelect?: boolean;
}

const coinToObject = (value: Coin | LP): { value: Coin | LP } => ({
  value,
});

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
        getOptionLabel={({ value }) =>
          typeof value === 'object'
            ? `${value.platform} LP`
            : // ? `${value.coin1}-${value.coin2} LP (${value.platform})`
              value
        }
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
