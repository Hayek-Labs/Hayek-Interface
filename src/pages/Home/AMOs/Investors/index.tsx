import PieChart, { PieChartInfo } from '@/components/PieChart';
import { getMockPieChartWeights } from '@/components/PieChart/util';
import HomeRenderIfVisible from '../../HomeRenderIfVisible';

type InvestorWithChartInfo = PieChartInfo<Investor>;

interface Investor {
  key: number;
  name: string;
}

const investors: Investor[] = [
  {
    key: 1,
    name: 'ETH',
  },
  {
    key: 2,
    name: 'WBTC',
  },
  {
    key: 3,
    name: 'GEL',
  },
  {
    key: 4,
    name: 'ENS',
  },
];

const investorWeights: InvestorWithChartInfo[] = getMockPieChartWeights(
  investors,
  100,
);

const getEntryKey = (entry: InvestorWithChartInfo) => {
  return entry.name;
};

const InvestorsGraph = () => {
  return (
    <div className="w-full lg:w-1/3 p-2 flex flex-col items-center justify-center">
      <div className="rounded-lg w-full bg-card h-[30rem] px-4 py-2 flex flex-col">
        <span className="font-bold text-white inline-flex flex-row items-center">
          Capital By Investor
        </span>
        <div className="flex h-[30rem] flex-col">
          <HomeRenderIfVisible height="480px">
            <PieChart
              data={investorWeights}
              getEntryKey={getEntryKey}
              tooltipType="dollar"
            />
          </HomeRenderIfVisible>
        </div>
      </div>
    </div>
  );
};

export default InvestorsGraph;
