import { Coin, coinToLogo } from '@/constants/coin';
import { useSidebarContext } from '@/pages/Sidebar';
import AddComponent from '../AddComponent';
import Icon from '../Icon';
import IconButton from '../IconButton';
import CoinCard from '../CoinCard';
import TopCoins from '../TopCoins';
import TVGraph from '../TVGraph';
import CRGraph from '../CRGraph';
import CoinGraph from '../CoinGraph';
import Satisfication from '../Satisfaction';
import VeHASSupply from '../VeHASSupply';
import GaugePieChart from '../GaugePieChart';
import AMOs from '../AMOs';
import CoinTable from '../CoinTable';

const coinData: {
  id: number;
  coin?: Coin;
  name: string;
  description: string;
  price: number;
  rise: boolean;
  stable: boolean;
}[] = [
  {
    id: 1,
    coin: 'USDH',
    name: 'USDH',
    description: 'USD Hayek',
    rise: true,
    price: 1,
    stable: true,
  },
  {
    id: 2,
    coin: 'HAYEK',
    name: 'HAYEK',
    description: 'Government token',
    rise: true,
    price: 590,
    stable: false,
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

const Content: React.FC = () => {
  return (
    <>
      <div className="w-full sm:flex p-2 items-end">
        {/* <div className="sm:flex-grow flex justify-between">
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
        </div> */}
      </div>
      {coinData.map(({ id, coin, name, price, description, rise, stable }) => (
        <CoinCard
          key={id}
          id={id}
          name={name}
          position={description}
          transactionAmount={price}
          rise={rise}
          Img={coin ? coinToLogo[coin] : undefined}
          stable={stable}
        />
      ))}

      <div className="w-full lg:w-1/3 flex flex-col justify-between p-2">
        <div className="rounded-lg bg-card flex flex-row items-center justify-center h-24 p-2 text-xs text-white">
          <div className="flex flex-col items-center">
            <span className="">Funding Rate</span>
            <span className="font-bold">12.21%</span>
          </div>
          <span className="w-5" />
          <div className="flex flex-col items-center">
            <span className="">AMOs</span>
            <span className="font-bold">$8.90M</span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:w-2/3">
        <CoinGraph coin="USDH" />
        {/* <CoinGraph coin="EURH" />
        <CoinGraph coin="JPYH" />
        <CoinGraph coin="AUDH" />
        <CoinGraph coin="GBPH" />
        <CoinGraph coin="CHFH" /> */}

        <TVGraph />
      </div>

      <div className="w-full flex flex-col lg:w-1/3">
        {/* <div className="w-full p-2">
          <div className="rounded-lg bg-card h-80">
            <TopCoins />
          </div>
        </div> */}

        <CoinTable />

        {/* <div className="w-full p-2">
          <div className="rounded-lg bg-card h-80">
            <Satisfication />
          </div>
        </div> */}

        {/* <CRGraph /> */}

        {/* <TVGraph /> */}

        <VeHASSupply />

        {/* <div className="w-full p-2">
          <div className="rounded-lg bg-card overflow-hidden h-80">
            <AddComponent />
          </div>
        </div> */}
      </div>

      <div className="w-full m-2 border border-solid border-hblack-3" />

      <GaugePieChart />

      <div className="w-full m-2 border border-solid border-hblack-3" />

      <AMOs />
    </>
  );
};

export default Content;
