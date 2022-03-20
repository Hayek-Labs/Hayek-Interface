import {
  supportedForiegnStableCoins,
  supportedNativeStableCoins,
} from '@/pages/BuybackRecollat';
import { useMintOrRedeemState } from '@/providers/StateProvider';
import CoinCard from '../CoinCard';

export const HASCoinCard: React.FC<{
  isMint: boolean;
}> = ({ isMint }) => {
  const { HASCoinValue, setHASCoinValue } = useMintOrRedeemState();
  return (
    <CoinCard
      coin="HAS"
      input={{
        value: HASCoinValue,
        setValue: setHASCoinValue,
        canInput: isMint,
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
}> = ({ isMint }) => {
  const {
    foreignStableCoin,
    setForeignStableCoin,
    foreignStableCoinValue,
    setForeignStableCoinValue,
  } = useMintOrRedeemState();

  return (
    <CoinCard
      coin={foreignStableCoin}
      input={{
        value: foreignStableCoinValue,
        setValue: setForeignStableCoinValue,
        canInput: isMint,
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
}> = ({ isMint }) => {
  const {
    nativeStableCoin,
    setNativeStableCoin,
    nativeStableCoinValue,
    setNativeStableCoinValue,
  } = useMintOrRedeemState();

  return (
    <CoinCard
      coin={nativeStableCoin}
      input={{
        value: nativeStableCoinValue,
        setValue: setNativeStableCoinValue,
        canInput: !isMint,
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
