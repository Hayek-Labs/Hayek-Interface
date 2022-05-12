import Tabs from '@/components/Tabs';
import { NativeStableCoin } from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import { SwapMode } from '@/state/swap';
import { useCallback, useEffect } from 'react';
import { CRState } from '..';
import CrossInfo from './CrossInfo';
import RebalanceInfo from './RebalanceInfo';

const modeToTab: Record<SwapMode, number> = {
  recollat: 0,
  decollat: 0,
  cross: 1,
};

const ModeTabs: React.FC<{
  rebalanceData: Record<NativeStableCoin, CRState>;
}> = ({ rebalanceData }) => {
  const {
    mode,
    setMode,
    nativeStableCoin,
    needsCollateral,
    setNeedsCollateral,
  } = useSwapState();

  useEffect(() => {
    const isSurplus = rebalanceData[nativeStableCoin] === 'surplus';
    const isDeficit = rebalanceData[nativeStableCoin] === 'deficit';
    if (isSurplus || isDeficit) {
      setNeedsCollateral(isDeficit);
    }
  }, [nativeStableCoin, rebalanceData, setNeedsCollateral]);

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
      rounded-md
      px-3 
      py-1
      mr-2 
      select-none 
      text-hblack-4`}
      labelSelectedClassName={`
      bg-hblack-3 text-white`}
    />
  );
};

export default ModeTabs;
