import Button from '@/components/Button';
import CoinCard from '@/components/CoinCard';
import ConnectDefaultBtn from '@/components/ConnectDefaultBtn';
import { Coin } from '@/constants/coin';
import { VeHASState } from '@/state/veHAS';
import BigNumber from 'bignumber.js';
import { MdArrowDownward } from 'react-icons/md';
import { Slider, InputNumber } from 'antd';
import styles from './styles.less';
import clsx from 'clsx';

const LockHASDisplay: React.FC<{ state: VeHASState }> = ({ state }) => {
  const {
    HASCoinValue,
    setHASCoinValue,
    veHASCoinValue,
    setVeHASCoinValue,
    lockPeriod,
    setLockPeriod,
    setMode,
  } = state;

  const HASSelect = {
    selectFrom: ['HAS' as Coin],
    canSelect: false,
  };

  const veHASSelect = {
    selectFrom: ['veHAS' as Coin],
    canSelect: false,
  };

  const HASBalance = new BigNumber(0.0);
  const veHASBalance = new BigNumber(0.0);

  return (
    <div className="h-[22.5rem] pt-2">
      <div className="flex flex-col items-center">
        <CoinCard
          coin="HAS"
          input={{
            value: HASCoinValue,
            setValue: setHASCoinValue,
            canInput: true,
          }}
          select={HASSelect}
          balance={HASBalance}
        />
        <div className="h-2" />

        <div className={clsx('flex flex-row items-center', styles['styles'])}>
          Lock Period:{' '}
          <InputNumber
            bordered={false}
            controls={false}
            value={lockPeriod.toNumber()}
            onChange={(val) => {
              setLockPeriod(new BigNumber(val));
            }}
            min={2}
            max={365 * 4}
          />
          Days
        </div>
        <div className={clsx('px-4 w-full', styles['styles'])}>
          <Slider
            value={lockPeriod.toNumber()}
            onChange={(val) => {
              setLockPeriod(new BigNumber(val));
            }}
            range={false}
            min={2}
            max={365 * 4}
            className="w-full"
            trackStyle={{
              backgroundColor: '#f7b91c',
            }}
            handleStyle={{
              border: '2px solid #f7b91c',
            }}
          />
        </div>
        <MdArrowDownward size={30} className="mb-4" />
        <CoinCard
          coin="veHAS"
          input={{
            value: veHASCoinValue,
            setValue: setVeHASCoinValue,
            canInput: false,
          }}
          select={veHASSelect}
          balance={veHASBalance}
        />
        <div className="h-2" />
        <ConnectDefaultBtn onConnected={<Button>Lock</Button>} />
      </div>
    </div>
  );
};

export default LockHASDisplay;
