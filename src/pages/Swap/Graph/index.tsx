import LineChart from '@/components/LineChart';
import { Coin } from '@/constants/coin';
import StableCoinSelect from '../StableCoinSelect';

interface Props {
  stableCoinOptions: Coin[];
}
const Graph: React.FC<Props> = ({ stableCoinOptions }) => {
  return (
    <div className="hidden sm:block rounded-lg bg-card w-full sm:w-72 md:w-3/5 h-full mr-2 md:mr-5">
      <div className="flex flex-col p-4 h-full">
        <div className="flex flex-row items-center">
          <span className="text-white">Collateral Ratio</span>
        </div>
        <StableCoinSelect options={stableCoinOptions} />
        <div className="h-3" />
        <LineChart />
      </div>
    </div>
  );
};

export default Graph;
