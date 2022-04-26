import { ForeignStableCoin, NativeStableCoin } from '@/constants/coin';
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
}
