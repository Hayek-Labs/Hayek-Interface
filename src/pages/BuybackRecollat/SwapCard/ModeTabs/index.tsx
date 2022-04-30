import Tabs from '@/components/Tabs';
import {
  Coin,
  coinToLogo,
  NativeStableCoin,
  supportedNativeStableCoins,
} from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import { SwapMode } from '@/state/swap';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo } from 'react';
import styles from './styles.less';

const modeToTab: Record<SwapMode, number> = {
  recollat: 0,
  decollat: 0,
  cross: 1,
};

const nativeStableCoinToTab: Record<NativeStableCoin, number> = {
  USDH: 0,
  EURH: 1,
  JPYH: 2,
  GBPH: 3,
  AUDH: 4,
  CHFH: 5,
};

const nativeStableCoinTabToCoin: Record<number, NativeStableCoin> = {
  0: 'USDH',
  1: 'EURH',
  2: 'JPYH',
  3: 'GBPH',
  4: 'AUDH',
  5: 'CHFH',
};

const coinTabStateToClassName: Record<
  'surplus' | 'deficit' | 'balanced' | 'none',
  string
> = {
  surplus: '',
  deficit: '',
  balanced: '',
  none: '',
};

const CoinTab: React.FC<{
  coin: Coin;
  size?: number;
  state?: 'surplus' | 'deficit' | 'balanced' | 'none';
}> = ({ coin, state = 'none', size = 20 }) => {
  const Logo = coinToLogo[coin];
  const className = coinTabStateToClassName[state];
  return (
    <div
      className={clsx(
        'flex flex-row items-center',
        className,
        state === 'none' ? '' : state,
      )}
    >
      <Logo width={size} height={size} className="mr-1" />
      <span>{coin}</span>
    </div>
  );
};

const nativeStableCoinTabs = [
  {
    label: <CoinTab coin="USDH" />,
    render: null,
  },
  {
    label: <CoinTab coin="EURH" />,
    render: null,
  },
  {
    label: <CoinTab coin="JPYH" />,
    render: null,
  },
  {
    label: <CoinTab coin="GBPH" />,
    render: null,
  },
  {
    label: <CoinTab coin="AUDH" />,
    render: null,
  },
  {
    label: <CoinTab coin="CHFH" />,
    render: null,
  },
];

const CrossInfo: React.FC = () => {
  const { nativeStableCoin, setNativeStableCoin } = useSwapState();

  const nativeStableCoinTabsOnChange = useCallback(
    (val) => setNativeStableCoin(nativeStableCoinTabToCoin[val]),
    [setNativeStableCoin],
  );

  return (
    <div className="flex flex-row">
      <div className="text-center text-hblack-4">Select Stablecoin Pool</div>
      <Tabs
        tabs={nativeStableCoinTabs}
        currentTab={nativeStableCoinToTab[nativeStableCoin]}
        onChange={nativeStableCoinTabsOnChange}
        labelClassName={`
        border
        rounded-lg
        px-2
        py-1
        select-none
        text-hyellow-1
        border-transparent`}
        labelSelectedClassName={`
        border-hyellow-1
        text-hyellow-1`}
      />
    </div>
  );
};

interface RebalanceInfoProps {
  rebalanceData: Record<NativeStableCoin, 'surplus' | 'deficit' | 'balanced'>;
}

const RebalanceInfo: React.FC<RebalanceInfoProps> = ({ rebalanceData }) => {
  const { nativeStableCoin } = useSwapState();

  const Row: React.FC<{ title: string }> = ({ title, children }) => {
    return (
      <div className="flex flex-row items-center pt-2">
        <span className="w-32 text-left text-hblack-4">{title}</span>
        <div className="flex flex-row flex-wrap">{children}</div>
      </div>
    );
  };

  const iconSize = 20;
  const CoinBtn: React.FC<{
    coin: NativeStableCoin;
    selected: boolean;
    state: 'surplus' | 'deficit' | 'balanced';
  }> = ({ coin, state, selected }) => {
    const { setNativeStableCoin } = useSwapState();
    return (
      <div
        className={clsx(
          'select-none mr-2',
          state === 'balanced' ? 'cursor-not-allowed' : 'cursor-pointer',
          selected ? 'selected' : '',
        )}
        onClick={
          state !== 'balanced'
            ? () => {
                setNativeStableCoin(coin);
              }
            : undefined
        }
      >
        <CoinTab key={coin} coin={coin} state={state} size={iconSize} />
      </div>
    );
  };

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
      <Row title="Collateral Surplus">
        {surplusCoins.map((coin) => (
          <CoinBtn
            key={coin}
            coin={coin}
            state="surplus"
            selected={nativeStableCoin === coin}
          />
        ))}
      </Row>
      <Row title="Collateral Deficit">
        {deficitCoins.map((coin) => (
          <CoinBtn
            key={coin}
            coin={coin}
            state="deficit"
            selected={nativeStableCoin === coin}
          />
        ))}
      </Row>
      <Row title="Balanced">
        {balancedCoins.map((coin) => (
          <CoinBtn
            key={coin}
            coin={coin}
            state="balanced"
            selected={nativeStableCoin === coin}
          />
        ))}
      </Row>
    </div>
  );
};

const ModeTabs: React.FC<{
  rebalanceData: Record<NativeStableCoin, 'surplus' | 'deficit' | 'balanced'>;
}> = ({ rebalanceData }) => {
  const {
    mode,
    setMode,
    nativeStableCoin,
    needsCollateral,
    setNeedsCollateral,
  } = useSwapState();

  useEffect(() => {
    setNeedsCollateral(Math.random() > 0.5);
  }, [setNeedsCollateral, nativeStableCoin]);

  const modeTabs = [
    {
      label: 'Rebalance',
      render: <RebalanceInfo rebalanceData={rebalanceData} />,
    },
    {
      label: 'Cross',
      render: <CrossInfo />,
    },
  ];

  const modeTabsOnChange = useCallback(
    (val) =>
      setMode(val === 1 ? 'cross' : needsCollateral ? 'recollat' : 'decollat'),
    [needsCollateral, setMode],
  );

  useEffect(() => {
    if (mode !== 'cross') {
      setMode(needsCollateral ? 'recollat' : 'decollat');
    }
  }, [mode, needsCollateral, setMode]);

  return (
    <Tabs
      tabs={modeTabs}
      currentTab={modeToTab[mode]}
      onChange={modeTabsOnChange}
      labelClassName={`
      rounded-xl 
      px-3 
      py-1
      mr-2 
      select-none 
      text-white`}
      labelSelectedClassName={`
      bg-hblack-3`}
    />
  );
};

export default ModeTabs;
