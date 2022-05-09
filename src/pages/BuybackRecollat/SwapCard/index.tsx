import {
  Coin,
  NativeStableCoin,
  supportedNativeStableCoins,
} from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import { useEffect, useState } from 'react';
import SwapCoinDisplay from './CoinDisplay';
import ModeTabs from './ModeTabs';
import SubmitButtons from './SubmitButtons';

const useSimulateCRChange = (
  setRebalanceData: SetState<
    Record<NativeStableCoin, 'surplus' | 'deficit' | 'balanced'>
  >,
) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setRebalanceData((prevRebalanceData) => {
        return (supportedNativeStableCoins as NativeStableCoin[]).reduce(
          (newRebalanceData, coin) => {
            if (Math.random() > 0.5) {
              const num = Math.random();
              newRebalanceData[coin] =
                num < 0.3333333333
                  ? 'balanced'
                  : num > 0.6666666666
                  ? 'surplus'
                  : 'deficit';
            }
            return newRebalanceData;
          },
          {
            ...prevRebalanceData,
          },
        );
      });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [setRebalanceData]);
};

const BalancedCoinDisplay: React.FC<{ nativeStableCoin: NativeStableCoin }> = ({
  nativeStableCoin,
}) => {
  return (
    <div className="px-3 absolute z-10 opacity-80 w-full h-full bg-black text-white flex items-center justify-center">
      The selected stablecoin pool ({nativeStableCoin}) is balanced so you
      currently cannot swap in this coin&apos;s pool. Please select another
      coin.
    </div>
  );
};

const SwapCard: React.FC<{
  stableCoinOptions: readonly Coin[];
}> = ({ stableCoinOptions }) => {
  const { mode, nativeStableCoin } = useSwapState();

  const [rebalanceData, setRebalanceData] = useState<
    Record<NativeStableCoin, 'surplus' | 'deficit' | 'balanced'>
  >({
    USDH: 'surplus',
    EURH: 'surplus',
    AUDH: 'deficit',
    CHFH: 'balanced',
    GBPH: 'balanced',
    JPYH: 'deficit',
  });

  useSimulateCRChange(setRebalanceData);

  const nativeStableCoinCanSwap =
    rebalanceData[nativeStableCoin] === 'surplus' ||
    rebalanceData[nativeStableCoin] === 'deficit';

  const balancedCoinPrompt = (() => {
    const modeRecollatDecollat = mode === 'recollat' || mode === 'decollat';
    if (modeRecollatDecollat && !nativeStableCoinCanSwap) {
      return <BalancedCoinDisplay nativeStableCoin={nativeStableCoin} />;
    } else {
      return null;
    }
  })();

  return (
    <div className="bg-card w-96 flex flex-col justify-center px-4 pt-2 pb-6 rounded-lg text-white text-center">
      <span className="font-bold text-center text-md mb-2 text-hblack-4">
        SWAP
      </span>
      <ModeTabs rebalanceData={rebalanceData} />
      <div className="h-2" />
      <div className="relative">
        {balancedCoinPrompt}
        <SwapCoinDisplay stableCoinOptions={stableCoinOptions} />{' '}
        <SubmitButtons />
      </div>
    </div>
  );
};

export default SwapCard;
