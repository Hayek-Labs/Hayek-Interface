import { Coin, coinToLogo } from '@/constants/coin';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import clsx from 'clsx';
import styles from './index.less';
import { SelectOption } from '@/components/Select';
import CoinSelect from '@/components/CoinSelect';
import Input, {
  useDefaultNumberInputOnChange,
  useNumberInputOnChangeGenerator,
} from '@/components/Input';
import { useState } from 'react';

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

const ContentPiece: React.FC = ({ children }) => {
  return (
    <div className="flex-1 flex items-center justify-center">{children}</div>
  );
};

const selectOptions: SelectOption<Coin>[] = [
  { value: 'USDC', label: 'USDC' },
  { value: 'USDT', label: 'USDT' },
];

const MintOptions = () => {
  const onChangeGen = useNumberInputOnChangeGenerator();

  const [collateralAmount, setCollateralAmount] = useState(0);
  const collateralAmountOnChange = useDefaultNumberInputOnChange(
    onChangeGen,
    setCollateralAmount,
  );

  const [hasAmount, setHasAmount] = useState(0);
  const hasAmountOnChange = useDefaultNumberInputOnChange(
    onChangeGen,
    setHasAmount,
  );

  return (
    <ContentPiece>
      <div className="flex flex-col items-center">
        <span className="text-blue-400">MINT METHOD</span>
        <span>Choose normal if you already have USDC and HAS.</span>

        <div className="h-2" />

        <div className="flex flex-row items-center">
          <span className="rounded-full bg-indigo-500 w-5 h-5 mr-1" />
          <span>Normal</span>
        </div>

        <div className="h-2" />

        <span className="text-blue-400 mb-1">COLLATERAL POOL</span>
        <CoinSelect options={selectOptions} />

        <div className="h-2" />

        <span className="text-blue-400 mb-1">AMOUNT</span>
        <Input
          placeholder="Amount"
          val={collateralAmount}
          onChange={collateralAmountOnChange}
        />
        <span>0 Available</span>

        <div className="h-2" />
        <div className="border-b-2 border-white w-full" />
        <div className="h-2" />

        <span className="text-blue-400 mb-1">HAS</span>
        <Input
          placeholder="Amount"
          val={hasAmount}
          onChange={hasAmountOnChange}
        />
        <span>0 Available</span>
      </div>
    </ContentPiece>
  );
};

interface ExchangeProps {
  coin1: Coin;
  coin2: Coin;
}
const MintExchangeInfo: React.FC<ExchangeProps> = ({ coin1, coin2 }) => {
  const CoinInfo: React.FC<{ coin: Coin; price: string }> = ({
    coin,
    price,
  }) => {
    const Icon = coinToLogo[coin];
    const coinIconSize = 15;
    return (
      <span className="inline-flex flex-row items-center">
        <Icon width={coinIconSize} height={coinIconSize} />
        <span className="w-1" />
        <span>
          {coin}: <b>{price}</b>
        </span>
      </span>
    );
  };

  return (
    <ContentPiece>
      <div className="flex flex-col items-center">
        <span>EXCHANGE RATES</span>
        <CoinInfo coin={coin1} price="$1.000" />
        <CoinInfo coin={coin2} price="$22.880" />
        <HiOutlineArrowNarrowRight size={30} />
        <span>0.3000% MINTING FEE</span>
        <span>(0.00000 {coin1})</span>
        <span>Pool (V3) 🌊 : 0x2fE0...0729</span>
      </div>
    </ContentPiece>
  );
};

const MintReceiveInfo = () => {
  return (
    <ContentPiece>
      <div className="flex flex-col items-center">
        <span>YOU RECEIVE</span>
        <div className="flex flex-row items-center">
          <div className="ml-2 px-20 py-2 rounded-md bg-gray-800">-</div>
        </div>
      </div>
    </ContentPiece>
  );
};

const Content = () => {
  return (
    <div className="flex-1 w-full flex flex-row text-center px-2">
      <MintOptions />
      <MintExchangeInfo coin1="USDH" coin2="HAS" />
      <MintReceiveInfo />
    </div>
  );
};

const Footer = () => {
  return (
    <div className="text-center mt-auto py-2">
      <button className="bg-white rounded-md text-black px-4 py-2">MINT</button>
    </div>
  );
};

const Mint = () => {
  return (
    <div
      className={clsx('flex flex-col w-full h-full text-white', styles.mint)}
    >
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default Mint;
