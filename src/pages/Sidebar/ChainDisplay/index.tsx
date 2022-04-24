import ChainSelect from '@/components/ChainSelect';
import { Chain, supportedChains } from '@/constants/chains';
import { useWeb3Connector, useWeb3Hooks } from '@/providers/web3HooksProvider';
import { useEffect, useCallback } from 'react';

const ChainDisplay = () => {
  const { useChainId, useIsActivating } = useWeb3Hooks();
  const connector = useWeb3Connector();
  const isActivating = useIsActivating();

  useEffect(() => {
    void connector.connectEagerly();
  }, [connector]);

  const connect = useCallback(
    (chainId?: Chain) => {
      if (!isActivating) {
        connector.activate(chainId);
      }
    },
    [connector, isActivating],
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
      <ChainSelect
        options={selectOptions}
        value={chainId}
        setValue={(newChainId) => {
          if (newChainId.value === undefined || newChainId.value === null) {
            disconnect();
          } else {
            connect(newChainId.value);
          }
        }}
      />
    </div>
  );
};

export default ChainDisplay;
