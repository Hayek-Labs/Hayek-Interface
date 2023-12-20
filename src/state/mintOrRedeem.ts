import { Coin } from '@/constants/coin';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

export const useCreateMintOrRedeemState = (): MintRedeemState => {
  const [independentCoin, setIndependentCoin] = useState<
    'has' | 'native' | 'foreign' | 'coin0' | 'coin1'
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

  const [coin0, setCoin0] = useState<Coin>('BTC');
  const [coin0Value, setCoin0Value] = useState(new BigNumber('0'));

  const [coin1, setCoin1] = useState<Coin>('BTC');
  const [coin1Value, setCoin1Value] = useState(new BigNumber('0'));

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
    coin0,
    setCoin0,
    coin0Value,
    setCoin0Value,
    coin1,
    setCoin1,
    coin1Value,
    setCoin1Value,
  };
};

export interface MintRedeemState {
  independentCoin: 'has' | 'native' | 'foreign' | 'coin0' | 'coin1';
  setIndependentCoin: SetState<
    'has' | 'native' | 'foreign' | 'coin0' | 'coin1'
  >;
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
  coin0: Coin;
  setCoin0: SetState<Coin>;
  coin0Value: BigNumber;
  setCoin0Value: SetState<BigNumber>;
  coin1: Coin;
  setCoin1: SetState<Coin>;
  coin1Value: BigNumber;
  setCoin1Value: SetState<BigNumber>;
}
