import { Coin } from '@/constants/coin';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

export const useCreateMintOrRedeemState = (): MintRedeemState => {
  const [independentCoin, setIndependentCoin] = useState<
    'has' | 'native' | 'foreign'
  >('native');

  const [foreignStableCoin, setForeignStableCoin] = useState<Coin>('USDT');
  const [foreignStableCoinValue, setForeignStableCoinValue] = useState(
    new BigNumber('0'),
  );

  const [HASCoinValue, setHASCoinValue] = useState(new BigNumber('0'));

  const [nativeStableCoin, setNativeStableCoin] = useState<Coin>('USDH');
  const [nativeStableCoinValue, setNativeStableCoinValue] = useState(
    new BigNumber('0'),
  );

  return {
    independentCoin,
    setIndependentCoin,
    foreignStableCoin,
    setForeignStableCoin,
    foreignStableCoinValue,
    setForeignStableCoinValue,
    HASCoinValue,
    setHASCoinValue,
    nativeStableCoin,
    setNativeStableCoin,
    nativeStableCoinValue,
    setNativeStableCoinValue,
  };
};

export interface MintRedeemState {
  independentCoin: 'has' | 'native' | 'foreign';
  setIndependentCoin: SetState<'has' | 'native' | 'foreign'>;
  foreignStableCoin: Coin;
  setForeignStableCoin: SetState<Coin>;
  foreignStableCoinValue: BigNumber;
  setForeignStableCoinValue: SetState<BigNumber>;
  HASCoinValue: BigNumber;
  setHASCoinValue: SetState<BigNumber>;
  nativeStableCoin: Coin;
  setNativeStableCoin: SetState<Coin>;
  nativeStableCoinValue: BigNumber;
  setNativeStableCoinValue: SetState<BigNumber>;
}
