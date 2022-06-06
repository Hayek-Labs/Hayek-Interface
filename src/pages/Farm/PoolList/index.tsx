import { pools } from '@/constants/mockPools';
import { useSeeMore } from '@/hooks/useSeeMore';
import LPStakeDisplay from './LPStakeDisplay';
import { Tabs as AntTabs } from 'antd';
import { useFarmState } from '@/providers/StateProvider';
const { TabPane: AntTabPane } = AntTabs;

const PoolList = () => {
  const { elementsDisplayed, increment, reset, allElementsVisible } =
    useSeeMore(pools, 5, 5);

  const { onlyShowStakedFarms, setOnlyShowStakedFarms } = useFarmState();

  return (
    <>
      <AntTabs
        defaultActiveKey="1"
        type="card"
        size="middle"
        tabBarGutter={0}
        onChange={(val) => setOnlyShowStakedFarms(val === '2')}
      >
        <AntTabPane tab="All Farms" key="1"></AntTabPane>
        <AntTabPane tab="Staked Farms" key="2"></AntTabPane>
      </AntTabs>
      <div className="flex flex-col justify-start text-lg gap-y-2 px-4 pt-2">
        {elementsDisplayed.map((pool) => (
          <LPStakeDisplay
            key={pool.name + pool.coin1 + pool.coin2}
            pool={pool}
            staked={onlyShowStakedFarms}
          />
        ))}
        {allElementsVisible ? (
          <div onClick={() => reset()}>See less...</div>
        ) : (
          <div onClick={() => increment()}>See more...</div>
        )}
      </div>
    </>
  );
};

export default PoolList;
