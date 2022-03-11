import { Coin, coinToLogo } from '@/constants/coin';
import { useSidebarContext } from '@/pages/Sidebar';
import AddComponent from '../AddComponent';
import Graph from '../Graph';
import Icon from '../Icon';
import IconButton from '../IconButton';
import CoinCard from '../CoinCard';
import Satisfication from '../Satisfaction';
import Segmentation from '../Segmentation';
import TopCoins from '../TopCoins';

const coinData: {
  id: number;
  coin?: Coin;
  name: string;
  description: string;
  price: number;
  rise: boolean;
}[] = [
  {
    id: 1,
    coin: 'USDH',
    name: 'USDH',
    description: 'Algorithmic stable coin',
    rise: true,
    price: 3490,
  },
  {
    id: 2,
    coin: 'HAS',
    name: 'HAS',
    description: 'Government token',
    rise: true,
    price: 590,
  },
];

const SidebarShowButton = () => {
  const { setSidebarVisible } = useSidebarContext();
  return (
    <IconButton
      icon="res-react-dash-sidebar-open"
      className="block sm:hidden"
      onClick={() => {
        setSidebarVisible((prev) => !prev);
      }}
    />
  );
};

const CoinGraph: React.FC<{ coin: Coin }> = ({ coin }) => {
  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card sm:h-80 h-60">
        <Graph coin={coin} />
      </div>
    </div>
  );
};

const Content: React.FC = () => {
  return (
    <>
      <div className="w-full sm:flex p-2 items-end">
        <div className="sm:flex-grow flex justify-between">
          <div className="">
            <div className="flex items-center">
              <div className="flex items-center p-2 bg-card rounded-xl">
                <Icon path="res-react-dash-premium-star" />
                <div className="ml-2 font-bold text-premium-yellow">
                  PREMIUM
                </div>
              </div>
            </div>
            <div className="ml-2 mt-1 flex items-center">
              <Icon path="res-react-dash-date-indicator" className="w-3 h-3" />
              <div className="ml-2">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
          <SidebarShowButton />
        </div>
      </div>
      {coinData.map(({ id, coin, name, price, description, rise }) => (
        <CoinCard
          key={id}
          id={id}
          name={name}
          position={description}
          transactionAmount={price}
          rise={rise}
          Img={coin ? coinToLogo[coin] : undefined}
        />
      ))}

      <div className="w-full lg:w-1/3 flex flex-col justify-between p-2">
        <div className="rounded-lg bg-card flex flex-col items-center justify-center h-10 md:mb-2 p-2 text-xs">
          <span className="text-white font-bold">COLLATERAL RATIO</span>
          <span>85.00%</span>
        </div>
        <div className="rounded-lg bg-card flex flex-col items-center justify-center h-10 md:mt-2 p-2 text-xs">
          <span className="text-white font-bold">DECENTRALIZATION RATIO</span>
          <span>27.84%</span>
        </div>
      </div>

      <div className="w-full flex flex-col lg:w-2/3">
        <CoinGraph coin="USDH" />
        <CoinGraph coin="EURH" />
        <CoinGraph coin="JPYH" />
        <CoinGraph coin="AUDH" />
        <CoinGraph coin="GBPH" />
        <CoinGraph coin="CHFH" />
      </div>

      <div className="w-full flex flex-col lg:w-1/3">
        <div className="w-full p-2">
          <div className="rounded-lg bg-card h-80">
            <TopCoins />
          </div>
        </div>

        <div className="w-full p-2">
          <div className="rounded-lg bg-card h-80">
            <Segmentation />
          </div>
        </div>
        <div className="w-full p-2">
          <div className="rounded-lg bg-card h-80">
            <Satisfication />
          </div>
        </div>
        <div className="w-full p-2">
          <div className="rounded-lg bg-card overflow-hidden h-80">
            <AddComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
