import { Coin } from '@/constants/coin';
import { useState } from 'react';

export const useCreateSwapState = (): SwapState => {
  const [needsCollateral, setNeedsCollateral] = useState(true);

  const [HASCoinValue, setHASCoinValue] = useState('0');

  const [nativeStableCoin, setNativeStableCoin] = useState<Coin>('USDH');
  const [nativeStableCoinValue, setNativeStableCoinValue] = useState('0');

  return {
    needsCollateral,
    setNeedsCollateral,
    HASCoinValue,
    setHASCoinValue,
    nativeStableCoin,
    setNativeStableCoin,
    nativeStableCoinValue,
    setNativeStableCoinValue,
  };
};

export interface SwapState {
  needsCollateral: boolean;
  setNeedsCollateral: SetState<boolean>;
  HASCoinValue: string;
  setHASCoinValue: SetState<string>;
  nativeStableCoin: Coin;
  setNativeStableCoin: SetState<Coin>;
  nativeStableCoinValue: string;
  setNativeStableCoinValue: SetState<string>;
}
