import { Coin } from './coin';

export interface Pool {
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
    coin2: 'USDC',
    address: '0xF224 ... f53e',
  },
  // {
  //   key: 4,
  //   name: 'Uniswap V3',
  //   coin1: 'EURH',
  //   coin2: 'USDC',
  //   address: '0x3EA2 ... B4B0',
  // },
  // {
  //   key: 5,
  //   name: 'ACY Finance',
  //   coin1: 'GBPH',
  //   coin2: 'USDT',
  //   address: '0x3eB4 ... 6AeC',
  // },
  // {
  //   key: 6,
  //   name: 'SushiSwap',
  //   coin1: 'JPYH',
  //   coin2: 'DAI',
  //   address: '0xF2C4 ... f53e',
  // },
  // {
  //   key: 7,
  //   name: 'Uniswap V3',
  //   coin1: 'AUDH',
  //   coin2: 'USDC',
  //   address: '0x3ED2 ... B4B0',
  // },
  {
    key: 8,
    name: 'ACY Finance',
    coin1: 'USDH',
    coin2: 'USDC',
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
