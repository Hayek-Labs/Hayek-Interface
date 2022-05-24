import { Coin, coinToLogo } from '@/constants/coin';
import LineChart from '@/components/LineChart';

import Icon from '../Icon';
import HomeRenderIfVisible from '../HomeRenderIfVisible';

const Graph: React.FC<{ coin: Coin }> = ({ coin }) => {
  const Logo = coinToLogo[coin];
  const logoSize = 22;

  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <span className="font-bold text-white inline-flex flex-row items-center">
            <Logo width={logoSize} height={logoSize} className="mr-1" /> {coin}
          </span>
          <div className="flex-grow" />

          <Icon path="res-react-dash-graph-range" className="w-4 h-4" />
          <div className="ml-2">Last 9 Months</div>
          <div className="ml-6 w-5 h-5 flex justify-center items-center rounded-full icon-background">
            ?
          </div>
        </div>
        <div className="font-bold ml-5">Nov - July</div>
      </div>
      <HomeRenderIfVisible height="320px">
        <LineChart />
      </HomeRenderIfVisible>
    </div>
  );
};

export default Graph;
