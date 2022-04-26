import CoinCard from '@/components/CoinCard';
import { Coin } from '@/constants/coin';
import { useBalance } from '@/hooks/useBalance';
import { useSwapState } from '@/providers/StateProvider';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { MdArrowDownward } from 'react-icons/md';
import { CgArrowsExchangeAltV } from 'react-icons/cg';

const SwapCoinDisplay: React.FC<{
  stableCoinOptions: readonly Coin[];
}> = ({ stableCoinOptions }) => {
  const {
    mode,

    independentCoin,
    setIndependentCoin,

    crossSellHAS,
    setCrossSellHAS,

    collateralCoin,
    setCollateralCoin,

    collateralCoinValue,
    setCollateralCoinValue,

    nativeStableCoin,
    nativeStableCoinValue,

    setNativeStableCoinValue,

    HASCoinValue,
    setHASCoinValue,
  } = useSwapState();

  const [coinToSell, coinToBuy]: Coin[] =
    mode === 'recollat'
      ? [collateralCoin, 'HAS'] // recollateralize
      : mode === 'decollat'
      ? ['HAS', collateralCoin] // buyback
      : crossSellHAS
      ? ['HAS', nativeStableCoin]
      : [nativeStableCoin, 'HAS'];

  const collateralBalance = useBalance(collateralCoin);
  const HASBalance = new BigNumber(0);
  const nativeStableCoinBalance = new BigNumber(0);

  const collateralStableCoinState: [
    BigNumber,
    SetState<BigNumber>,
    BigNumber | undefined,
  ] = [collateralCoinValue, setCollateralCoinValue, collateralBalance];

  const nativeStableCoinState: [
    BigNumber,
    SetState<BigNumber>,
    BigNumber | undefined,
  ] = [
    nativeStableCoinValue,
    setNativeStableCoinValue,
    nativeStableCoinBalance,
  ];

  const HASCoinState: [BigNumber, SetState<BigNumber>, BigNumber | undefined] =
    [HASCoinValue, setHASCoinValue, HASBalance];

  const [
    coinToSellValue,
    setCoinToSellValue,
    coinToSellBalance,
    coinToBuyValue,
    setCoinToBuyValue,
    coinToBuyBalance,
  ] =
    mode === 'recollat'
      ? [...collateralStableCoinState, ...HASCoinState]
      : mode === 'decollat'
      ? [...HASCoinState, ...collateralStableCoinState]
      : crossSellHAS
      ? [...HASCoinState, ...nativeStableCoinState]
      : [...nativeStableCoinState, ...HASCoinState];

  const collateralSelect = {
    selectFrom: stableCoinOptions,
    setCoin: setCollateralCoin as SetState<Coin>,
    canSelect: true,
  };

  const nativeSelect = {
    selectFrom: [nativeStableCoin],
    canSelect: false,
  };

  const HASSelect = {
    selectFrom: ['HAS'] as Coin[],
    canSelect: false,
  };

  const [coinToSellSelect, coinToBuySelect] =
    mode === 'recollat'
      ? [collateralSelect, HASSelect]
      : mode === 'decollat'
      ? [HASSelect, collateralSelect]
      : crossSellHAS
      ? [HASSelect, nativeSelect]
      : [nativeSelect, HASSelect];

  const [sellCoinPerBuyCoin, setSellCoinPerBuyCoin] = useState(2);

  useEffect(() => {
    setSellCoinPerBuyCoin((prev) => 1 / prev);
  }, [crossSellHAS]);

  useEffect(() => {
    if (independentCoin === 'buy') {
      setCoinToSellValue(coinToBuyValue.times(sellCoinPerBuyCoin));
    }
  }, [coinToBuyValue, independentCoin, sellCoinPerBuyCoin, setCoinToSellValue]);

  useEffect(() => {
    if (independentCoin === 'sell') {
      setCoinToBuyValue(coinToSellValue.div(sellCoinPerBuyCoin));
    }
  }, [coinToSellValue, independentCoin, sellCoinPerBuyCoin, setCoinToBuyValue]);

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center">
      <CoinCard
        coin={coinToSell}
        input={{
          value: coinToSellValue,
          setValue: setCoinToSellValue,
          onChange: () => {
            setIndependentCoin('sell');
          },
          canInput: true,
        }}
        select={coinToSellSelect}
        balance={coinToSellBalance}
      />
      {mode === 'cross' ? (
        <CgArrowsExchangeAltV
          size={30}
          className="my-4 cursor-pointer"
          onClick={() => {
            setCrossSellHAS((prev) => !prev);
          }}
        />
      ) : (
        <MdArrowDownward size={30} className="my-4" />
      )}

      <CoinCard
        coin={coinToBuy}
        input={{
          value: coinToBuyValue,
          setValue: setCoinToBuyValue,
          onChange: () => {
            setIndependentCoin('buy');
          },
          canInput: true,
        }}
        select={coinToBuySelect}
        balance={coinToBuyBalance}
      />
      <div className="h-4" />
    </div>
  );
};

export default SwapCoinDisplay;
