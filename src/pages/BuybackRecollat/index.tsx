import LineChart from '@/components/LineChart';
import { Coin, coinToLogo } from '@/constants/coin';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BsArrowDownCircle } from 'react-icons/bs';

const supportedStableCoins: Coin[] = [
  'USDH',
  'EURH',
  'JPYH',
  'AUDH',
  'GBPH',
  'CHFH',
];

const StableCoinOption: React.FC<{
  coin: Coin;
  onClick: OnClickFn;
  selected: boolean;
}> = ({ coin, onClick, selected }) => {
  return (
    <div
      className={clsx(
        'rounded-lg px-4 py-2 text-xs border-2 border-solid cursor-pointer m-1',
        selected ? 'border-slate-50' : 'border-transparent',
        selected ? 'text-white' : '',
      )}
      onClick={onClick}
    >
      {coin}
    </div>
  );
};

const StableCoinSelect: React.FC<{
  stableCoin: Coin;
  setStableCoin: SetState<Coin>;
}> = ({ stableCoin, setStableCoin }) => {
  const onCoinClick = useCallback(
    (coin: Coin) => {
      setStableCoin(coin);
    },
    [setStableCoin],
  );

  const onClickFns: OnClickFn[] = useMemo(() => {
    return supportedStableCoins.map((coin) => {
      return () => {
        onCoinClick(coin);
      };
    });
  }, [onCoinClick]);

  return (
    <div className="w-full flex flex-row flex-wrap justify-start">
      {supportedStableCoins.map((coin, i) => (
        <StableCoinOption
          coin={coin}
          key={coin}
          onClick={onClickFns[i]}
          selected={stableCoin === coin}
        />
      ))}
    </div>
  );
};

const CoinCard: React.FC<{
  coin: Coin;
  value: string;
  setValue: SetState<string>;
  canInput: boolean;
}> = ({ coin, value, setValue, canInput }) => {
  const Logo = coinToLogo[coin];
  const logoSize = 30;
  return (
    <div className="rounded-lg w-full bg-hblack-1 flex flex-col justify-start px-4 py-3 border border-transparent hover:border-hyellow-1">
      <div className="flex flex-row items-center">
        <Logo width={logoSize} height={logoSize} className="min-w-min" />
        <div className="w-2" />
        <span className="text-lg">{coin}</span>
        <input
          className="ml-4 bg-transparent outline-none text-right w-20 text-lg flex-1"
          value={value}
          type="number"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!canInput}
        />
      </div>
      <div className="h-1" />
      <div className="flex flex-row items-center text-hblack-4">
        <span>Balance</span>
        <span className="ml-auto">$0.00</span>
      </div>
    </div>
  );
};

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

const SubmitButtons = () => {
  const [{ isApproved, isSwapped }, setState] = useState({
    isApproved: false,
    isSwapped: false,
  });

  const Button: React.FC<HTML.Button> = ({ children, ...props }) => {
    return (
      <button
        {...props}
        className="bg-[#2C2B2B] rounded-md px-4 py-4 w-full self-center text-xl"
      >
        {children}
      </button>
    );
  };

  const onApprove = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isApproved: true,
    }));
  }, []);

  const onSwap = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isSwapped: true,
    }));
  }, []);

  return (
    <div className="flex flex-row w-full justify-evenly">
      <Button onClick={onSwap}>Connect Wallet</Button>
    </div>
  );
};

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
          needsCollateral={needsCollateral}
        />
      </div>
    </div>
  );
};

export default BuybackRecollat;
