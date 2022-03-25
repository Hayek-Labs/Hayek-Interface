import LineChart from '@/components/LineChart';
import StableCoinSelect from '../StableCoinSelect';

const Graph: React.FC = () => {
  return (
    <div className="rounded-lg bg-card w-72 md:w-3/5 h-full mr-2 md:mr-5">
      <div className="flex flex-col p-4 h-full">
        <div className="flex flex-row items-center">
          <span className="text-white">Collateral Ratio</span>
        </div>
        <StableCoinSelect />
        <div className="h-3" />
        <LineChart />
      </div>
    </div>
  );
};

export default Graph;
