import { coinToLogo, NativeStableCoin } from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import clsx from 'clsx';
import { CRState } from '../..';

const iconSize = 20;
const CoinBtn: React.FC<{
  coin: NativeStableCoin;
  selected: boolean;
  state?: CRState | 'none';
}> = ({ coin, state = 'none', selected }) => {
  const { setNativeStableCoin } = useSwapState();
  const Logo = coinToLogo[coin];

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
      <div
        className={clsx(
          'flex flex-row items-center text-base',
          state === 'none' ? '' : state,
        )}
      >
        <Logo width={iconSize} height={iconSize} className="mr-1" />
        <span>{coin}</span>
      </div>
    </div>
  );
};

export default CoinBtn;
