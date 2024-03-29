import { supportedForiegnStableCoins } from '@/constants/coin';
import SwapCard from './SwapCard';
import SwapComponent from './SwapComponent';

const Swap = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:h-96 p-4 sm:p-2">
        {/* <SwapCard stableCoinOptions={supportedForiegnStableCoins} /> */}
        <SwapComponent />
      </div>
    </div>
  );
};

export default Swap;
