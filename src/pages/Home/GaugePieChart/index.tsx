import PieChart, { PieChartInfo } from '@/components/PieChart';
import { getMockPieChartWeights } from '@/components/PieChart/util';
import { pools, Pool } from '@/constants/mockPools';
import React from 'react';
import HomeRenderIfVisible from '../HomeRenderIfVisible';

const mockPoolWeights: PoolWithChartInfo[] = getMockPieChartWeights(pools, 100);
type PoolWithChartInfo = PieChartInfo<Pool>;

const getEntryKey = (entry: PoolWithChartInfo) => {
  return `${entry.name} ${entry.coin1}-${entry.coin2}`;
};

const PieChartCard: React.FC = () => {
  return (
    <div className="w-full lg:w-full p-2 flex flex-col items-center justify-center">
      <div className="rounded-lg w-full bg-card h-[30rem] px-4 py-2 box-border flex flex-col">
        <span className="font-bold text-white inline-flex flex-row items-center">
          veHAS Pool Weights
        </span>
        <div className="flex h-[30rem] flex-col">
          <HomeRenderIfVisible height="480px">
            <PieChart
              data={mockPoolWeights}
              getEntryKey={getEntryKey}
              tooltipType="pct"
            />
          </HomeRenderIfVisible>
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
