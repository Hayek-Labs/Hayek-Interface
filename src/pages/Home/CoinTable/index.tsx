import { Coin, coinToLogo } from '@/constants/coin';
import clsx from 'clsx';
import Icon from '../Icon';
import styles from './styles.less';

const CoinData: {
  coin: Coin;
  price: number;
  pool: number;
  wallet: number;
  weight: number;
  id: number;
}[] = [
  {
    coin: 'USDT',
    price: 1.0,
    pool: 219.56,
    wallet: 988401.19,
    weight: 0.1953,
    id: 1,
  },
  {
    coin: 'DAI',
    price: 0.99,
    pool: 289.62,
    wallet: 5785.3,
    weight: 0.2336,
    id: 2,
  },
  {
    coin: 'BUSD',
    price: 1.0,
    pool: 523.85,
    wallet: 6845.0,
    weight: 0.0178,
    id: 3,
  },
  {
    coin: 'USDC',
    price: 1.0,
    pool: 219.56,
    wallet: 988401.19,
    weight: 0.1953,
    id: 4,
  },
  {
    coin: 'ETH',
    price: 1333.12,
    pool: 1729.85,
    wallet: 99988.9,
    weight: 1.5389,
    id: 5,
  },
  {
    coin: 'BTC',
    price: 19484.58,
    pool: 109816.53,
    wallet: 99872.09,
    weight: 97.7003,
    id: 6,
  },
  {
    coin: 'BNB',
    price: 278.61,
    pool: 2.23,
    wallet: 5.75,
    weight: 0.0019,
    id: 7,
  },
];

const CoinTable = () => {
  return (
    <div
      className={clsx(
        'w-full lg:w-full p-2 flex flex-col items-center justify-center',
        styles['styles'],
      )}
    >
      <div className="rounded-lg bg-card px-2 w-full py-2">
        <div className="flex justify-between items-center p-2">
          <div className="text-white font-bold">Top Coins</div>
          <Icon path="res-react-dash-plus" className="w-5 h-5" />
        </div>
        <div className="coin-display-table-row">
          <span>Name</span>
          <span>Price</span>
          <span>Pool</span>
          <span>Wallet</span>
          <span>Weight</span>
        </div>
        {CoinData.map(({ coin, price, pool, wallet, weight, id }) => {
          const Logo = coinToLogo[coin];
          return (
            <div className="coin-display-table-row">
              <span>
                <span className="mr-2">{id}</span>
                <Logo className="mx-2 w-5 h-5" />
                <span className="text-white">{coin}</span>
              </span>
              <span>${price.toFixed(2)}</span>
              <span>${pool.toFixed(2)}</span>
              <span>${wallet.toFixed(2)}</span>
              <span>{weight.toFixed(4)}%</span>
            </div>
          );
        })}
      </div>

      <div className="flex-grow" />
    </div>
  );
};
export default CoinTable;
