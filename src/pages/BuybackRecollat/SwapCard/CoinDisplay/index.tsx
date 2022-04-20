import CoinCard from '@/components/CoinCard';
import { Coin } from '@/constants/coin';
import { useBalance } from '@/hooks/useBalance';
import { useSwapState } from '@/providers/StateProvider';
import BigNumber from 'bignumber.js';
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

  // const HASBalance = useBalance('HAS');
  const collateralBalance = useBalance(collateralCoin);
  const HASBalance = new BigNumber(0);

  const collateralStableCoinState: [
    BigNumber,
    SetState<BigNumber>,
    BigNumber | undefined,
  ] = [collateralCoinValue, setCollateralCoinValue, collateralBalance];

  const HASCoinState: [BigNumber, SetState<BigNumber>, BigNumber | undefined] =
    [HASCoinValue, setHASCoinValue, HASBalance];

  const [
    coinToSellValue,
    setCoinToSellValue,
    coinToSellBalance,
    coinToBuyValue,
    setCoinToBuyValue,
    coinToBuyBalance,
  ] = needsCollateral
    ? [...collateralStableCoinState, ...HASCoinState]
    : [...HASCoinState, ...collateralStableCoinState];

  useEffect(() => {
    setCoinToBuyValue(coinToSellValue.times(4.212));
  }, [coinToSellValue, setCoinToBuyValue]);

  const collateralSelect = {
    selectFrom: stableCoinOptions,
    setCoin: setCollateralCoin as SetState<Coin>,
    canSelect: true,
  };

  const HASSelect = {
    selectFrom: ['HAS'] as Coin[],
    canSelect: false,
  };
  const [coinToSellSelect, coinToBuySelect] = needsCollateral
    ? [collateralSelect, HASSelect]
    : [HASSelect, collateralSelect];

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
        balance={coinToSellBalance}
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
        balance={coinToBuyBalance}
      />
      <div className="h-4" />
    </div>
  );
};

export default SwapCoinDisplay;
