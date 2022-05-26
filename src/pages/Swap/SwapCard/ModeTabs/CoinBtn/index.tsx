import CoinNameIcon from '@/components/CoinNameIcon';
import { NativeStableCoin } from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import clsx from 'clsx';
import { CRState } from '../..';

const CoinBtn: React.FC<{
  coin: NativeStableCoin;
  selected: boolean;
  state?: CRState | 'none';
}> = ({ coin, state = 'none', selected }) => {
  const { setNativeStableCoin } = useSwapState();

  return (
    <div
      className={clsx(
        'select-none mr-2',
        state === 'balanced' ? 'cursor-not-allowed' : 'cursor-pointer',
        selected ? 'selected' : '',
      )}
      onClick={
        state !== 'balanced'
          ? () => {
              setNativeStableCoin(coin);
            }
          : undefined
      }
    >
      <CoinNameIcon
        className={clsx(
          'flex flex-row items-center text-base',
          state === 'none' ? '' : state,
        )}
        coin={coin}
      />
    </div>
  );
};

export default CoinBtn;
