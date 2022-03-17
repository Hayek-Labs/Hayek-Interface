import LineChart from '@/components/LineChart';
import { Coin } from '@/constants/coin';
import StableCoinSelect from '../StableCoinSelect';

const Graph: React.FC<{ stableCoin: Coin; setStableCoin: SetState<Coin> }> = ({
  stableCoin,
  setStableCoin,
}) => {
  return (
    <div className="rounded-lg bg-card w-full sm:w-2/5 md:w-3/5 h-60 sm:h-full sm:mr-5">
      <div className="flex flex-col p-4 h-full">
        <div className="flex flex-row items-center">
          <span className="text-white">Collateral Ratio</span>
        </div>
        <StableCoinSelect
          stableCoin={stableCoin}
          setStableCoin={setStableCoin}
        />
        <div className="h-3" />
        <LineChart />
      </div>
    </div>
  );
};

export default Graph;
