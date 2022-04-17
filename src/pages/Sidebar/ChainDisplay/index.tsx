import ChainSelect from '@/components/ChainSelect';
import { Chain, supportedChains } from '@/constants/chains';
import { useWeb3Connector, useWeb3Hooks } from '@/providers/web3HooksProvider';
import { useEffect, useCallback } from 'react';

const ChainDisplay = () => {
  const { useChainId } = useWeb3Hooks();
  const connector = useWeb3Connector();

  useEffect(() => {
    void connector.connectEagerly();
  }, [connector]);

  const connect = useCallback(
    (chainId?: Chain) => {
      connector.activate(chainId);
    },
    [connector],
  );

  const disconnect = useCallback(() => {
    connector.deactivate();
  }, [connector]);

  const chainId = useChainId();

  const selectOptions = chainId
    ? [undefined, ...supportedChains]
    : [...supportedChains];

  return (
    <div className="w-full p-3 h-18 sm:h-16 xl:h-20 hidden sm:block flex-shrink-0">
      <div className="bg-sidebar-card-top rounded-xl w-full h-full flex items-center justify-start sm:justify-center xl:justify-start px-3 sm:px-0 xl:px-3 hover:cursor-pointer">
        <ChainSelect
          options={selectOptions}
          value={chainId}
          setValue={(newChainId) => {
            if (newChainId.value === undefined) {
              disconnect();
            } else {
              connect(newChainId.value);
            }
          }}
        />
        {/* {ChainIcon && <ChainIcon width={30} />}
        <div className="block sm:hidden xl:block ml-3 text-white">
          {account ? (
            chainInfo !== undefined && ChainIcon !== undefined ? (
              <span>{chainInfo && chainInfo.name}</span>
            ) : (
              <span>Chain Unsupported</span>
            )
          ) : (
            <span>Connect</span>
          )}
        </div>
        <div className="block sm:hidden xl:block flex-grow" />
        <Icon
          path="res-react-dash-sidebar-card-select"
          className="block sm:hidden xl:block w-5 h-5"
        /> */}
      </div>
    </div>
  );
};

export default ChainDisplay;
