import { Coin } from '@/constants/coin';
import { SelectOption } from '@/components/Select';
import CoinSelect from '@/components/CoinSelect';
import Input, {
  useDefaultNumberInputOnChange,
  useNumberInputOnChangeGenerator,
} from '@/components/Input';
import { useState } from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import CoinInputWithBalance from '@/components/CoinInputWithBalance';
import clsx from 'clsx';

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

interface Props {
  type: 'mint' | 'redeem';
}

const Content: React.FC<Props> = ({ type }) => {
  const pageText = type === 'mint' ? 'MINT' : 'REDEEM';

  const onChangeGen = useNumberInputOnChangeGenerator();

  const Button: React.FC = ({ children }) => {
    return (
      <button className="bg-white rounded-md text-black px-4 py-2 w-1/3 self-center">
        {children}
      </button>
    );
  };

  return (
    <div className="flex-1 w-full flex flex-col text-center py-2 justify-center items-center">
      <div className="bg-card h-60 w-5/6 flex flex-col justify-center px-4 py-1">
        <span className="font-bold text-center text-2xl pt-2">{pageText}</span>
        <div
          className={clsx(
            'flex w-full',
            type === 'mint' ? 'flex-row' : 'flex-row-reverse',
          )}
        >
          <div className="flex flex-col justify-center w-1/2 h-full">
            <CoinInputWithBalance
              title="FROM"
              coin="USDC"
              onChangeGen={onChangeGen}
            />
            <CoinInputWithBalance
              title="FROM"
              coin="HAS"
              onChangeGen={onChangeGen}
            />
          </div>
          <div className="flex flex-col justify-center">
            <MdArrowRightAlt size={80} />
          </div>
          <div className="flex flex-col justify-center w-1/2 h-full">
            <CoinInputWithBalance
              title="TO"
              coin="USDH"
              onChangeGen={onChangeGen}
            />
          </div>
        </div>
        <div className="h-2" />
        <div className="w-full flex flex-row justify-center">
          <Button>APPROVE</Button>
          <div className="w-2" />
          <Button>{pageText}</Button>
        </div>
      </div>
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

const MintOrRedeem: React.FC<Props> = ({ type }) => {
  return (
    <div className="flex flex-col w-full h-full text-white">
      <Header />
      <Content type={type} />
    </div>
  );
};

export default MintOrRedeem;
