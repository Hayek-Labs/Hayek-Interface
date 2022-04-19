import { Coin } from '@/constants/coin';
import Graph from '../Graph';

const CoinGraph: React.FC<{ coin: Coin }> = ({ coin }) => {
  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-80">
        <Graph coin={coin} />
      </div>
    </div>
  );
};

export default CoinGraph;
