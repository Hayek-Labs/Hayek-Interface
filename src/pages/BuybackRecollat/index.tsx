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

const Title = () => {
  return <span className="font-bold text-3xl">Swap</span>;
};

const StableCoinOption: React.FC<{
  coin: Coin;
  onClick: OnClickFn;
  selected: boolean;
}> = ({ coin, onClick, selected }) => {
  return (
    <div
      className={clsx(
        'rounded-lg bg-[#2C2B2B] px-4 py-2 text-lg border-2 border-solid cursor-pointer m-1',
        selected ? 'border-slate-50' : 'border-transparent',
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
    <div className="w-full flex flex-row flex-wrap justify-evenly">
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
    <div className="rounded-lg w-1/2 bg-[#2C2B2B] flex flex-col justify-start px-4 py-3">
      <div className="flex flex-row items-center">
        <Logo width={logoSize} height={logoSize} className="min-w-min" />
        <div className="w-2" />
        <span className="text-2xl">{coin}</span>
        <input
          className="ml-4 bg-transparent outline-none text-right w-20 text-2xl flex-1"
          value={value}
          type="number"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!canInput}
        />
      </div>
      <div className="h-1" />
      <div className="flex flex-row items-center">
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
      <BsArrowDownCircle size={30} className="my-2" />
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
        className="bg-[#2C2B2B] rounded-md px-4 py-2 w-1/3 self-center text-lg"
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
      <Button disabled={isApproved} onClick={onApprove}>
        APPROVE
      </Button>{' '}
      <Button disabled={!isApproved || isSwapped} onClick={onSwap}>
        SWAP
      </Button>
    </div>
  );
};

const SwapCard = () => {
  const [stableCoin, setStableCoin] = useState(supportedStableCoins[0]);
  const needsCollateral = true;

  return (
    <div className="bg-card rounded-2xl w-3/4 min-h-[66.66666666666667%] flex flex-col py-4 px-8 text-white text-center">
      <Title />
      <div className="h-8" />
      <StableCoinSelect stableCoin={stableCoin} setStableCoin={setStableCoin} />
      <SwapCoinDisplay
        stableCoin={stableCoin}
        needsCollateral={needsCollateral}
      />
      <SubmitButtons />
    </div>
  );
};

const BuybackRecollat = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <SwapCard />
    </div>
  );
};

export default BuybackRecollat;
