import { Coin } from '@/constants/coin';
import SwapCoinDisplay from './CoinDisplay';
import ModeTabs from './ModeTabs';
import SubmitButtons from './SubmitButtons';

const SwapCard: React.FC<{
  stableCoinOptions: readonly Coin[];
}> = ({ stableCoinOptions }) => {
  return (
    <div className="bg-card w-96 flex flex-col justify-center px-4 pt-2 pb-6 rounded-lg text-white text-center">
      <span className="font-bold text-center text-md mb-2 text-hblack-4">
        SWAP
      </span>
      <ModeTabs />
      <SwapCoinDisplay stableCoinOptions={stableCoinOptions} />
      <SubmitButtons />
    </div>
  );
};

export default SwapCard;
