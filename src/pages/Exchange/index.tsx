import CoinInputWithBalance from '@/components/CoinInputWithBalance';
import { useNumberInputOnChangeGenerator } from '@/components/Input';
import KChart from '@/components/KChart';
import clsx from 'clsx';
import { MdArrowDownward } from 'react-icons/md';

const Content = () => {
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
        <span className="font-bold text-center text-2xl pt-2">Exchange</span>
        <div className={clsx('flex flex-col w-full items-center')}>
          <div className="flex flex-col justify-center w-full py-1">
            <CoinInputWithBalance
              title="FROM"
              coin="USDT"
              onChangeGen={onChangeGen}
            />
          </div>
          <div className="flex flex-col justify-center">
            <MdArrowDownward size={30} />
          </div>
          <div className="flex flex-col justify-center w-full py-1">
            <CoinInputWithBalance
              title="TO"
              coin="DAI"
              onChangeGen={onChangeGen}
            />
          </div>
        </div>
        <div className="h-2" />
        <div className="w-full flex flex-row justify-center">
          <Button>APPROVE</Button>
          <div className="w-2" />
          <Button>EXCHANGE</Button>
        </div>
      </div>
    </div>
  );
};

const Exchange = () => {
  return (
    <div className="flex flex-row items-center w-full h-full text-white">
      <KChart />
      <Content />
    </div>
  );
};

export default Exchange;
