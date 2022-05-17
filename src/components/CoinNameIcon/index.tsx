import { Coin, coinToLogo } from '@/constants/coin';

const iconSize = 20;
const CoinNameIcon: React.FC<
  { coin: Coin; size?: number } & JSX.IntrinsicElements['div']
> = ({ coin, size, ...props }) => {
  const Logo = coinToLogo[coin];
  return (
    <div {...props}>
      <Logo
        width={size === undefined ? iconSize : size}
        height={size === undefined ? iconSize : size}
        className="mr-1"
      />
      <span>{coin}</span>
    </div>
  );
};

export default CoinNameIcon;
