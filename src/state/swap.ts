import { Coin } from '@/constants/coin';
import { useState } from 'react';

export const useCreateSwapState = (): SwapState => {
  const [needsCollateral, setNeedsCollateral] = useState(true);

  const [HASCoinValue, setHASCoinValue] = useState('0');

  const [collateralCoin, setCollateralCoin] = useState<Coin>('USDT');
  const [collateralCoinValue, setCollateralCoinValue] = useState('0');

  return {
    needsCollateral,
    setNeedsCollateral,
    HASCoinValue,
    setHASCoinValue,
    collateralCoin,
    setCollateralCoin,
    collateralCoinValue,
    setCollateralCoinValue,
  };
};

export interface SwapState {
  needsCollateral: boolean;
  setNeedsCollateral: SetState<boolean>;
  HASCoinValue: string;
  setHASCoinValue: SetState<string>;
  collateralCoin: Coin;
  setCollateralCoin: SetState<Coin>;
  collateralCoinValue: string;
  setCollateralCoinValue: SetState<string>;
}
