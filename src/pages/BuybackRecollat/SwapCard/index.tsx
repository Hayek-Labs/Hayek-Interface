import { Coin } from '@/constants/coin';
import SwapCoinDisplay from './CoinDisplay';
import SubmitButtons from './SubmitButtons';

const SwapCard: React.FC<{
  stableCoin: Coin;
  setStableCoin: SetState<Coin>;
  needsCollateral: boolean;
}> = ({ stableCoin, needsCollateral }) => {
  return (
    <div className="bg-card rounded-2xl w-64 md:w-72 lg:w-80 h-60 sm:h-full flex flex-col pt-4 py-12 px-4 text-white text-center">
      <SwapCoinDisplay
        stableCoin={stableCoin}
        needsCollateral={needsCollateral}
      />
      <SubmitButtons />
    </div>
  );
};

export default SwapCard;
