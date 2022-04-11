import { Coin } from '@/constants/coin';
import Graph from './Graph';
import SwapCard from './SwapCard';

export const supportedNativeStableCoins: Coin[] = [
  'USDH',
  'EURH',
  'JPYH',
  'AUDH',
  'GBPH',
  'CHFH',
];

export const supportedCollateralCoins: Coin[] = ['USDT', 'USDC'];

export const supportedForiegnStableCoins: Coin[] = ['USDC', 'USDT'];

const BuybackRecollat = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:h-96 py-4 sm:py-0">
        <Graph stableCoinOptions={supportedCollateralCoins} />
        <SwapCard stableCoinOptions={supportedCollateralCoins} />
      </div>
    </div>
  );
};

export default BuybackRecollat;
