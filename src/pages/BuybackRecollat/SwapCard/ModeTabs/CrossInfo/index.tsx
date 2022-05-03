import { supportedNativeStableCoins, NativeStableCoin } from '@/constants/coin';
import { useSwapState } from '@/providers/StateProvider';
import clsx from 'clsx';
import CoinBtn from '../CoinBtn';
import styles from './styles.less';

const CrossInfo: React.FC = () => {
  const { nativeStableCoin } = useSwapState();

  return (
    <div className={clsx('flex flex-row w-full pt-2', styles['styles'])}>
      <div className="flex flex-col items-start justify-center text-hblack-4 w-32">
        Stablecoin
      </div>
      <div className="flex flex-row flex-wrap w-52 gap-y-2">
        {supportedNativeStableCoins.map((coin) => (
          <CoinBtn
            coin={coin as NativeStableCoin}
            key={coin}
            state="none"
            selected={nativeStableCoin === coin}
          />
        ))}
      </div>
    </div>
  );
};

export default CrossInfo;
