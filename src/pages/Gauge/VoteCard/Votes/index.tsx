import Btn from '@/components/Btn';
import { InputNumber } from 'antd';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.less';
import { MdOutlineContentCopy } from 'react-icons/md';
import { ReactComponent as UniswapLogo } from '@/assets/logos/coins/uniswap-uni-logo.svg';
import { Coin, coinToLogo } from '@/constants/coin';
import Button from '@/components/Button';
import ConnectDefaultBtn from '@/components/ConnectDefaultBtn';

interface Pool {
  key: number;
  name: string;
  coin1: Coin;
  coin2: Coin;
  address: string;
}

export const pools: Pool[] = [
  {
    key: 1,
    name: 'Uniswap V3',
    coin1: 'USDH',
    coin2: 'USDC',
    address: '0x3EF2 ... B4B0',
  },
  {
    key: 2,
    name: 'ACY Finance',
    coin1: 'USDH',
    coin2: 'USDT',
    address: '0x3e14 ... 6AeC',
  },
  {
    key: 3,
    name: 'SushiSwap',
    coin1: 'USDH',
    coin2: 'DAI',
    address: '0xF224 ... f53e',
  },
  {
    key: 4,
    name: 'Uniswap V3',
    coin1: 'EURH',
    coin2: 'USDC',
    address: '0x3EA2 ... B4B0',
  },
  {
    key: 5,
    name: 'ACY Finance',
    coin1: 'GBPH',
    coin2: 'USDT',
    address: '0x3eB4 ... 6AeC',
  },
  {
    key: 6,
    name: 'SushiSwap',
    coin1: 'JPYH',
    coin2: 'DAI',
    address: '0xF2C4 ... f53e',
  },
  {
    key: 7,
    name: 'Uniswap V3',
    coin1: 'AUDH',
    coin2: 'USDC',
    address: '0x3ED2 ... B4B0',
  },
  {
    key: 8,
    name: 'ACY Finance',
    coin1: 'USDH',
    coin2: 'USDT',
    address: '0x3eE4 ... 6AeC',
  },
  {
    key: 9,
    name: 'SushiSwap',
    coin1: 'USDH',
    coin2: 'DAI',
    address: '0xF2F4 ... f53e',
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
  const AddressTooltip = () => {
    return <MdOutlineContentCopy size={10} className="ml-1" />;
  };

  const PoolIcon: React.FC<{ coin1: Coin; coin2: Coin }> = ({
    coin1,
    coin2,
  }) => {
    const Logo1 = coinToLogo[coin1];
    const Logo2 = coinToLogo[coin2];
    const size = 15;
    return (
      <div className="flex flex-row relative mr-3">
        <Logo1 width={size} height={size} className="z-10" />
        <Logo2 width={size} height={size} className="absolute left-1/2" />
      </div>
    );
  };

  return (
    <div className="pool-display-table-row">
      <span className="items-center">
        <PoolIcon coin1={pool.coin1} coin2={pool.coin2} />
        <span className="text-white">
          {pool.coin1}-{pool.coin2}
        </span>
        <span className="ml-1 text-[0.6rem]"> {pool.name}</span>
        <AddressTooltip />
      </span>
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

  const [maxPoolsToDisplay, setMaxPoolsToDisplay] = useState(5);

  const poolsInDisplay = pools.slice(0, maxPoolsToDisplay);

  return (
    <div
      className={clsx(
        'flex flex-col text-hblack-4 h-full flex-1 pb-2',
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
        {poolsInDisplay.length < pools.length ? (
          <div onClick={() => setMaxPoolsToDisplay((prev) => prev + 5)}>
            See more...
          </div>
        ) : (
          <div onClick={() => setMaxPoolsToDisplay(5)}>See less...</div>
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
