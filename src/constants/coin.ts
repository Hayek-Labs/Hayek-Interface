import { ReactComponent as USDTLogo } from '@/assets/logos/coins/tether-usdt-logo.svg';
import { ReactComponent as USDCLogo } from '@/assets/logos/coins/usd-coin-usdc-logo.svg';
import { ReactComponent as BUSDLogo } from '@/assets/logos/coins/binance-usd-busd-logo.svg';
import { ReactComponent as DAILogo } from '@/assets/logos/coins/multi-collateral-dai-dai-logo.svg';
import { ReactComponent as HASLogo } from '@/assets/logos/coins/HAS-LOGO.svg';
import { ReactComponent as USDHLogo } from '@/assets/logos/coins/USDH-01.svg';
import { ReactComponent as AUDHLogo } from '@/assets/logos/coins/AUDH-01.svg';
import { ReactComponent as GBPHLogo } from '@/assets/logos/coins/GBPH-01.svg';
import { ReactComponent as JPYHLogo } from '@/assets/logos/coins/JPYH-01.svg';
import { ReactComponent as EURHLogo } from '@/assets/logos/coins/EURH-01.svg';
import { ReactComponent as CHFHLogo } from '@/assets/logos/coins/CHFH-01.svg';
import { Chain } from './chains';
import IBEP20 from '../abi/ibep20.json';
import UChildERC20 from '../abi/UChildERC20.json';
import ERC20 from '../abi/erc20.json';

const coins = [
  'USDT',
  'USDC',
  'HAS',
  'USDH',
  'BUSD',
  'DAI',
  'AUDH',
  'GBPH',
  'JPYH',
  'EURH',
  'CHFH',
] as const;
export type Coin = typeof coins[number];

interface CoinData {
  logo: SVGComponent;
  coinGeckoId: string | undefined;
  addresses: Record<Chain, string | undefined>;
}

export const coinToLogo: Record<Coin, SVGComponent> = {
  USDT: USDTLogo,
  USDC: USDCLogo,
  HAS: HASLogo,
  USDH: USDHLogo,
  BUSD: BUSDLogo,
  DAI: DAILogo,
  AUDH: AUDHLogo,
  GBPH: GBPHLogo,
  JPYH: JPYHLogo,
  EURH: EURHLogo,
  CHFH: CHFHLogo,
};

export const coinToCoinGeckoId: Record<Coin, string | undefined> = {
  USDT: 'tether',
  USDC: 'usd-coin',
  BUSD: 'binance-usd',
  DAI: 'dai',
  HAS: undefined,
  USDH: undefined,
  AUDH: undefined,
  GBPH: undefined,
  JPYH: undefined,
  EURH: undefined,
  CHFH: undefined,
};

export const chainToCoinInterface: Record<Chain, any> = {
  [Chain.Ethereum]: ERC20,
  [Chain.BSC]: IBEP20,
  [Chain.Polygon]: UChildERC20,
};

export const chainCoinToAddress: Record<
  Chain,
  Record<Coin, string | undefined>
> = {
  [Chain.Ethereum]: {
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    BUSD: undefined,
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    HAS: undefined,
    USDH: undefined,
    AUDH: undefined,
    GBPH: undefined,
    JPYH: undefined,
    EURH: undefined,
    CHFH: undefined,
  },
  [Chain.BSC]: {
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    DAI: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    HAS: undefined,
    USDH: undefined,
    AUDH: undefined,
    GBPH: undefined,
    JPYH: undefined,
    EURH: undefined,
    CHFH: undefined,
  },
  [Chain.Polygon]: {
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    BUSD: undefined,
    DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    HAS: undefined,
    USDH: undefined,
    AUDH: undefined,
    GBPH: undefined,
    JPYH: undefined,
    EURH: undefined,
    CHFH: undefined,
  },
};

export const coinData = coins.reduce<Record<Coin, CoinData>>((accum, coin) => {
  const logo = coinToLogo[coin];
  const coinGeckoId = coinToCoinGeckoId[coin];
  const addresses = (() => {
    const obj = {};
    for (const chain in chainCoinToAddress) {
      // @ts-ignore
      obj[chain] = chainCoinToAddress[chain][coin];
    }
    return obj as Record<Chain, string | undefined>;
  })();

  accum[coin] = {
    logo,
    coinGeckoId,
    addresses,
  };

  return accum;
  // @ts-ignore
}, {});
