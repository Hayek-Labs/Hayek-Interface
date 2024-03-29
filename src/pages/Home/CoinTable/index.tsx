import { Coin, coinToLogo } from '@/constants/coin';
import clsx from 'clsx';
import Icon from '../Icon';
import styles from './styles.less';

const CoinData: {
  coin: Coin;
  price: number;
  pool: number;
  weight: number;
  id: number;
}[] = [
  {
    coin: 'BTC',
    price: 19484.58,
    pool: 109816.53,
    weight: 97.7003,
    id: 1,
  },
  {
    coin: 'ETH',
    price: 1333.12,
    pool: 1729.85,
    weight: 1.5389,
    id: 2,
  },

  {
    coin: 'USDT',
    price: 1.0,
    pool: 219.56,
    weight: 0.1953,
    id: 3,
  },
  {
    coin: 'DAI',
    price: 0.99,
    pool: 289.62,
    weight: 0.2336,
    id: 4,
  },
  {
    coin: 'USDC',
    price: 1.0,
    pool: 219.56,
    weight: 0.1953,
    id: 5,
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
          <div className="text-white font-bold">Collateral</div>
        </div>
        <div className="coin-display-table-row">
          <span>Name</span>
          <span>Price</span>
          <span>Pool</span>
          <span>Weight</span>
        </div>
        {CoinData.map(({ coin, price, pool, weight, id }) => {
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
