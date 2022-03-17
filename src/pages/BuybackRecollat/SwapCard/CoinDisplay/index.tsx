import CoinCard from '@/components/CoinCard';
import { Coin } from '@/constants/coin';
import { useState, useEffect } from 'react';
import { BsArrowDownCircle } from 'react-icons/bs';

const SwapCoinDisplay: React.FC<{
  stableCoin: Coin;
  needsCollateral: boolean;
}> = ({ stableCoin, needsCollateral }) => {
  const [coinToSell, coinToBuy]: Coin[] = needsCollateral
    ? [stableCoin, 'HAS'] // recollateralize
    : ['HAS', stableCoin]; // buyback

  const [coinToSellValue, setCoinToSellValue] = useState('0');
  const [coinToBuyValue, setCoinToBuyValue] = useState('0');

  useEffect(() => {
    const coinToSellNum = Number(coinToSellValue);
    if (!isNaN(coinToSellNum) && isFinite(coinToSellNum)) {
      setCoinToBuyValue((coinToSellNum * 4.212).toFixed(2));
    }
  }, [coinToSellValue]);

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center">
      <CoinCard
        coin={coinToSell}
        value={coinToSellValue}
        setValue={setCoinToSellValue}
        canInput={true}
      />
      <BsArrowDownCircle size={30} className="my-4" />
      <CoinCard
        coin={coinToBuy}
        value={coinToBuyValue}
        setValue={setCoinToBuyValue}
        canInput={false}
      />
      <div className="h-4" />
    </div>
  );
};

export default SwapCoinDisplay;
