import Button from '@/components/Button';
import CoinCard from '@/components/CoinCard';
import ConnectDefaultBtn from '@/components/ConnectDefaultBtn';
import { Coin } from '@/constants/coin';
import { VeHASState } from '@/state/veHAS';
import BigNumber from 'bignumber.js';
import { Slider, InputNumber } from 'antd';
import styles from './styles.less';
import clsx from 'clsx';
import { BsArrowDown } from 'react-icons/bs';

const LockHASDisplay: React.FC<{ state: VeHASState }> = ({ state }) => {
  const {
    HASCoinValue,
    setHASCoinValue,
    veHASCoinValue,
    setVeHASCoinValue,
    lockPeriod,
    setLockPeriod,
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
    <div className="h-[26rem] pt-2">
      <div className="flex flex-col items-center h-full pb-2">
        <div className="flex-grow" />
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
        <div
          className={clsx(
            'flex flex-row items-center w-full',
            styles['styles'],
          )}
        >
          <div className="text-left text-hblack-4 mr-4">Lock Period</div>
          <Slider
            value={lockPeriod.toNumber()}
            onChange={(val) => {
              setLockPeriod(new BigNumber(val));
            }}
            range={false}
            min={2}
            max={365 * 4}
            className="w-40"
            trackStyle={{
              backgroundColor: '#f7b91c',
            }}
            handleStyle={{
              border: '2px solid #f7b91c',
            }}
          />
          <div className="flex-1" />
          <InputNumber
            bordered={false}
            controls={false}
            value={lockPeriod.toNumber()}
            onChange={(val) => {
              setLockPeriod(new BigNumber(val));
            }}
            min={2}
            max={365 * 4}
            size="small"
          />
          <div className="w-1" />
          <span className="text-hblack-4">Days</span>
        </div>
        <div className="flex-grow" />
        <BsArrowDown size={30} className="mb-4 fill-hblack-4" />
        <div className="flex-grow" />
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
        <div className="h-4 flex-grow" />
        <ConnectDefaultBtn onConnected={<Button>Lock</Button>} />
      </div>
    </div>
  );
};

export default LockHASDisplay;
