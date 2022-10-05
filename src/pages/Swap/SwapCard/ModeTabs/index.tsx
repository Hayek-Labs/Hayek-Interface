import { NativeStableCoin } from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import { Tabs as AntTabs } from 'antd';
const { TabPane: AntTabPane } = AntTabs;
import { useEffect } from 'react';
import { CRState } from '..';
import CrossInfo from './CrossInfo';
import RebalanceInfo from './RebalanceInfo';

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

  useEffect(() => {
    if (mode !== 'cross') {
      setMode(needsCollateral ? 'recollat' : 'decollat');
    }
  }, [mode, needsCollateral, setMode]);

  return (
    <AntTabs
      defaultActiveKey="1"
      type="card"
      size="middle"
      tabBarGutter={0}
      onChange={(val) =>
        setMode(
          val === '1' ? (needsCollateral ? 'recollat' : 'decollat') : 'cross',
        )
      }
    >
      <AntTabPane tab="Rebalance" key="1">
        {/* <RebalanceInfo rebalanceData={rebalanceData} /> */}
      </AntTabPane>
      <AntTabPane tab="Cross" key="2">
        {/* <CrossInfo /> */}
      </AntTabPane>
    </AntTabs>
  );
};

export default ModeTabs;
