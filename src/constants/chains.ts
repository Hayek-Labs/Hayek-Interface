import { ReactComponent as ETHLogo } from '@/assets/logos/chains/ethereum-eth-logo.svg';
import { ReactComponent as BSCLogo } from '@/assets/logos/chains/bnb-bnb-logo.svg';
import { ReactComponent as ArbitrumLogo } from '@/assets/logos/chains/arbitrum.svg';
import { ReactComponent as BaseLogo } from '@/assets/logos/chains/base.svg';
import OptimismLogo from './OptimismLogo';

export enum Chain {
  Ethereum = 1,
  BSC = 56,
  Arbitrum = 42161,
  Optimism = 10,
  Base = 8453,
}

// Object.keys(X) where X is an enum with n variants returns
// an array with 2n elements, where the first n are the
// numerical values of the enum variants, and the second n
// are the string names of the variants. To get the supported
// chains, we just take the first n elements
export const supportedChains = Object.keys(Chain)
  .filter((_, index, arr) => index < arr.length / 2)
  .map((chainStr) => Number.parseInt(chainStr));

export const chainToLogo: Record<Chain | number, SVGComponent | any> = {
  [Chain.Ethereum]: ETHLogo,
  [Chain.BSC]: BSCLogo,
  [Chain.Arbitrum]: ArbitrumLogo,
  [Chain.Optimism]: OptimismLogo,
  [Chain.Base]: BaseLogo,
};

export const chainToInfo: Record<Chain | number, { name: string }> = {
  [Chain.Ethereum]: { name: 'Ethereum' },
  [Chain.BSC]: { name: 'BNB Chain' },
  [Chain.Arbitrum]: { name: 'Arbitrum' },
  [Chain.Optimism]: { name: 'Optimism' },
  [Chain.Base]: { name: 'Base' },
};
