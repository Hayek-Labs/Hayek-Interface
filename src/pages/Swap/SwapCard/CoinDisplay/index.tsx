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
          className="my-4 cursor-pointer text-hblack-4 fill-hblack-4"
          onClick={() => {
            setCrossSellHAS((prev) => !prev);
          }}
        />
      ) : (
        // <BsArrowDown size={30} className="my-4 text-hblack-4 fill-hblack-4" />
        <svg
          className="self-center my-2 fill-hblack-4"
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="arrow-down"
          width="1.5em"
          height="1.5em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path>
        </svg>
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
