import CoinCard from '@/components/CoinCard';
import { Coin } from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import { useEffect } from 'react';
import { BsArrowDownCircle } from 'react-icons/bs';

const SwapCoinDisplay: React.FC<{
  stableCoinOptions: Coin[];
}> = ({ stableCoinOptions }) => {
  const {
    nativeStableCoin,
    setNativeStableCoin,
    needsCollateral,
    nativeStableCoinValue,
    setNativeStableCoinValue,
    HASCoinValue,
    setHASCoinValue,
  } = useSwapState();

  const [coinToSell, coinToBuy]: Coin[] = needsCollateral
    ? [nativeStableCoin, 'HAS'] // recollateralize
    : ['HAS', nativeStableCoin]; // buyback

  const nativeStableCoinState: [string, SetState<string>] = [
    nativeStableCoinValue,
    setNativeStableCoinValue,
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
    ? [...nativeStableCoinState, ...HASCoinState]
    : [...HASCoinState, ...nativeStableCoinState];

  useEffect(() => {
    const coinToSellNum = Number(coinToSellValue);
    if (!isNaN(coinToSellNum) && isFinite(coinToSellNum)) {
      setCoinToBuyValue((coinToSellNum * 4.212).toFixed(2));
    }
  }, [coinToSellValue, setCoinToBuyValue]);

  const coinToSellSelect = needsCollateral
    ? {
        selectFrom: stableCoinOptions,
        setCoin: setNativeStableCoin,
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
      <BsArrowDownCircle size={30} className="my-4" />
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
