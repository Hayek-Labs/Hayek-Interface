import PieChart, { PieChartInfo } from '@/components/PieChart';
import { getMockPieChartWeights } from '@/components/PieChart/util';
import HomeRenderIfVisible from '../../HomeRenderIfVisible';

type LiquidityWithChartInfo = PieChartInfo<Liquidity>;

interface Liquidity {
  key: number;
  name: string;
}

const liquiditys: Liquidity[] = [
  {
    key: 1,
    name: 'Harmony SushiSwap',
  },
  {
    key: 2,
    name: 'Fantom HasSwap',
  },
  {
    key: 3,
    name: 'Solana Saber',
  },
  {
    key: 4,
    name: 'Aurora NearPad',
  },
];

const liquidityWeights: LiquidityWithChartInfo[] = getMockPieChartWeights(
  liquiditys,
  2000,
);

const getEntryKey = (entry: LiquidityWithChartInfo) => {
  return entry.name;
};

const LiquidityGraph = () => {
  return (
    <div className="w-full lg:w-1/3 p-2 flex flex-col items-center justify-center">
      <div className="rounded-lg w-full bg-card h-[30rem] px-4 py-2 flex flex-col">
        <span className="font-bold text-white inline-flex flex-row items-center">
          Liquidity
        </span>
        <div className="flex h-[30rem] flex-col">
          <HomeRenderIfVisible height="480px">
            <PieChart
              data={liquidityWeights}
              getEntryKey={getEntryKey}
              tooltipType="dollar"
            />
          </HomeRenderIfVisible>
        </div>
      </div>
    </div>
  );
};

export default LiquidityGraph;
