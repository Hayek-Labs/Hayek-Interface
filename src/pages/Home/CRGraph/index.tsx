import CoinNameIcon from '@/components/CoinNameIcon';
import LineChart from '@/components/LineChart';
import { NativeStableCoin, supportedNativeStableCoins } from '@/constants/coin';
import clsx from 'clsx';
import { useState } from 'react';
import HomeRenderIfVisible from '../HomeRenderIfVisible';
import Icon from '../Icon';

const CoinBtn: React.FC<{
  coin: NativeStableCoin;
  onChange: (coin: NativeStableCoin) => void;
  selected: boolean;
}> = ({ coin, onChange, selected }) => {
  return (
    <CoinNameIcon
      className={clsx(
        'flex flex-row items-center cursor-pointer text-sm',
        selected ? 'text-white' : '',
      )}
      coin={coin}
      size={14}
      onClick={() => {
        onChange(coin);
      }}
    />
  );
};

const CRGraph: React.FC = () => {
  const [poolCoin, setPoolCoin] = useState<NativeStableCoin>('USDH');
  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-80">
        <div className="flex p-4 h-full flex-col">
          <div>
            <div className="flex flex-row items-center">
              <span className="font-bold text-white inline-flex flex-row items-center">
                {poolCoin} Collateral Ratio
              </span>
              <div className="flex-grow" />

              <Icon path="res-react-dash-graph-range" className="w-4 h-4" />
              <div className="ml-2">Last 9 Months</div>
              <div className="ml-6 w-5 h-5 flex justify-center items-center rounded-full icon-background">
                ?
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-1 my-1">
              {supportedNativeStableCoins.map((coin) => (
                <CoinBtn
                  key={coin}
                  coin={coin as NativeStableCoin}
                  onChange={(newCoin) => {
                    setPoolCoin(newCoin);
                  }}
                  selected={poolCoin === coin}
                />
              ))}
            </div>
            <div className="font-bold ml-5">Nov - July</div>
          </div>
          <HomeRenderIfVisible height="320px">
            <LineChart key={poolCoin} />
          </HomeRenderIfVisible>
        </div>
      </div>
    </div>
  );
};

export default CRGraph;
