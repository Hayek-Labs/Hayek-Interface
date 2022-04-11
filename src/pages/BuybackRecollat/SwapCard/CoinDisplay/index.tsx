import CoinCard from '@/components/CoinCard';
import { Coin } from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import { useEffect } from 'react';
import { MdArrowDownward } from 'react-icons/md';

const SwapCoinDisplay: React.FC<{
  stableCoinOptions: Coin[];
}> = ({ stableCoinOptions }) => {
  const {
    collateralCoin,
    setCollateralCoin,
    needsCollateral,
    collateralCoinValue,
    setCollateralCoinValue,
    HASCoinValue,
    setHASCoinValue,
  } = useSwapState();

  const [coinToSell, coinToBuy]: Coin[] = needsCollateral
    ? [collateralCoin, 'HAS'] // recollateralize
    : ['HAS', collateralCoin]; // buyback

  const collateralStableCoinState: [string, SetState<string>] = [
    collateralCoinValue,
    setCollateralCoinValue,
  ];

  const HASCoinState: [string, SetState<string>] = [
    HASCoinValue,
    setHASCoinValue,
  ];

  const [
    coinToSellValue,
    setCoinToSellValue,
    coinToBuyValue,
    setCoinToBuyValue,
  ] = needsCollateral
    ? [...collateralStableCoinState, ...HASCoinState]
    : [...HASCoinState, ...collateralStableCoinState];

  useEffect(() => {
    const coinToSellNum = Number(coinToSellValue);
    if (!isNaN(coinToSellNum) && isFinite(coinToSellNum)) {
      setCoinToBuyValue((coinToSellNum * 4.212).toFixed(2));
    }
  }, [coinToSellValue, setCoinToBuyValue]);

  const coinToSellSelect = needsCollateral
    ? {
        selectFrom: stableCoinOptions,
        setCoin: setCollateralCoin,
        canSelect: true,
      }
    : undefined;

  const coinToBuySelect = needsCollateral
    ? {
        selectFrom: ['HAS'] as Coin[],
        canSelect: false,
      }
    : undefined;

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center">
      <CoinCard
        coin={coinToSell}
        input={{
          value: coinToSellValue,
          setValue: setCoinToSellValue,
          canInput: true,
        }}
        select={coinToSellSelect}
      />
      <MdArrowDownward size={30} className="my-4" />
      <CoinCard
        coin={coinToBuy}
        input={{
          value: coinToBuyValue,
          setValue: setCoinToBuyValue,
          canInput: false,
        }}
        select={coinToBuySelect}
      />
      <div className="h-4" />
    </div>
  );
};

export default SwapCoinDisplay;
