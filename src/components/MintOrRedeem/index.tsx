import { Coin } from '@/constants/coin';
import { SelectOption } from '@/components/Select';
import { useNumberInputOnChangeGenerator } from '@/components/Input';
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

const selectOptions: SelectOption<Coin>[] = [
  { value: 'USDC', label: 'USDC' },
  { value: 'USDT', label: 'USDT' },
];

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

  const stablecoinHasTitle = type === 'mint' ? 'FROM' : 'TO';
  const usdhTitle = type === 'mint' ? 'TO' : 'FROM';

  return (
    <div className="flex-1 w-full flex flex-col text-center py-2 justify-center items-center">
      <div className="bg-card h-80 w-5/6 flex flex-col justify-center px-4 py-1">
        <span className="font-bold text-center text-2xl pt-2">
          {pageText} USDH
        </span>
        <div
          className={clsx(
            'flex w-full',
            type === 'mint' ? 'flex-row' : 'flex-row-reverse',
          )}
        >
          <div className="flex flex-col justify-center w-1/2 h-full">
            <CoinInputWithBalance
              title={stablecoinHasTitle}
              coin="USDC"
              onChangeGen={onChangeGen}
            />
            <CoinInputWithBalance
              title={stablecoinHasTitle}
              coin="HAS"
              onChangeGen={onChangeGen}
            />
          </div>
          <div className="flex flex-col justify-center">
            <MdArrowRightAlt size={80} />
          </div>
          <div className="flex flex-col justify-center w-1/2 h-full">
            <CoinInputWithBalance
              title={usdhTitle}
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

const MintOrRedeem: React.FC<Props> = ({ type }) => {
  return (
    <div className="flex flex-col w-full h-full text-white">
      <Header />
      <Content type={type} />
    </div>
  );
};

export default MintOrRedeem;
