import { ForeignStableCoin, NativeStableCoin } from '@/constants/coin';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

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
  };
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
}
