import { Coin } from '@/constants/coin';
import { useState } from 'react';

export const useCreateMintOrRedeemState = (): MintRedeemState => {
  const [foreignStableCoin, setForeignStableCoin] = useState<Coin>('USDC');
  const [foreignStableCoinValue, setForeignStableCoinValue] = useState('0');

  const [HASCoinValue, setHASCoinValue] = useState('0');

  const [nativeStableCoin, setNativeStableCoin] = useState<Coin>('USDH');
  const [nativeStableCoinValue, setNativeStableCoinValue] = useState('0');

  return {
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
  foreignStableCoin: Coin;
  setForeignStableCoin: SetState<Coin>;
  foreignStableCoinValue: string;
  setForeignStableCoinValue: SetState<string>;
  HASCoinValue: string;
  setHASCoinValue: SetState<string>;
  nativeStableCoin: Coin;
  setNativeStableCoin: SetState<Coin>;
  nativeStableCoinValue: string;
  setNativeStableCoinValue: SetState<string>;
}
