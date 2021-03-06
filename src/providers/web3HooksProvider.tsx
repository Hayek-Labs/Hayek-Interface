import { hooks as metamaskHooks, metaMask } from '@/connectors/metamask';
import { supportedChains } from '@/constants/chains';
import { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import React, { useMemo, useState, useContext } from 'react';

type Connector = MetaMask;

// The non-null assertion below is only valid if the
// context is only accessed from within a provider.
// As long as this holds, there are no type issues here.
const Web3Context = React.createContext<{
  connector: Connector;
  setConnector: SetState<Connector>;
  hooks: Web3ReactHooks;
  setHooks: SetState<Web3ReactHooks>;
}>(undefined!);

export const useWeb3Context = () => {
  return useContext(Web3Context);
};

export const useWeb3Hooks = () => {
  const hooks = useContext(Web3Context).hooks;
  const useChainId = hooks.useChainId;
  const newHooks = Object.assign(hooks, {
    useChainId: () => {
      const actualChainId = useChainId();
      if (actualChainId === undefined) {
        return undefined;
      } else if (supportedChains.includes(actualChainId)) {
        return actualChainId;
      }
      return null;
    },
  });
  return newHooks;
};

export const useWeb3Connector = () => {
  return useContext(Web3Context).connector;
};

const Web3HooksProvider: React.FC = ({ children }) => {
  const [hooks, setHooks] = useState<Web3ReactHooks>(metamaskHooks);
  const [connector, setConnector] = useState<Connector>(metaMask);

  const value = useMemo(
    () => ({
      hooks,
      setHooks,
      connector,
      setConnector,
    }),
    [hooks, connector],
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3HooksProvider;
