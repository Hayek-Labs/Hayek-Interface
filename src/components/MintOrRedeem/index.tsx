import { Coin } from '@/constants/coin';
import { BsArrowDownCircle, BsPlusLg } from 'react-icons/bs';
import clsx from 'clsx';
import CoinCard from '../CoinCard';
import { useState } from 'react';
import Button from '../Button';
import { supportedStableCoins } from '@/pages/BuybackRecollat';

interface CoinStatProps {
  statName: string;
  stat: string;
}

const CoinStat: React.FC<CoinStatProps> = ({ stat, statName }) => {
  return (
    <div className="rounded-lg bg-card flex flex-col items-center justify-center h-20 w-1/6 mr-2 p-2 grow">
      <span className="text-white font-bold">{statName}</span>
      <span>{stat}</span>
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex flex-row text-sm text-center w-full">
      <div className="rounded-lg bg-card flex flex-col items-center justify-center h-20 w-1/6 mr-2 p-2 grow">
        <span className="text-white font-bold">Mint USDH</span>
      </div>
      <CoinStat statName="USDH PRICE" stat="$0.9992" />
      <CoinStat statName="COLLATERAL RATIO" stat="84.50%" />
      <CoinStat statName="POOL BALANCE / CEILING" stat="15.619M / 75M" />
      <CoinStat statName="POOL AVAILABLE TO MINT" stat="59.381M" />
    </div>
  );
};

interface Props {
  type: 'mint' | 'redeem';
}

const Content: React.FC<Props> = ({ type }) => {
  const isMint = type === 'mint';
  const pageText = isMint ? 'MINT' : 'REDEEM';

  const [foreignStableCoin] = useState<Coin>('USDC');
  const [foreignStableCoinValue, setForeignStableCoinValue] = useState('0');

  const [HASCoinValue, setHASCoinValue] = useState('0');

  const [nativeStableCoin, setNativeStableCoin] = useState<Coin>('USDH');
  const [nativeStableCoinValue, setNativeStableCoinValue] = useState('0');

  return (
    <div className="flex-1 w-full flex flex-col text-center py-2 justify-center items-center">
      <div className="bg-card w-96 flex flex-col justify-center px-4 pt-2 pb-6 rounded-lg">
        <span className="font-bold text-center text-md mb-2 text-hblack-4">
          {pageText}
        </span>
        <div
          className={clsx(
            'flex w-full',
            isMint ? 'flex-col' : 'flex-col-reverse',
          )}
        >
          <div className="flex flex-col justify-center w-full border border-[#444444] p-2 rounded-lg">
            <CoinCard
              coin="HAS"
              input={{
                value: HASCoinValue,
                setValue: setHASCoinValue,
                canInput: isMint,
              }}
              select={{
                selectFrom: ['HAS'],
                canSelect: false,
              }}
              size="md"
            />
            <BsPlusLg size={15} className="self-center my-2 fill-hblack-4" />
            <CoinCard
              coin={foreignStableCoin}
              input={{
                value: foreignStableCoinValue,
                setValue: setForeignStableCoinValue,
                canInput: isMint,
              }}
              size="md"
            />
          </div>
          <div className="flex flex-col items-center">
            <BsArrowDownCircle size={20} className="my-2 fill-hblack-4" />
          </div>
          <div className="flex flex-col justify-center w-full">
            <CoinCard
              coin={nativeStableCoin}
              input={{
                value: nativeStableCoinValue,
                setValue: setNativeStableCoinValue,
                canInput: !isMint,
              }}
              size="lg"
              select={{
                selectFrom: supportedStableCoins,
                setCoin: setNativeStableCoin,
                canSelect: true,
              }}
            />
          </div>
        </div>
        <div className="h-6" />
        <div className="w-full flex flex-row justify-center">
          <Button>Connect Wallet</Button>
        </div>
      </div>
    </div>
  );
};

const MintOrRedeem: React.FC<Props> = ({ type }) => {
  return (
    <div className="flex flex-col w-full h-full text-white">
      {/* <Header /> */}
      <Content type={type} />
    </div>
  );
};

export default MintOrRedeem;
