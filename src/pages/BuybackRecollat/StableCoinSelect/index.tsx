import { useCallback, useMemo } from 'react';
import { Coin } from '@/constants/coin';
import StableCoinOption from '../StableCoinOption';
import { useSwapState } from '@/providers/StateProvider';

interface Props {
  options: Coin[];
}
const StableCoinSelect: React.FC<Props> = ({ options }) => {
  const { collateralCoin, setCollateralCoin } = useSwapState();

  const onCoinClick = useCallback(
    (coin: Coin) => {
      setCollateralCoin(coin);
    },
    [setCollateralCoin],
  );

  const onClickFns: OnClickFn[] = useMemo(() => {
    return options.map((coin) => {
      return () => {
        onCoinClick(coin);
      };
    });
  }, [onCoinClick, options]);

  return (
    <div className="w-full flex flex-row flex-wrap justify-start">
      {options.map((coin, i) => (
        <StableCoinOption
          coin={coin}
          key={coin}
          onClick={onClickFns[i]}
          selected={collateralCoin === coin}
        />
      ))}
    </div>
  );
};

export default StableCoinSelect;
