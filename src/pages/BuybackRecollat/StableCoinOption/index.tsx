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
        'rounded-lg px-2 py-1 text-[0.65rem] lg:px-4 lg:py-2 lg:text-xs border-2 border-solid cursor-pointer m-1',
        selected ? 'border-hblack-4' : 'border-transparent',
        selected ? 'text-white' : '',
      )}
      onClick={onClick}
    >
      {coin}
    </div>
  );
};

export default StableCoinOption;
