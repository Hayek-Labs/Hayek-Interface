import { Table } from 'antd';
import clsx from 'clsx';
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

const columns = [
  {
    title: 'Pool Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const Votes = () => {
  return (
    <div className={clsx('flex flex-col', styles['styles'])}>
      <Table
        columns={columns}
        dataSource={pools}
        className="w-full"
        bordered={false}
        pagination={false}
      />
    </div>
  );
};

export default Votes;
