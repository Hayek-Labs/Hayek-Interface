import { Coin } from '@/constants/coin';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import CoinSelect from '../CoinSelect';

const CoinDisplay: React.FC<{
  coin: Coin;
  select?: {
    selectFrom: readonly Coin[];
    setCoin?: SetState<Coin>;
    canSelect: boolean;
  };
}> = ({ coin, select }) => {
  const options: readonly Coin[] = select ? select.selectFrom : [coin];

  return (
    <div className="flex flex-col">
      <CoinSelect
        options={options}
        value={coin}
        canSelect={select?.canSelect}
        setValue={
          select &&
          ((val) => {
            if (select.setCoin) {
              select.setCoin(val.value);
            }
          })
        }
      />
    </div>
  );
};

const CoinCard: React.FC<{
  coin: Coin;
  input: {
    value: BigNumber;
    setValue: SetState<BigNumber>;
    onChange?: (value: BigNumber) => void;
    canInput: boolean;
  };
  select?: {
    selectFrom: readonly Coin[];
    setCoin?: SetState<Coin>;
    canSelect: boolean;
  };
  size?: 'md' | 'lg';
  balance: BigNumber | undefined;
}> = ({
  coin,
  input: { value, setValue, onChange, canInput },
  size = 'lg',
  select,
  balance,
}) => {
  const { isActive, account } = useWeb3React();
  const balanceIsVisible = isActive && !!account;
  return (
    <div
      className={clsx(
        'rounded-lg w-full bg-hblack-1 flex flex-col justify-start px-4',
        size === 'lg' ? 'py-3' : 'py-1',
      )}
    >
      <div className="flex flex-row items-center">
        <CoinDisplay coin={coin} select={select} />
        <input
          className="ml-1 lg:ml-4 bg-transparent outline-none text-right w-12 lg:w-20 text-lg flex-1"
          value={value.toString()}
          type="number"
          onChange={(e) => {
            const number = new BigNumber(e.target.value);
            onChange && onChange(number);
            setValue(number);
          }}
          disabled={!canInput}
        />
      </div>
      <div className="h-1" />
      <div
        className={clsx(
          'flex flex-row items-center text-hblack-4',
          balanceIsVisible ? '' : 'opacity-0',
        )}
      >
        <span>Balance</span>
        <span className="ml-auto">
          {balance ? balance.toFixed(2) : 'Fetching...'}
        </span>
      </div>
    </div>
  );
};

export default CoinCard;
