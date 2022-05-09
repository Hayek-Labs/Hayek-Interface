import { NativeStableCoin, supportedNativeStableCoins } from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import clsx from 'clsx';
import { useMemo } from 'react';
import CoinBtn from '../CoinBtn';
import styles from './styles.less';

interface RebalanceInfoProps {
  rebalanceData: Record<NativeStableCoin, 'surplus' | 'deficit' | 'balanced'>;
}

const RebalanceInfoRow: React.FC<{
  title: string;
  overflowingTitle: string;
  overflowing: boolean;
}> = ({ title, overflowingTitle, overflowing, children }) => {
  if (!children) {
    return null;
  }
  return (
    <div className="flex flex-row items-center pt-2">
      <span
        className={clsx(
          'text-left text-hblack-4',
          overflowing ? 'w-14' : 'w-32',
        )}
      >
        {overflowing ? overflowingTitle : title}
      </span>
      <div className="flex flex-row flex-wrap flex-1">{children}</div>
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

  const surplusOverflow = surplusCoins.length > 3;
  const deficitOverflow = deficitCoins.length > 3;
  const balancedOverflow = balancedCoins.length > 3;

  const overflow = surplusOverflow || deficitOverflow || balancedOverflow;

  return (
    <div className={clsx('flex flex-col h-24', styles['styles'])}>
      {surplusCoins.length > 0 && (
        <RebalanceInfoRow
          title="Collateral Surplus"
          overflowingTitle="Surplus"
          overflowing={overflow}
        >
          {surplusCoins.map((coin) => (
            <CoinBtn
              key={coin}
              coin={coin}
              state="surplus"
              selected={nativeStableCoin === coin}
            />
          ))}
        </RebalanceInfoRow>
      )}
      {deficitCoins.length > 0 && (
        <RebalanceInfoRow
          title="Collateral Deficit"
          overflowingTitle="Deficit"
          overflowing={overflow}
        >
          {deficitCoins.map((coin) => (
            <CoinBtn
              key={coin}
              coin={coin}
              state="deficit"
              selected={nativeStableCoin === coin}
            />
          ))}
        </RebalanceInfoRow>
      )}
      {balancedCoins.length > 0 && (
        <RebalanceInfoRow
          title="Balance"
          overflowingTitle="Balance"
          overflowing={overflow}
        >
          {balancedCoins.map((coin) => (
            <CoinBtn
              key={coin}
              coin={coin}
              state="balanced"
              selected={nativeStableCoin === coin}
            />
          ))}
        </RebalanceInfoRow>
      )}
    </div>
  );
};

export default RebalanceInfo;
