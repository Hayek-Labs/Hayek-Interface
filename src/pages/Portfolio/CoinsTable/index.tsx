import { Coin, coinToLogo } from '@/constants/coin';
import clsx from 'clsx';
import styles from './styles.less';

const CoinData: {
  coin: Coin;
  price: number;
  pool: number;
  wallet: number;
  weight: number;
}[] = [
  { coin: 'USDT', price: 1.0, pool: 219.56, wallet: 988401.19, weight: 0.1953 },
  { coin: 'BUSD', price: 1.0, pool: 633.15, wallet: 59762.0, weight: 0.5632 },
  {
    coin: 'ETH',
    price: 1333.12,
    pool: 1729.85,
    wallet: 99988.9,
    weight: 1.5389,
  },
  {
    coin: 'BTC',
    price: 19484.58,
    pool: 109816.53,
    wallet: 99872.09,
    weight: 97.7003,
  },
  { coin: 'BNB', price: 278.61, pool: 2.23, wallet: 5.75, weight: 0.0019 },
];

const CoinsTable = () => {
  return (
    <div
      className={clsx(
        'w-full lg:w-full p-2 flex flex-col items-center justify-center',
        styles['styles'],
      )}
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold mb-2">Portfolio</div>
      </div>
      <div className="rounded-md bg-hblack-2 w-4/12 px-2">
        <div className="coin-display-table-row">
          <span>Name</span>
          <span>Price</span>
          <span>Pool</span>
          <span>Wallet</span>
          <span>Weight</span>
        </div>
        {CoinData.map(({ coin, price, pool, wallet, weight }) => {
          const Logo = coinToLogo[coin];
          return (
            <div className="coin-display-table-row">
              <span>
                <Logo className="mx-2 w-5 h-5" />
                <span className="text-white">{coin}</span>
              </span>
              <span>${price.toFixed(2)}</span>
              <span>${pool.toFixed(2)}</span>
              <span>${wallet.toFixed(2)}</span>
              <span>{weight.toFixed(4)}%</span>
            </div>
            // <div className="flex items-center mt-3" key={id}>
            //   <div className="">{id}</div>
            //   <Logo className="ml-2 w-6 h-6" />
            //   <div className="ml-2">{coin}</div>
            //   <div className="flex-grow" />
            //   <div className="">{`$${price.toLocaleString()}`}</div>
            //   <div className="ml-2">{`$${pool.toLocaleString()}`}</div>
            //   <div className="ml-2">{`${wallet.toLocaleString()} ${coin}`}</div>
            //   <div className="mx-2">{`${weight.toLocaleString()}%`}</div>
            //   <Icon path="res-react-dash-options" className="w-2 h-2" />
            // </div>
          );
        })}
      </div>

      <div className="flex-grow" />
    </div>
  );
};
export default CoinsTable;
