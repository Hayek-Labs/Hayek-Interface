import { Pool } from '@/constants/mockPools';
import { MdOutlineContentCopy } from 'react-icons/md';
import PoolIcon from '../PoolIcon';

interface Props {
  pool: Pool;
  size?: 'sm' | 'lg';
}
const PoolInfo: React.FC<Props> = ({ pool, size = 'sm' }) => {
  const poolIconSize = size === 'sm' ? 15 : 25;
  const addressIconSize = size === 'sm' ? 10 : 20;
  return (
    <span className="flex flex-row items-center">
      <PoolIcon
        coin1={pool.coin1}
        coin2={pool.coin2}
        size={poolIconSize}
        style={{
          marginRight: `${12 * (size === 'sm' ? 1 : 1.75)}px`,
        }}
      />
      <span className="text-white">
        {pool.coin1}-{pool.coin2}
      </span>
      <span className="ml-1 text-[x-small]">{pool.name}</span>
      <MdOutlineContentCopy size={addressIconSize} className="ml-1" />
    </span>
  );
};

export default PoolInfo;
