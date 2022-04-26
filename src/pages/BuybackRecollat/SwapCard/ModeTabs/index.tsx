import Tabs from '@/components/Tabs';
import { NativeStableCoin } from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import { SwapMode } from '@/state/swap';
import { useEffect } from 'react';
import { useState } from 'react';

const modeToTab: Record<SwapMode, number> = {
  recollat: 0,
  decollat: 1,
  cross: 2,
};

const modeTabToMode: Record<number, SwapMode> = {
  0: 'recollat',
  1: 'decollat',
  2: 'cross',
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

const nativeStableCoinTabs = [
  {
    label: 'USDH',
    render: null,
  },
  {
    label: 'EURH',
    render: null,
  },
  {
    label: 'JPYH',
    render: null,
  },
  {
    label: 'GBPH',
    render: null,
  },
  {
    label: 'AUDH',
    render: null,
  },
  {
    label: 'CHFH',
    render: null,
  },
];

const ModeTabs: React.FC = () => {
  const {
    mode,
    setMode,
    nativeStableCoin,
    setNativeStableCoin,
    needsCollateral,
  } = useSwapState();

  const [currentTabMode, setCurrentTabMode] = useState<number>(modeToTab[mode]);
  const [currentTabNativeStableCoin, setCurrentTabNativeStableCoin] =
    useState<number>(nativeStableCoinToTab[nativeStableCoin]);

  useEffect(() => {
    setMode(modeTabToMode[currentTabMode]);
  }, [currentTabMode, setMode]);

  useEffect(() => {
    setNativeStableCoin(nativeStableCoinTabToCoin[currentTabNativeStableCoin]);
  }, [currentTabNativeStableCoin, setNativeStableCoin]);

  const modeTabs = [
    {
      label: 'Recollateralize',
      disabled: !needsCollateral,
      render: null,
    },
    {
      label: 'Decollateralize',
      disabled: needsCollateral,
      render: null,
    },
    {
      label: 'Cross',
      render: null,
    },
  ];

  return (
    <>
      <Tabs
        tabs={modeTabs}
        currentTab={currentTabMode}
        setCurrentTab={setCurrentTabMode}
      />
      <div className="text-center text-hblack-4">Select Stablecoin Pool</div>
      <Tabs
        tabs={nativeStableCoinTabs}
        currentTab={currentTabNativeStableCoin}
        setCurrentTab={setCurrentTabNativeStableCoin}
      />
    </>
  );
};

export default ModeTabs;
