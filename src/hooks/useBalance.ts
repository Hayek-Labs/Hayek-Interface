import { Chain } from '@/constants/chains';
import {
  chainCoinToAddress,
  chainToCoinInterface,
  Coin,
} from '@/constants/coin';
import { useWeb3Hooks } from '@/providers/web3HooksProvider';
import BigNumber from 'bignumber.js';
import { utils } from 'ethers';
import { useContract } from './useContract';
import { useQuery } from 'react-query';

const contractQueryId = (
  chainId: Chain | undefined,
  contractAddress: string | undefined,
  contract: any,
) => [chainId, contractAddress, !!contract];

const useBalance = (coin: Coin) => {
  const { useChainId, useAccount } = useWeb3Hooks();
  const chainId: Chain | undefined = useChainId();
  const account = useAccount();

  const contractAddress = chainId && chainCoinToAddress[chainId][coin];
  const coinAbi = chainId && chainToCoinInterface[chainId];
  const contract = useContract(contractAddress, coinAbi as any);

  const balanceResult = useQuery<BigNumber | undefined>(
    [
      'balance',
      account,
      ...contractQueryId(chainId, contractAddress, contract),
    ],
    () => {
      if (!contract || !account) {
        return undefined;
      }
      return contract
        .balanceOf(utils.getAddress(account))
        .then((newBalance: any) => new BigNumber(newBalance.toString()));
    },
    {
      refetchInterval: 15 * 1000,
    },
  );

  const decimalsResult = useQuery<BigNumber | undefined>(
    ['decimals', ...contractQueryId(chainId, contractAddress, contract)],
    () => {
      if (!contract) {
        return undefined;
      }
      return contract
        .decimals()
        .then((newDecimals: any) => new BigNumber(newDecimals.toString()));
    },
    {
      refetchInterval: 15 * 1000,
    },
  );

  const balance =
    !balanceResult.isLoading && !balanceResult.isError
      ? balanceResult.data
      : undefined;

  const decimals =
    !decimalsResult.isLoading && !decimalsResult.isError
      ? decimalsResult.data
      : undefined;

  return balance !== undefined && decimals !== undefined
    ? balance.div(new BigNumber(10).pow(decimals))
    : undefined;
};

export { useBalance };
