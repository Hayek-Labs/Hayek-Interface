import { InputNumber } from 'antd';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.less';
import Button from '@/components/Button';
import ConnectDefaultBtn from '@/components/ConnectDefaultBtn';
import { Pool, pools } from '@/constants/mockPools';
import PoolInfo from '@/components/PoolInfo';
import { useSeeMore } from '@/hooks/useSeeMore';

const PoolDisplay: React.FC<{
  pool: Pool;
  weight: number;
  isConfirmed: boolean;
  setConfirmation: (address: string, confirmed: boolean) => void;
  setWeight: (address: string, newWeight: number) => void;
  unusedWeight: number;
}> = ({ pool, weight, isConfirmed, setWeight, unusedWeight }) => {
  return (
    <div className="pool-display-table-row">
      <PoolInfo pool={pool} size="sm" />
      <span>
        <InputNumber
          bordered={false}
          controls={false}
          value={weight}
          onChange={(val) => {
            setWeight(pool.address, val);
          }}
          disabled={isConfirmed}
          min={0}
          max={unusedWeight + weight}
          step={0.1}
          size="small"
        />
        <span className="ml-1 text-lg">%</span>
      </span>
    </div>
  );
};

interface VoteState {
  weights: Record<string, number>;
  confirmations: Record<string, boolean>;
}

const Votes = () => {
  const [voteState, setVoteState] = useState<VoteState>({
    weights: {},
    confirmations: {},
  });

  const setWeight = useCallback((address: string, newWeight: number) => {
    setVoteState((oldVoteState) => {
      const newVoteState: VoteState = {
        ...oldVoteState,
        weights: {
          ...oldVoteState.weights,
        },
      };

      newVoteState.weights[address] = newWeight;

      return newVoteState;
    });
  }, []);

  const setConfirmation = useCallback(
    (address: string, isConfirmed: boolean) => {
      setVoteState((oldVoteState) => {
        const newVoteState: VoteState = {
          ...oldVoteState,
          confirmations: {
            ...oldVoteState.confirmations,
          },
        };

        newVoteState.confirmations[address] = isConfirmed;

        return newVoteState;
      });
    },
    [],
  );

  useEffect(() => {
    setVoteState((prevVoteState) => {
      const voteState = {
        ...prevVoteState,
      };

      pools.forEach((pool) => {
        voteState.weights[pool.address] = 0;
      });

      return voteState;
    });
  }, []);

  const unusedWeight = useMemo(() => {
    return (
      100 -
      pools.reduce<number>((weight, pool) => {
        const val = voteState.weights[pool.address];
        return weight + (val !== undefined && val !== null ? val : 0);
      }, 0)
    );
  }, [voteState.weights]);

  const allConfirmed = useMemo(() => {
    return pools.every((pool) => voteState.confirmations[pool.address]);
  }, [voteState.confirmations]);

  const {
    elementsDisplayed: poolsInDisplay,
    increment,
    reset,
    allElementsVisible,
  } = useSeeMore(pools, 5, 5);

  return (
    <div
      className={clsx(
        'flex flex-col text-hblack-4 h-full flex-1 pb-4',
        styles['styles'],
      )}
    >
      <div className="flex flex-row mb-2">
        <span>Unused Weight:</span>
        <span className="ml-auto">{unusedWeight}%</span>
      </div>
      <div className="rounded-md bg-hblack-2 mb-4">
        <div className="pool-display-table-row">
          <span>Pool</span>
          <span>Weight</span>
        </div>
        {poolsInDisplay.map((pool) => (
          <PoolDisplay
            key={pool.address}
            pool={pool}
            weight={voteState.weights[pool.address]}
            isConfirmed={voteState.confirmations[pool.address]}
            setWeight={setWeight}
            setConfirmation={setConfirmation}
            unusedWeight={unusedWeight}
          />
        ))}
        {!allElementsVisible ? (
          <div onClick={() => increment()}>See more...</div>
        ) : (
          <div onClick={() => reset()}>See less...</div>
        )}
      </div>
      <div className="mt-auto" />
      <ConnectDefaultBtn
        onConnected={<Button disabled={!allConfirmed}>Vote</Button>}
      />
    </div>
  );
};

export default Votes;
