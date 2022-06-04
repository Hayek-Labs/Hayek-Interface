import {
  supportedForiegnStableCoins,
  supportedNativeStableCoins,
} from '@/constants/coin';
import { useBalance } from '@/hooks/useBalance';
import { useMintOrRedeemState } from '@/providers/StateProvider';
import BigNumber from 'bignumber.js';
import CoinCard from '../CoinCard';

export const HASCoinCard: React.FC<{
  isMint: boolean;
}> = () => {
  const { HASCoinValue, setHASCoinValue, setIndependentCoin } =
    useMintOrRedeemState();

  // const balance = useBalance('HAS');
  const balance = new BigNumber(0);

  return (
    <CoinCard
      coin="HAS"
      input={{
        value: HASCoinValue,
        setValue: setHASCoinValue,
        onChange: () => {
          setIndependentCoin('has');
        },
        canInput: true,
      }}
      select={{
        selectFrom: ['HAS'],
        canSelect: false,
      }}
      size="md"
      balance={balance}
    />
  );
};

export const ForeignStableCoinCard: React.FC<{
  isMint: boolean;
}> = () => {
  const {
    foreignStableCoin,
    setForeignStableCoin,
    foreignStableCoinValue,
    setForeignStableCoinValue,
    setIndependentCoin,
  } = useMintOrRedeemState();

  const balance = useBalance(foreignStableCoin);
  // const balance = new BigNumber(0);

  return (
    <CoinCard
      coin={foreignStableCoin}
      input={{
        value: foreignStableCoinValue,
        setValue: setForeignStableCoinValue,
        onChange: () => {
          setIndependentCoin('foreign');
        },
        canInput: true,
      }}
      size="md"
      select={{
        selectFrom: supportedForiegnStableCoins,
        // @ts-ignore
        setCoin: setForeignStableCoin,
        canSelect: true,
      }}
      balance={balance}
    />
  );
};

export const NativeStableCoinCard: React.FC<{
  isMint: boolean;
}> = () => {
  const {
    nativeStableCoin,
    setNativeStableCoin,
    nativeStableCoinValue,
    setNativeStableCoinValue,
    setIndependentCoin,
  } = useMintOrRedeemState();

  // const balance = useBalance(nativeStableCoin);
  const balance = new BigNumber(0);

  return (
    <CoinCard
      coin={nativeStableCoin}
      input={{
        value: nativeStableCoinValue,
        setValue: setNativeStableCoinValue,
        onChange: () => {
          setIndependentCoin('native');
        },
        canInput: true,
      }}
      size="lg"
      select={{
        selectFrom: supportedNativeStableCoins,
        // @ts-ignore
        setCoin: setNativeStableCoin,
        canSelect: true,
      }}
      balance={balance}
    />
  );
};
