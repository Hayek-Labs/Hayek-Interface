import { Coin } from '@/constants/coin';
import clsx from 'clsx';
import CoinSelect from '../CoinSelect';

const CoinDisplay: React.FC<{
  coin: Coin;
  select?: {
    selectFrom: Coin[];
    setCoin?: SetState<Coin>;
    canSelect: boolean;
  };
}> = ({ coin, select }) => {
  const options: Coin[] = select ? select.selectFrom : [coin];

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
    value: string;
    setValue: SetState<string>;
    canInput: boolean;
  };
  select?: {
    selectFrom: Coin[];
    setCoin?: SetState<Coin>;
    canSelect: boolean;
  };
  size?: 'md' | 'lg';
}> = ({ coin, input: { value, setValue, canInput }, size = 'lg', select }) => {
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
          value={value}
          type="number"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!canInput}
        />
      </div>
      <div className="h-1" />
      <div className="flex flex-row items-center text-hblack-4">
        <span>Balance</span>
        <span className="ml-auto">$0.00</span>
      </div>
    </div>
  );
};

export default CoinCard;
