import { Coin, coinToLogo } from '@/constants/coin';
import clsx from 'clsx';

const PoolIcon: React.FC<
  { coin1: Coin; coin2: Coin; size: number } & JSX.IntrinsicElements['div']
> = ({ coin1, coin2, size = 15, ...props }) => {
  const Logo1 = coinToLogo[coin1];
  const Logo2 = coinToLogo[coin2];
  return (
    <div {...props} className={clsx('flex flex-row relative', props.className)}>
      <Logo1 width={size} height={size} className="z-10" />
      <Logo2 width={size} height={size} className="absolute left-1/2" />
    </div>
  );
};

export default PoolIcon;
