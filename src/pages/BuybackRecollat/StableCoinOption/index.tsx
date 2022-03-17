import { Coin } from '@/constants/coin';
import clsx from 'clsx';

const StableCoinOption: React.FC<{
  coin: Coin;
  onClick: OnClickFn;
  selected: boolean;
}> = ({ coin, onClick, selected }) => {
  return (
    <div
      className={clsx(
        'rounded-lg px-4 py-2 text-xs border-2 border-solid cursor-pointer m-1',
        selected ? 'border-slate-50' : 'border-transparent',
        selected ? 'text-white' : '',
      )}
      onClick={onClick}
    >
      {coin}
    </div>
  );
};

export default StableCoinOption;
