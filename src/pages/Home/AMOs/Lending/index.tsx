import PieChart, { PieChartInfo } from '@/components/PieChart';
import { getMockPieChartWeights } from '@/components/PieChart/util';
import HomeRenderIfVisible from '../../HomeRenderIfVisible';

type LendingPlatformWithChartInfo = PieChartInfo<LendingPlatform>;

interface LendingPlatform {
  key: number;
  name: string;
}

const lendingPlatforms: LendingPlatform[] = [
  {
    key: 1,
    name: 'Aave',
  },
  {
    key: 2,
    name: 'Planet Finance',
  },
  {
    key: 3,
    name: 'Market.xyz',
  },
  {
    key: 4,
    name: 'Stake DAO Pool',
  },
];

const lendingPlatformWeights: LendingPlatformWithChartInfo[] =
  getMockPieChartWeights(lendingPlatforms, 350);

const getEntryKey = (entry: LendingPlatformWithChartInfo) => {
  return entry.name;
};

const LendingPlatformGraph = () => {
  return (
    <div className="w-full lg:w-1/3 p-2 flex flex-col items-center justify-center">
      <div className="rounded-lg w-full bg-card h-[30rem] px-4 py-2 flex flex-col">
        <span className="font-bold text-white inline-flex flex-row items-center">
          Lending
        </span>
        <div className="flex h-[30rem] flex-col">
          <HomeRenderIfVisible height="480px">
            <PieChart
              data={lendingPlatformWeights}
              getEntryKey={getEntryKey}
              tooltipType="dollar"
            />
          </HomeRenderIfVisible>
        </div>
      </div>
    </div>
  );
};

export default LendingPlatformGraph;
