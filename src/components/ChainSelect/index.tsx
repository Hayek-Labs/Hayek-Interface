import { Chain, chainToInfo, chainToLogo } from '@/constants/chains';
import ReactSelect, {
  components,
  DropdownIndicatorProps,
  OptionProps,
  SingleValueProps,
} from 'react-select';
import styles from '../CoinSelect/styles.less';
import { ReactComponent as Dropdown } from '@/assets/icons/dropdown.svg';
import clsx from 'clsx';

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<ChainOption, false>) => {
  const Logo = props.data.value && chainToLogo[props.data.value];
  const size = 30;
  return (
    <components.SingleValue {...props} isMulti={false}>
      <div className="flex flex-row items-center">
        {Logo && <Logo width={size} height={size} className="mr-2" />}
        {children}
      </div>
    </components.SingleValue>
  );
};

const Option = ({ children, ...props }: OptionProps<ChainOption, false>) => {
  const Logo = props.data.value && chainToLogo[props.data.value];
  const size = 30;
  return (
    <components.Option {...props} isMulti={false}>
      <div className="flex flex-row items-center">
        {Logo && <Logo width={size} height={size} className="mr-2" />}
        {props.data.value === undefined ? (
          <div className="min-h-[30px] flex flex-row items-center">
            <span>Disconnect</span>
          </div>
        ) : (
          children
        )}
      </div>
    </components.Option>
  );
};

const DropdownIndicator = ({
  ...props
}: DropdownIndicatorProps<ChainOption, false>) => {
  return (
    <components.DropdownIndicator {...props} isMulti={false}>
      <Dropdown className="w-4 h-4 stroke-hblack-4" />
    </components.DropdownIndicator>
  );
};

export interface ChainOption {
  readonly value: Chain | undefined;
}

interface Props {
  options: (Chain | undefined)[];
  value?: Chain;
  setValue?: (val: ChainOption) => void;
  canSelect?: boolean;
}

const chainToObject = (
  value: Chain | undefined,
): { value: Chain | undefined } => ({ value });

const ChainSelect: React.FC<Props> = ({
  options,
  value,
  setValue,
  canSelect = true,
}) => {
  return (
    <div className={clsx(styles['select-wrapper'], 'w-full')}>
      <ReactSelect
        options={options.map((chain) => chainToObject(chain))}
        className="text-black"
        classNamePrefix="custom-select"
        defaultValue={chainToObject(value)}
        value={chainToObject(value)}
        isSearchable={false}
        isMulti={false}
        isDisabled={!canSelect}
        getOptionLabel={({ value }) =>
          value ? chainToInfo[value].name : 'Connect Wallet'
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

export default ChainSelect;
