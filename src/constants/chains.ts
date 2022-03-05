import { ReactComponent as BSCLogo } from '@/assets/logos/chains/bnb-bnb-logo.svg';
import { ReactComponent as PolygonLogo } from '@/assets/logos/chains/polygon-matic-logo.svg';

export enum Chain {
  BSC = 56,
  Polygon = 137,
}

// Object.keys(X) where X is an enum with n variants returns
// an array with 2n elements, where the first n are the
// numerical values of the enum variants, and the second n
// are the string names of the variants. To get the supported
// chains, we just take the first n elements
export const supportedChains = Object.keys(Chain).filter(
  (_, index, arr) => index < arr.length / 2,
);

export const chainToLogo: Record<Chain, SVGComponent> = {
  [Chain.BSC]: BSCLogo,
  [Chain.Polygon]: PolygonLogo,
};