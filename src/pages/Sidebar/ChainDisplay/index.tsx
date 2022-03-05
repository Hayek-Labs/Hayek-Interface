import { hooks, metaMask } from '@/connectors/metamask';
import { chainToInfo, chainToLogo } from '@/constants/chains';
import Icon from '@/pages/Home/Icon';
import { useEffect, useCallback } from 'react';

const { useChainId, useAccount } = hooks;

const ChainDisplay = () => {
  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  const connect = useCallback(() => {
    metaMask.activate();
  }, []);

  const disconnect = useCallback(() => {
    metaMask.deactivate();
  }, []);

  const account = useAccount();
  const chainId = useChainId();

  const ChainIcon = chainId ? chainToLogo[chainId] : undefined;
  const chainInfo = chainId ? chainToInfo[chainId] : undefined;

  useEffect(() => {
    if (chainId) {
      connect();
    }
  }, [chainId, connect]);

  return (
    <div className="w-full p-3 h-18 sm:h-16 xl:h-20 hidden sm:block flex-shrink-0">
      <div
        className="bg-sidebar-card-top rounded-xl w-full h-full flex items-center justify-start sm:justify-center xl:justify-start px-3 sm:px-0 xl:px-3 hover-cursor-pointer"
        onClick={account ? undefined : connect}
      >
        {ChainIcon && <ChainIcon width={30} />}
        <div className="block sm:hidden xl:block ml-3 text-white">
          {account ? (
            <span>{chainInfo && chainInfo.name}</span>
          ) : (
            <span>Connect</span>
          )}
        </div>
        <div className="block sm:hidden xl:block flex-grow" />
        <Icon
          path="res-react-dash-sidebar-card-select"
          className="block sm:hidden xl:block w-5 h-5"
        />
      </div>
    </div>
  );
};

export default ChainDisplay;
