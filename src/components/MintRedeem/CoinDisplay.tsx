import {
  supportedForiegnStableCoins,
  supportedNativeStableCoins,
  supportedCoins,
} from '@/constants/coin';
import { useBalance } from '@/hooks/useBalance';
import { useMintOrRedeemState } from '@/providers/StateProvider';
import BigNumber from 'bignumber.js';
import CoinCard from '../CoinCard';
import { useState } from 'react';

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

export const Coin0Card: React.FC<{
  isMint: boolean;
}> = () => {
  const { coin0, setCoin0, coin0Value, setCoin0Value, setIndependentCoin } =
    useMintOrRedeemState();

  const balance = useBalance(coin0);

  return (
    <CoinCard
      coin={coin0}
      input={{
        value: coin0Value,
        setValue: setCoin0Value,
        onChange: () => {
          setIndependentCoin('coin0');
        },
        canInput: true,
      }}
      size="md"
      select={{
        selectFrom: supportedCoins,
        // @ts-ignore
        setCoin: setCoin0,
        canSelect: true,
      }}
      balance={balance}
    />
  );
};

export const Coin1Card: React.FC<{
  isMint: boolean;
}> = () => {
  const { coin1, setCoin1, coin1Value, setCoin1Value, setIndependentCoin } =
    useMintOrRedeemState();

  const balance = useBalance(coin1);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {isActive ? (
        <CoinCard
          coin={coin1}
          input={{
            value: coin1Value,
            setValue: setCoin1Value,
            onChange: () => {
              setIndependentCoin('coin1');
            },
            canInput: true,
          }}
          size="md"
          select={{
            selectFrom: supportedCoins,
            // @ts-ignore
            setCoin: setCoin1,
            canSelect: true,
          }}
          balance={balance}
        />
      ) : (
        <div
          className="rounded-lg w-full bg-[#060203] flex items-center p-5 cursor-pointer hover:shadow-lg hover:bg-[#0e0d0d]"
          style={{
            justifyContent: 'center',
            color: 'white',
          }}
          onClick={() => {
            setIsActive(true);
          }}
        >
          <img
            src={`https://assets.codepen.io/3685267/res-react-dash-add-component.svg`}
            alt=""
            className="w-5 h-5"
          />
          <div className="ml-2">Add Collateral</div>
        </div>
      )}
    </>
  );
};
