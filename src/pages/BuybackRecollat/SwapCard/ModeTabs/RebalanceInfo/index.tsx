import { NativeStableCoin, supportedNativeStableCoins } from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import clsx from 'clsx';
import { useMemo } from 'react';
import CoinBtn from '../CoinBtn';
import styles from './styles.less';

interface RebalanceInfoProps {
  rebalanceData: Record<NativeStableCoin, 'surplus' | 'deficit' | 'balanced'>;
}

const RebalanceInfoRow: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="flex flex-row items-center pt-2">
      <span className="w-32 text-left text-hblack-4">{title}</span>
      <div className="flex flex-row flex-wrap">{children}</div>
    </div>
  );
};

const RebalanceInfo: React.FC<RebalanceInfoProps> = ({ rebalanceData }) => {
  const { nativeStableCoin } = useSwapState();

  const { surplusCoins, deficitCoins, balancedCoins } = useMemo(() => {
    return (supportedNativeStableCoins as NativeStableCoin[]).reduce<{
      surplusCoins: NativeStableCoin[];
      deficitCoins: NativeStableCoin[];
      balancedCoins: NativeStableCoin[];
    }>(
      ({ surplusCoins, deficitCoins, balancedCoins }, next) => {
        if (rebalanceData[next] === 'surplus') {
          surplusCoins.push(next);
        } else if (rebalanceData[next] === 'deficit') {
          deficitCoins.push(next);
        } else {
          balancedCoins.push(next);
        }
        return { surplusCoins, deficitCoins, balancedCoins };
      },
      { surplusCoins: [], deficitCoins: [], balancedCoins: [] },
    );
  }, [rebalanceData]);

  return (
    <div className={clsx('flex flex-col', styles['styles'])}>
      <RebalanceInfoRow title="Collateral Surplus">
        {surplusCoins.map((coin) => (
          <CoinBtn
            key={coin}
            coin={coin}
            state="surplus"
            selected={nativeStableCoin === coin}
          />
        ))}
      </RebalanceInfoRow>
      <RebalanceInfoRow title="Collateral Deficit">
        {deficitCoins.map((coin) => (
          <CoinBtn
            key={coin}
            coin={coin}
            state="deficit"
            selected={nativeStableCoin === coin}
          />
        ))}
      </RebalanceInfoRow>
      <RebalanceInfoRow title="Balance">
        {balancedCoins.map((coin) => (
          <CoinBtn
            key={coin}
            coin={coin}
            state="balanced"
            selected={nativeStableCoin === coin}
          />
        ))}
      </RebalanceInfoRow>
    </div>
  );
};

export default RebalanceInfo;
