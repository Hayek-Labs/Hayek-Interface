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

  const [nativeStableCoinPool, setNativeStableCoinPool] =
    useState<NativeStableCoin>('USDH');

  return {
    mode,
    setMode,
    needsCollateral,
    setNeedsCollateral,
    HASCoinValue,
    setHASCoinValue,
    collateralCoin,
    setCollateralCoin,
    collateralCoinValue,
    setCollateralCoinValue,
    nativeStableCoinPool,
    setNativeStableCoinPool,
  };
};

export interface SwapState {
  mode: SwapMode;
  setMode: SetState<SwapMode>;
  needsCollateral: boolean;
  setNeedsCollateral: SetState<boolean>;
  HASCoinValue: BigNumber;
  setHASCoinValue: SetState<BigNumber>;
  collateralCoin: ForeignStableCoin;
  setCollateralCoin: SetState<ForeignStableCoin>;
  collateralCoinValue: BigNumber;
  setCollateralCoinValue: SetState<BigNumber>;
  nativeStableCoinPool: NativeStableCoin;
  setNativeStableCoinPool: SetState<NativeStableCoin>;
}
