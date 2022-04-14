import {
  supportedForiegnStableCoins,
  supportedNativeStableCoins,
} from '@/pages/BuybackRecollat';
import { useMintOrRedeemState } from '@/providers/StateProvider';
import CoinCard from '../CoinCard';

export const HASCoinCard: React.FC<{
  isMint: boolean;
}> = () => {
  const { HASCoinValue, setHASCoinValue, setIndependentCoin } =
    useMintOrRedeemState();
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
        setCoin: setForeignStableCoin,
        canSelect: true,
      }}
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
        setCoin: setNativeStableCoin,
        canSelect: true,
      }}
    />
  );
};
