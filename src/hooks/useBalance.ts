import { Chain } from '@/constants/chains';
import { chainCoinToAddress, Coin } from '@/constants/coin';
import { useWeb3Hooks } from '@/providers/web3HooksProvider';
import { useCallback, useEffect, useState } from 'react';
import IBEP20 from '../abi/ibep20.json';
import BigNumber from 'bignumber.js';
import { utils } from 'ethers';
import { useContract } from './useContract';

const useBalance = (coin: Coin) => {
  const { useChainId, useAccount } = useWeb3Hooks();
  const chainId: Chain | undefined = useChainId();
  const account = useAccount();

  const contractAddress = chainId && chainCoinToAddress[chainId][coin];
  const coinAbi = chainId === Chain.BSC ? IBEP20 : undefined;
  const contract = useContract(contractAddress, coinAbi as any);
  const [balance, setBalance] = useState<BigNumber>();
  const [decimals, setDecimals] = useState<BigNumber>();

  const getBalance = useCallback(() => {
    if (contract === undefined || account === undefined) {
      return;
    }

    contract.balanceOf(utils.getAddress(account)).then((newBalance: any) => {
      setBalance(new BigNumber(newBalance.toString()));
    });
  }, [account, contract]);

  const getDecimals = useCallback(() => {
    if (contract === undefined) {
      return;
    }
    contract.decimals().then((newDecimals: any) => {
      setDecimals(new BigNumber(newDecimals.toString()));
    });
  }, [contract]);

  useEffect(() => {
    getBalance();
    getDecimals();
  }, [getBalance, getDecimals]);

  useEffect(() => {
    const interval = setInterval(() => {
      getBalance();
    }, 1000 * 15);
    return () => {
      clearInterval(interval);
    };
  }, [getBalance]);

  return balance !== undefined && decimals !== undefined
    ? balance.div(new BigNumber(10).pow(decimals))
    : undefined;
};

export { useBalance };
