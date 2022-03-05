import clsx from 'clsx';
import { useSpring, animated } from 'react-spring';
import Icon from '../Icon';

interface Props {
  id: number;
  name: string;
  position: string;
  transactionAmount: number;
  rise: boolean;
  Img: SVGComponent | undefined;
}

const CoinCard: React.FC<Props> = ({
  name,
  position,
  transactionAmount,
  rise,
  Img,
}) => {
  const { transactions } = useSpring({
    transactions: transactionAmount,
    barPlayhead: 1,
    from: { transactions: 0, barPlayhead: 0 },
  });
  return (
    <div className="w-full p-2 lg:w-1/3">
      <div className="rounded-lg bg-card flex justify-between p-3 h-24">
        <div className="flex items-center">
          {Img && <Img className="w-10 h-10" />}
          <div className="ml-2">
            <div className="flex items-center">
              <div className="mr-2 font-bold text-white">{name}</div>
              <Icon path="res-react-dash-tick" />
            </div>
            <div className="text-sm ">{position}</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Icon
            path={rise ? 'res-react-dash-bull' : 'res-react-dash-bear'}
            className="w-8 h-8"
          />
          <animated.div
            className={clsx(
              rise ? 'text-green-500' : 'text-red-500',
              'font-bold',
              'text-lg',
            )}
          >
            {transactions.interpolate((i) => `$${i.toFixed(2)}`)}
          </animated.div>
          <div className="text-sm">Recent price</div>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
