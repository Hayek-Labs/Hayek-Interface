import Btn from '@/components/Btn';
import { InputNumber } from 'antd';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.less';

interface Pool {
  key: number;
  name: string;
  address: string;
}

const pools: Pool[] = [
  {
    key: 1,
    name: 'Uniswap V3 FRAX/USDC',
    address: '0x3EF2 ... B4B0',
  },
  {
    key: 2,
    name: 'mStable FRAX/mUSD',
    address: '0x3e14 ... 6AeC',
  },
  {
    key: 3,
    name: 'Uniswap V3 FRAX/DAI',
    address: '0xF224 ... f53e',
  },
];

const PoolDisplay: React.FC<{
  pool: Pool;
  weight: number;
  isConfirmed: boolean;
  setConfirmation: (address: string, confirmed: boolean) => void;
  setWeight: (address: string, newWeight: number) => void;
  unusedWeight: number;
}> = ({
  pool,
  weight,
  isConfirmed,
  setWeight,
  setConfirmation,
  unusedWeight,
}) => {
  useEffect(() => {
    setWeight(pool.address, 0);
  }, [pool.address, setWeight]);

  return (
    <div className="pool-display-table-row">
      <span>{pool.name}</span>
      <span>{pool.address}</span>
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
      <span>
        <Btn
          size="small"
          onClick={() => setConfirmation(pool.address, true)}
          disabled={isConfirmed}
        >
          Confirm
        </Btn>
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

  const unusedWeight = useMemo(() => {
    return (
      100 -
      pools.reduce<number>((weight, pool) => {
        return weight + voteState.weights[pool.address];
      }, 0)
    );
  }, [voteState.weights]);

  const allConfirmed = useMemo(() => {
    return pools.every((pool) => voteState.confirmations[pool.address]);
  }, [voteState.confirmations]);

  return (
    <div className={clsx('flex flex-col', styles['styles'])}>
      <div>Unused Weight: {unusedWeight}%</div>
      <div className="pool-display-table-row">
        <span>Pool Name</span>
        <span>Address</span>
        <span>Weight</span>
        <span>Confirm</span>
      </div>
      {pools.map((pool) => (
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
      <Btn disabled={!allConfirmed} className="mt-1">
        Vote
      </Btn>
    </div>
  );
};

export default Votes;
