import { ForeignStableCoin, NativeStableCoin, Coin } from '@/constants/coin';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { useSwapState } from '@/providers/StateProvider';
import { useBalance } from '@/hooks/useBalance';

export type SwapMode = 'recollat' | 'decollat' | 'cross';

export const useCreateSwapState = (): SwapState => {
  const [needsCollateral, setNeedsCollateral] = useState(false);
  const [mode, setMode] = useState<SwapMode>(
    needsCollateral ? 'recollat' : 'decollat',
  );

  const [HASCoinValue, setHASCoinValue] = useState(new BigNumber(0));

  const [collateralCoin, setCollateralCoin] =
    useState<ForeignStableCoin>('USDT');
  const [collateralCoinValue, setCollateralCoinValue] = useState(
    new BigNumber(0),
  );

  const [nativeStableCoin, setNativeStableCoin] =
    useState<NativeStableCoin>('USDH');
  const [nativeStableCoinValue, setNativeStableCoinValue] = useState(
    new BigNumber(0),
  );

  const [independentCoin, setIndependentCoin] = useState<'buy' | 'sell'>(
    'sell',
  );

  const [crossSellHAS, setCrossSellHAS] = useState(false);

  const [swapCoin0, setSwapCoin0] = useState<Coin>('BTC');
  const [swapCoinValue0, setSwapCoinValue0] = useState(new BigNumber(0));

  const [swapCoin1, setSwapCoin1] = useState<Coin>('USDH');
  const [swapCoinValue1, setSwapCoinValue1] = useState(new BigNumber(0));

  return {
    mode,
    setMode,
    independentCoin,
    setIndependentCoin,
    crossSellHAS,
    setCrossSellHAS,
    needsCollateral,
    setNeedsCollateral,
    HASCoinValue,
    setHASCoinValue,
    collateralCoin,
    setCollateralCoin,
    collateralCoinValue,
    setCollateralCoinValue,
    nativeStableCoin,
    setNativeStableCoin,
    nativeStableCoinValue,
    setNativeStableCoinValue,
    swapCoin0,
    setSwapCoin0,
    swapCoinValue0,
    setSwapCoinValue0,
    swapCoin1,
    setSwapCoin1,
    swapCoinValue1,
    setSwapCoinValue1,
  };
};

export const useCollateralStableCoinState = () => {
  const { collateralCoin, collateralCoinValue, setCollateralCoinValue } =
    useSwapState();

  const collateralBalance = useBalance(collateralCoin);

  return [collateralCoinValue, setCollateralCoinValue, collateralBalance] as [
    BigNumber,
    SetState<BigNumber>,
    BigNumber | undefined,
  ];
};

export const useNativeStableCoinState = () => {
  const { nativeStableCoinValue, setNativeStableCoinValue } = useSwapState();

  const nativeStableCoinBalance = new BigNumber(0);

  return [
    nativeStableCoinValue,
    setNativeStableCoinValue,
    nativeStableCoinBalance,
  ] as [BigNumber, SetState<BigNumber>, BigNumber | undefined];
};

export const useHASCoinState = () => {
  const { HASCoinValue, setHASCoinValue } = useSwapState();

  const HASBalance = new BigNumber(0);

  return [HASCoinValue, setHASCoinValue, HASBalance] as [
    BigNumber,
    SetState<BigNumber>,
    BigNumber | undefined,
  ];
};

export interface SwapState {
  mode: SwapMode;
  setMode: SetState<SwapMode>;

  independentCoin: 'buy' | 'sell';
  setIndependentCoin: SetState<'buy' | 'sell'>;

  crossSellHAS: boolean;
  setCrossSellHAS: SetState<boolean>;

  needsCollateral: boolean;
  setNeedsCollateral: SetState<boolean>;

  HASCoinValue: BigNumber;
  setHASCoinValue: SetState<BigNumber>;

  collateralCoin: ForeignStableCoin;
  setCollateralCoin: SetState<ForeignStableCoin>;
  collateralCoinValue: BigNumber;
  setCollateralCoinValue: SetState<BigNumber>;

  nativeStableCoin: NativeStableCoin;
  setNativeStableCoin: SetState<NativeStableCoin>;
  nativeStableCoinValue: BigNumber;
  setNativeStableCoinValue: SetState<BigNumber>;

  swapCoin0: Coin;
  setSwapCoin0: SetState<Coin>;
  swapCoinValue0: BigNumber;
  setSwapCoinValue0: SetState<BigNumber>;

  swapCoin1: Coin;
  setSwapCoin1: SetState<Coin>;
  swapCoinValue1: BigNumber;
  setSwapCoinValue1: SetState<BigNumber>;
}
