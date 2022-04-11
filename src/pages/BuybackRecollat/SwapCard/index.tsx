import { Coin } from '@/constants/coin';
import SwapCoinDisplay from './CoinDisplay';
import SubmitButtons from './SubmitButtons';

const SwapCard: React.FC<{
  stableCoinOptions: Coin[];
}> = ({ stableCoinOptions }) => {
  return (
    <div className="bg-card rounded-2xl w-96 sm:w-64 md:w-72 lg:w-80 sm:h-full flex flex-col pt-4 py-12 px-4 text-white text-center">
      <SwapCoinDisplay stableCoinOptions={stableCoinOptions} />
      <SubmitButtons />
    </div>
  );
};

export default SwapCard;
