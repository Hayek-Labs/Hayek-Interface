import CoinCard from '@/components/CoinCard';
import { Coin, supportedNativeStableCoins } from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import { useEffect, useState } from 'react';
import { MdArrowDownward } from 'react-icons/md';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import {
  useCollateralStableCoinState,
  useHASCoinState,
  useNativeStableCoinState,
} from '@/state/swap';
import BigNumber from 'bignumber.js';
import { BsArrowDown } from 'react-icons/bs';

const useMapCoinPrice = (
  independentCoin: 'buy' | 'sell',
  sellCoinPerBuyCoin: BigNumber,
  coinToSellValue: BigNumber,
  setCoinToSellValue: SetState<BigNumber>,
  coinToBuyValue: BigNumber,
  setCoinToBuyValue: SetState<BigNumber>,
) => {
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
};

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

    nativeStableCoin,
    setNativeStableCoin,

    needsCollateral,
  } = useSwapState();

  const [coinToSell, coinToBuy]: Coin[] =
    mode === 'recollat'
      ? [collateralCoin, 'HAS'] // recollateralize
      : mode === 'decollat'
      ? ['HAS', collateralCoin] // buyback
      : crossSellHAS
      ? ['HAS', nativeStableCoin]
      : [nativeStableCoin, 'HAS'];

  const collateralStableCoinState = useCollateralStableCoinState();
  const nativeStableCoinState = useNativeStableCoinState();
  const HASCoinState = useHASCoinState();

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
    selectFrom: supportedNativeStableCoins,
    setCoin: setNativeStableCoin as SetState<Coin>,
    canSelect: true,
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

  const [sellCoinPerBuyCoin, setSellCoinPerBuyCoin] = useState(
    new BigNumber(2),
  );

  useEffect(() => {
    setSellCoinPerBuyCoin((prev) => new BigNumber(1).div(prev));
  }, [crossSellHAS, needsCollateral]);

  useMapCoinPrice(
    independentCoin,
    sellCoinPerBuyCoin,
    coinToSellValue,
    setCoinToSellValue,
    coinToBuyValue,
    setCoinToBuyValue,
  );

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
          className="my-4 cursor-pointer fill-hblack-4"
          onClick={() => {
            setCrossSellHAS((prev) => !prev);
          }}
        />
      ) : (
        <BsArrowDown size={30} className="my-4 fill-hblack-4" />
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
