import Button from '@/components/Button';
import CoinCard from '@/components/CoinCard';
import PoolInfo from '@/components/PoolInfo';
import { Pool, pools } from '@/constants/mockPools';
import { useSeeMore } from '@/hooks/useSeeMore';
import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import { MdExpandMore } from 'react-icons/md';
import { useState } from 'react';

interface PoolDisplayProps {
  pool: Pool;
}
const PoolDisplay: React.FC<PoolDisplayProps> = ({ pool }) => {
  const [stakingVisible, setStakingVisible] = useState(false);
  const [value, setValue] = useState(new BigNumber(0));
  const lp = {
    coin1: pool.coin1,
    coin2: pool.coin2,
    platform: pool.name,
  };
  return (
    <div className="mx-2 rounded-lg bg-hblack-2 px-4 py-2 flex flex-col justify-center items-start">
      <div className="flex flex-row justify-start w-full">
        <PoolInfo pool={pool} size="lg" />
        <div
          className="ml-auto flex flex-row items-center cursor-pointer"
          onClick={() => setStakingVisible((prev) => !prev)}
        >
          <MdExpandMore
            size={20}
            className={clsx('main-trans', stakingVisible ? 'rotate-180' : '')}
          />
        </div>
      </div>
      <div
        className={clsx(
          'w-full main-trans overflow-hidden',
          stakingVisible ? 'h-[150px]' : 'h-0',
        )}
      >
        {stakingVisible && (
          <>
            <div className="h-3" />
            <CoinCard
              coin={lp}
              input={{ value, setValue, canInput: true }}
              select={{
                canSelect: false,
                selectFrom: [lp],
              }}
              balance={new BigNumber(0)}
            />
            <Button className="self-center w-full bg-hblack-3 px-2 py-1 mt-2 rounded-lg text-white">
              Stake
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const PoolList = () => {
  const { elementsDisplayed, increment, reset, allElementsVisible } =
    useSeeMore(pools, 5, 5);
  return (
    <div className="flex flex-col justify-start text-lg gap-y-2">
      {elementsDisplayed.map((pool) => (
        <PoolDisplay key={pool.name + pool.coin1 + pool.coin2} pool={pool} />
      ))}
      {allElementsVisible ? (
        <div onClick={() => reset()}>See less...</div>
      ) : (
        <div onClick={() => increment()}>See more...</div>
      )}
    </div>
  );
};

export default PoolList;
