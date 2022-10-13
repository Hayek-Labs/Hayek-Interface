import { useEffect, useState } from 'react';
import { Coin, supportedCoins } from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import { useBalance } from '@/hooks/useBalance';
import CoinCard from '@/components/CoinCard';
import SubmitButtons from '../SwapCard/SubmitButtons';

const SwapCoinDisplay: React.FC<{
  coinList: readonly Coin[];
}> = ({ coinList }) => {
  const {
    swapCoin0,
    setSwapCoin0,
    swapCoinValue0,
    setSwapCoinValue0,
    swapCoin1,
    setSwapCoin1,
    swapCoinValue1,
    setSwapCoinValue1,
  } = useSwapState();

  const swapCoinBalance0 = useBalance(swapCoin0);
  const swapCoinBalance1 = useBalance(swapCoin1);

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center">
      <CoinCard
        coin={swapCoin0}
        input={{
          value: swapCoinValue0,
          setValue: setSwapCoinValue0,
          onChange: () => {},
          canInput: true,
        }}
        select={{
          selectFrom: coinList,
          setCoin: setSwapCoin0,
          canSelect: true,
        }}
        balance={swapCoinBalance0}
      />

      <svg
        className="self-center my-2 fill-hblack-4"
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="arrow-down"
        width="1.5em"
        height="1.5em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path>
      </svg>

      <CoinCard
        coin={swapCoin1}
        input={{
          value: swapCoinValue1,
          setValue: setSwapCoinValue1,
          onChange: () => {},
          canInput: true,
        }}
        select={{
          selectFrom: coinList,
          setCoin: setSwapCoin1,
          canSelect: true,
        }}
        balance={swapCoinBalance1}
      />
      <div className="h-4" />
    </div>
  );
};

const SwapComponent = () => {
  return (
    <div className="bg-card w-1/3 flex flex-col justify-center pb-4 rounded-lg text-white text-center">
      <span className="font-bold text-center text-md mt-2 mb-2 text-hblack-4">
        SWAP
      </span>
      <div className="relative px-4">
        <SwapCoinDisplay coinList={supportedCoins} />
        <SubmitButtons />
      </div>
    </div>
  );
};

export default SwapComponent;
