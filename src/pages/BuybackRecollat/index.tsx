import { Coin } from '@/constants/coin';
import { useState } from 'react';
import Graph from './Graph';
import SwapCard from './SwapCard';

export const supportedStableCoins: Coin[] = [
  'USDH',
  'EURH',
  'JPYH',
  'AUDH',
  'GBPH',
  'CHFH',
];

const BuybackRecollat = () => {
  const [stableCoin, setStableCoin] = useState(supportedStableCoins[0]);
  const needsCollateral = true;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:min-h-[66.66666666666667%] sm:h-80 h-full">
        <Graph stableCoin={stableCoin} setStableCoin={setStableCoin} />
        <SwapCard
          stableCoin={stableCoin}
          setStableCoin={setStableCoin}
          stableCoinOptions={supportedStableCoins}
          needsCollateral={needsCollateral}
        />
      </div>
    </div>
  );
};

export default BuybackRecollat;
