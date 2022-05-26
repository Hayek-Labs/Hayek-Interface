import { useVeHASState } from '@/providers/StateProvider';
import { VeHASState } from '@/state/veHAS';
import { Tabs as AntTabs } from 'antd';
const { TabPane: AntTabPane } = AntTabs;
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';
import MyDeposits from '../MyDeposits';
import Vote from '../Vote';
import LockHASDisplay from './LockHASDisplay';

const useComputeVeHAS = (state: VeHASState) => {
  // input
  const { HASCoinValue, lockPeriod } = state;

  // output fn
  const { setVeHASCoinValue } = state;

  const rate = useMemo(() => new BigNumber(1.004), []);

  useEffect(() => {
    setVeHASCoinValue(HASCoinValue.times(rate.exponentiatedBy(lockPeriod)));
  }, [HASCoinValue, lockPeriod, rate, setVeHASCoinValue]);
};

const LockHASCard = () => {
  const state = useVeHASState();
  useComputeVeHAS(state);

  return (
    <div className="bg-card w-96 flex flex-col justify-center rounded-lg text-white text-center relative">
      <AntTabs defaultActiveKey="1" type="card" size="middle" tabBarGutter={0}>
        <AntTabPane tab="Lock" key="1">
          <LockHASDisplay state={state} />
        </AntTabPane>
        <AntTabPane tab="Withdraw" key="2">
          <MyDeposits />
        </AntTabPane>
        <AntTabPane tab="Vote" key="3">
          <Vote />
        </AntTabPane>
      </AntTabs>
    </div>
  );
};

export default LockHASCard;
