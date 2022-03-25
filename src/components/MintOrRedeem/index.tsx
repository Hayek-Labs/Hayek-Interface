import { BsPlusLg } from 'react-icons/bs';
import clsx from 'clsx';
import Button from '../Button';
import { ReactComponent as RedeemIcon } from '@/assets/icons/redeem-original.svg';
import { ReactComponent as MintIcon } from '@/assets/icons/mint-original.svg';
import styles from './styles.less';
import {
  HASCoinCard,
  ForeignStableCoinCard,
  NativeStableCoinCard,
} from './CoinDisplay';

interface Props {
  type: 'mint' | 'redeem';
}

const Card: React.FC<Props> = ({ type }) => {
  const isMint = type === 'mint';
  const pageText = isMint ? 'MINT' : 'REDEEM';

  const ConversionIcon = isMint ? MintIcon : RedeemIcon;
  const conversionIconSize = 20;
  return (
    <div className="bg-card w-96 flex flex-col justify-center px-4 pt-2 pb-6 rounded-lg">
      <span className="font-bold text-center text-md mb-2 text-hblack-4">
        {pageText}
      </span>
      <div
        className={clsx(
          'flex w-full',
          isMint ? 'flex-col' : 'flex-col-reverse',
        )}
      >
        <div className="flex flex-col justify-center w-full p-2 rounded-lg">
          {!isMint ? (
            <>
              <HASCoinCard isMint={isMint} />
              <BsPlusLg size={15} className="self-center my-2 fill-hblack-4" />
              <ForeignStableCoinCard isMint={isMint} />
            </>
          ) : (
            <>
              <ForeignStableCoinCard isMint={isMint} />
              <BsPlusLg size={15} className="self-center my-2 fill-hblack-4" />
              <HASCoinCard isMint={isMint} />
            </>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className={styles['icon-container']}>
            <ConversionIcon
              width={conversionIconSize}
              height={conversionIconSize}
              className="self-center my-2 fill-hblack-4 rotate-180"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center w-full">
          <NativeStableCoinCard isMint={isMint} />
        </div>
      </div>
      <div className="h-6" />
      <div className="w-full flex flex-row justify-center">
        <Button>Connect Wallet</Button>
      </div>
    </div>
  );
};

const MintOrRedeem: React.FC<Props> = ({ type }) => {
  return (
    <div className="flex flex-col w-full h-full text-white">
      <div className="flex-1 w-full flex flex-col text-center py-2 justify-center items-center">
        <Card type={type} />
      </div>
    </div>
  );
};

export default MintOrRedeem;
