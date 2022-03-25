import { useCallback, useMemo } from 'react';
import { Coin } from '@/constants/coin';
import { supportedNativeStableCoins } from '..';
import StableCoinOption from '../StableCoinOption';
import { useSwapState } from '@/providers/StateProvider';

const StableCoinSelect: React.FC = () => {
  const { nativeStableCoin, setNativeStableCoin } = useSwapState();

  const onCoinClick = useCallback(
    (coin: Coin) => {
      setNativeStableCoin(coin);
    },
    [setNativeStableCoin],
  );

  const onClickFns: OnClickFn[] = useMemo(() => {
    return supportedNativeStableCoins.map((coin) => {
      return () => {
        onCoinClick(coin);
      };
    });
  }, [onCoinClick]);

  return (
    <div className="w-full flex flex-row flex-wrap justify-start">
      {supportedNativeStableCoins.map((coin, i) => (
        <StableCoinOption
          coin={coin}
          key={coin}
          onClick={onClickFns[i]}
          selected={nativeStableCoin === coin}
        />
      ))}
    </div>
  );
};

export default StableCoinSelect;
