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
  Coin0Card,
  Coin1Card,
} from './CoinDisplay';
import { useMintOrRedeemState } from '@/providers/StateProvider';
import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import ConnectDefaultBtn from '../ConnectDefaultBtn';
import Icon from '@/pages/Home/Icon';

const mappingFromHas = (
  hasValue: BigNumber,
  hasPrice: BigNumber,
  nativePrice: BigNumber,
  foreignPrice: BigNumber,
  collateralRatio: BigNumber,
) => {
  const hasValueFiat = hasValue.times(hasPrice);

  const nativeValueFiat = hasValueFiat.div(
    new BigNumber(1.0).minus(collateralRatio),
  );
  const native = nativeValueFiat.div(nativePrice);

  const foreignValueFiat = nativeValueFiat.times(collateralRatio);
  const foreign = foreignValueFiat.div(foreignPrice);

  return {
    foreign,
    native,
    has: hasValue,
  };
};

const mappingFromNative = (
  nativeValue: BigNumber,
  nativePrice: BigNumber,
  foreignPrice: BigNumber,
  hasPrice: BigNumber,
  collateralRatio: BigNumber,
) => {
  const nativeValueFiat = nativeValue.times(nativePrice);

  const foreignValueFiat = nativeValueFiat.times(collateralRatio);
  const foreign = foreignValueFiat.div(foreignPrice);

  const has = nativeValueFiat
    .times(new BigNumber(1.0).minus(collateralRatio))
    .div(hasPrice);

  return {
    foreign,
    has,
    native: nativeValue,
  };
};

const mappingFromForeign = (
  foreignValue: BigNumber,
  foreignPrice: BigNumber,
  nativePrice: BigNumber,
  hasPrice: BigNumber,
  collateralRatio: BigNumber,
) => {
  const foreignValueFiat = foreignValue.times(foreignPrice);

  const nativeValueFiat = foreignValueFiat.div(collateralRatio);
  const native = nativeValueFiat.div(nativePrice);

  const has = nativeValueFiat
    .times(new BigNumber(1.0).minus(collateralRatio))
    .div(hasPrice);

  return {
    native,
    has,
    foreign: foreignValue,
  };
};

const useCoinValueMapping = (isMint: boolean) => {
  const {
    independentCoin,
    setIndependentCoin,
    foreignStableCoin,
    nativeStableCoin,
    HASCoinValue,
    foreignStableCoinValue,
    nativeStableCoinValue,
    setHASCoinValue,
    setForeignStableCoinValue,
    setNativeStableCoinValue,
  } = useMintOrRedeemState();

  useEffect(() => {
    setIndependentCoin(isMint ? 'foreign' : 'native');
  }, [isMint, setIndependentCoin]);

  const [nativePrice] = useState(new BigNumber('1.01'));
  const [foreignPrice] = useState(new BigNumber('0.99'));
  const [hasPrice] = useState(new BigNumber('1.5'));
  const [collateralRatio] = useState(new BigNumber(0.8));

  useEffect(() => {
    if (independentCoin === 'has') {
      const mapping = mappingFromHas(
        HASCoinValue,
        hasPrice,
        nativePrice,
        foreignPrice,
        collateralRatio,
      );
      setForeignStableCoinValue(mapping.foreign);
      setNativeStableCoinValue(mapping.native);
    }
  }, [
    HASCoinValue,
    hasPrice,
    independentCoin,
    setForeignStableCoinValue,
    setNativeStableCoinValue,
    collateralRatio,
    nativePrice,
    foreignPrice,
  ]);

  useEffect(() => {
    if (independentCoin === 'native') {
      const mapping = mappingFromNative(
        nativeStableCoinValue,
        nativePrice,
        foreignPrice,
        hasPrice,
        collateralRatio,
      );
      setForeignStableCoinValue(mapping.foreign);
      setHASCoinValue(mapping.has);
    }
  }, [
    independentCoin,
    nativePrice,
    nativeStableCoinValue,
    setForeignStableCoinValue,
    setHASCoinValue,
    collateralRatio,
    foreignPrice,
    hasPrice,
  ]);

  useEffect(() => {
    if (independentCoin === 'foreign') {
      const mapping = mappingFromForeign(
        foreignStableCoinValue,
        foreignPrice,
        nativePrice,
        hasPrice,
        collateralRatio,
      );
      setNativeStableCoinValue(mapping.native);
      setHASCoinValue(mapping.has);
    }
  }, [
    foreignPrice,
    foreignStableCoinValue,
    independentCoin,
    setHASCoinValue,
    setNativeStableCoinValue,
    collateralRatio,
    nativePrice,
    hasPrice,
  ]);

  return null;
};

const modeTabs = [
  {
    label: 'Mint',
    render: null,
  },
  {
    label: 'Redeem',
    render: null,
  },
];

const Card: React.FC<{ mode: 'mint' | 'redeem' }> = ({ mode }) => {
  // const [mode, setMode] = useState<'mint' | 'redeem'>('mint');
  const isMint = mode === 'mint';
  const pageText = isMint ? 'MINT' : 'REDEEM';

  useCoinValueMapping(isMint);

  // const ConversionIcon = isMint ? MintIcon : RedeemIcon;
  // const conversionIconSize = 20;

  // const modeTabsOnChange = useCallback(
  //   (val) => setMode(val === 0 ? 'mint' : 'redeem'),
  //   [setMode],
  // );

  return (
    <div className="bg-card w-1/3 flex flex-col justify-center px-4 pt-2 pb-4 rounded-lg">
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
              {/* <HASCoinCard isMint={isMint} /> */}
              {/* <BsPlusLg size={15} className="self-center my-2 fill-hblack-4" /> */}
              <Coin0Card isMint={isMint} />
            </>
          ) : (
            <>
              <Coin0Card isMint={isMint} canSelect={true} />
              {/* <div className="h-2" />
              <Coin1Card isMint={isMint} canSelect={false} /> */}
              {/* <BsPlusLg size={15} className="self-center my-2 fill-hblack-4" /> */}
              {/* <HASCoinCard isMint={isMint} /> */}
            </>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className={styles['icon-container']}>
            {/* <ConversionIcon
              width={conversionIconSize}
              height={conversionIconSize}
              className="self-center my-2 fill-hblack-4 rotate-180"
            /> */}
            <svg
              className="self-center my-2 fill-hblack-4"
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="arrow-down"
              width="1.5em"
              height="1.5em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full">
          <NativeStableCoinCard isMint={isMint} />
        </div>
      </div>
      <div className="h-6" />
      <div className="w-full flex flex-row justify-center">
        <ConnectDefaultBtn
          onConnected={<Button>{isMint ? 'Mint' : 'Redeem'}</Button>}
        />
      </div>
    </div>
  );
};

const MintRedeem: React.FC<{ mode: 'mint' | 'redeem' }> = ({ mode }) => {
  return (
    <div className="flex flex-col w-full h-full text-white">
      <div className="flex-1 w-full flex flex-col text-center p-4 sm:p-2 justify-center items-center">
        <Card mode={mode} />
      </div>
    </div>
  );
};

export default MintRedeem;
