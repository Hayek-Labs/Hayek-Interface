import { Chain, chainToInfo, chainToLogo } from '@/constants/chains';
import ReactSelect, {
  components,
  DropdownIndicatorProps,
  OptionProps,
  SingleValueProps,
} from 'react-select';
import selectStyles from '../CoinSelect/styles.less';
import specialStyles from './styles.less';
import { ReactComponent as Dropdown } from '@/assets/icons/dropdown.svg';
import { VscDebugDisconnect } from 'react-icons/vsc';
import clsx from 'clsx';
import { useSidebarContext } from '@/pages/Sidebar';

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<ChainOption, false>) => {
  const Logo = props.data.value && chainToLogo[props.data.value];
  const size = 30;
  // const { sidebarExpand } = useSidebarContext();
  const sidebarExpand = true;
  return (
    <components.SingleValue {...props} isMulti={false}>
      <div className="flex flex-row items-center">
        {Logo && <Logo width={size} height={size} />}
        {/* <span className="xl:group-hover:inline ml-2 text-[0px] xl:group-hover:text-lg trans"> */}
        <span
          className={clsx(
            sidebarExpand
              ? 'xl:inline ml-2 text-[0px] xl:text-lg trans'
              : 'ml-2 text-[0px] trans',
          )}
        >
          {children}
        </span>
        {!props.data.value && (
          // <div className="block xl:group-hover:hidden">
          <div className={clsx(sidebarExpand ? 'block xl:hidden' : 'block')}>
            <VscDebugDisconnect size={size} />
          </div>
        )}
      </div>
    </components.SingleValue>
  );
};

const Option = ({ children, ...props }: OptionProps<ChainOption, false>) => {
  const Logo = props.data.value && chainToLogo[props.data.value];
  const size = 30;
  return (
    <components.Option {...props} isMulti={false}>
      <div className="flex flex-row items-center justify-start">
        <div className="mr-4">
          {Logo && (
            <Logo
              className="ml-0 xl:group-hover:mr-2 trans"
              width={size}
              height={size}
            />
          )}
        </div>

        {props.data.value === undefined ? (
          <>
            <VscDebugDisconnect size={size} />
            <div className="xl:group-hover:block ml-0 xl:group-hover:ml-2 trans" />
            <div className="min-h-[30px] flex flex-row items-center">
              <span className="text-ellipsis w-full text xl:group-hover:text-base xl:group-hover:inline trans">
                Disconnect
              </span>
            </div>
          </>
        ) : (
          <span className="text xl:group-hover:text-base xl:group-hover:inline trans">
            {children}
          </span>
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
  const { sidebarExpand } = useSidebarContext();
  console.log('sidebarExpand', sidebarExpand);
  return (
    <div
      className={clsx(
        selectStyles['select-wrapper'],
        specialStyles['select-wrapper'],
        // 'bg-hblack-3 rounded-xl py-2 w-full h-full flex items-center justify-start sm:justify-center xl:group-hover:justify-start px-3 sm:px-0 xl:group-hover:px-3 hover:cursor-pointer',
        'bg-hblack-3 rounded-xl py-2 w-full h-full flex items-center justify-start sm:justify-center px-3 sm:px-0 hover:cursor-pointer',
        'xl:justify-start xl:px-3',
        // sidebarExpand ? 'xl:justify-start xl:px-3' : '',
      )}
    >
      <ReactSelect
        options={options.map((chain) => chainToObject(chain))}
        className="text-black w-full"
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
