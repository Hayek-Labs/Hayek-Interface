import { useCallback, useMemo } from 'react';
import { Coin } from '@/constants/coin';
import { supportedStableCoins } from '..';
import StableCoinOption from '../StableCoinOption';

const StableCoinSelect: React.FC<{
  stableCoin: Coin;
  setStableCoin: SetState<Coin>;
}> = ({ stableCoin, setStableCoin }) => {
  const onCoinClick = useCallback(
    (coin: Coin) => {
      setStableCoin(coin);
    },
    [setStableCoin],
  );

  const onClickFns: OnClickFn[] = useMemo(() => {
    return supportedStableCoins.map((coin) => {
      return () => {
        onCoinClick(coin);
      };
    });
  }, [onCoinClick]);

  return (
    <div className="w-full flex flex-row flex-wrap justify-start">
      {supportedStableCoins.map((coin, i) => (
        <StableCoinOption
          coin={coin}
          key={coin}
          onClick={onClickFns[i]}
          selected={stableCoin === coin}
        />
      ))}
    </div>
  );
};

export default StableCoinSelect;
