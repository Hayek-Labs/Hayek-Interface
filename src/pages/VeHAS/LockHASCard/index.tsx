import Tabs from '@/components/Tabs';
import { useVeHASState } from '@/providers/StateProvider';
import { VeHASState } from '@/state/veHAS';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo } from 'react';
import MyDeposits from '../MyDeposits';
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

  const { mode, setMode } = state;

  const modeTabsOnChange = useCallback(
    (val) => setMode(val === 0 ? 'lock' : 'my-vehas'),
    [setMode],
  );

  const modeTabs = [
    {
      label: 'Lock',
      render: <LockHASDisplay state={state} />,
    },
    {
      label: 'Withdraw',
      render: <MyDeposits />,
    },
  ];

  return (
    <div className="bg-card w-96 flex flex-col justify-center px-4 pt-2 rounded-lg text-white text-center relative">
      {/* <span className="font-bold text-center text-md mb-2 text-hblack-4">
        {mode === 'lock' ? 'Lock HAS for veHAS' : 'Lock HAS for veHAS'}
      </span> */}
      <Tabs
        tabs={modeTabs}
        currentTab={mode === 'lock' ? 0 : 1}
        onChange={modeTabsOnChange}
        labelClassName={`
          rounded-md 
          px-3 
          py-1
          mr-2 
          select-none 
          text-hblack-4`}
        labelSelectedClassName={`bg-hblack-3 text-white`}
      />
    </div>
  );
};

export default LockHASCard;
