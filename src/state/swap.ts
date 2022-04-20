import BigNumber from 'bignumber.js';
import { useState } from 'react';

type CollateralCoin = 'USDT' | 'USDC';

export const useCreateSwapState = (): SwapState => {
  const [needsCollateral, setNeedsCollateral] = useState(false);

  const [HASCoinValue, setHASCoinValue] = useState(new BigNumber(0));

  const [collateralCoin, setCollateralCoin] = useState<CollateralCoin>('USDT');
  const [collateralCoinValue, setCollateralCoinValue] = useState(
    new BigNumber(0),
  );

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
  HASCoinValue: BigNumber;
  setHASCoinValue: SetState<BigNumber>;
  collateralCoin: CollateralCoin;
  setCollateralCoin: SetState<CollateralCoin>;
  collateralCoinValue: BigNumber;
  setCollateralCoinValue: SetState<BigNumber>;
}
