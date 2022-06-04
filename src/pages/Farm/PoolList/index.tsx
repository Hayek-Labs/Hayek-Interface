import PoolInfo from '@/components/PoolInfo';
import { Pool, pools } from '@/constants/mockPools';
import { useSeeMore } from '@/hooks/useSeeMore';

interface PoolDisplayProps {
  pool: Pool;
}
const PoolDisplay: React.FC<PoolDisplayProps> = ({ pool }) => {
  return (
    <div className="mx-2 rounded-lg bg-hblack-2 px-4 py-2 flex flex-col items-start gap-y-2">
      <PoolInfo pool={pool} size="lg" />
      <button className="self-center w-full bg-hblack-3 px-2 py-1 rounded-lg text-white">
        Stake
      </button>
    </div>
  );
};

const PoolList = () => {
  const { elementsDisplayed, increment, reset, allElementsVisible } =
    useSeeMore(pools, 5, 5);
  return (
    <div className="flex flex-col text-lg gap-y-2">
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
