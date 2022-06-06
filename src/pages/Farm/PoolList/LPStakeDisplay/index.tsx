import Button from '@/components/Button';
import CoinCard from '@/components/CoinCard';
import PoolInfo from '@/components/PoolInfo';
import { Pool } from '@/constants/mockPools';
import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import { MdExpandMore } from 'react-icons/md';
import { useState } from 'react';

interface PoolDisplayProps {
  pool: Pool;
  staked: boolean;
}
const LPStakeDisplay: React.FC<PoolDisplayProps> = ({ pool, staked }) => {
  const [stakingVisible, setStakingVisible] = useState(false);
  const [value, setValue] = useState(new BigNumber(0));
  const lp = {
    coin1: pool.coin1,
    coin2: pool.coin2,
    platform: pool.name,
  };

  return (
    <div className="mx-2 rounded-lg bg-hblack-2 px-4 py-2 flex flex-col justify-center items-start">
      <div
        className="flex flex-row justify-start w-full"
        onClick={() => setStakingVisible((prev) => !prev)}
      >
        <PoolInfo pool={pool} size="lg" />
        <div className="ml-auto flex flex-row items-center cursor-pointer">
          <MdExpandMore
            size={20}
            className={clsx('main-trans', stakingVisible ? 'rotate-180' : '')}
          />
        </div>
      </div>
      <div
        className={clsx(
          'w-full main-trans overflow-hidden',
          stakingVisible ? (staked ? 'h-[150px]' : 'h-[150px]') : 'h-0',
        )}
      >
        {stakingVisible && (
          <>
            <div className="h-3" />
            <CoinCard
              coin={lp}
              input={{ value, setValue, canInput: !staked }}
              select={{
                canSelect: false,
                selectFrom: [lp],
              }}
              balance={new BigNumber(0)}
              balanceIsVisibleOverride={!staked}
            />
            <Button className="self-center w-full bg-hblack-3 px-2 py-1 mt-2 rounded-lg text-white">
              {staked ? 'Unstake' : 'Stake'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LPStakeDisplay;
