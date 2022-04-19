import { hooks as metaMaskHooks, metaMask } from '../connectors/metamask';
import { MetaMask } from '@web3-react/metamask';
import {
  Web3ReactHooks,
  Web3ReactProvider as Web3ReactProviderLib,
} from '@web3-react/core';

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

const Web3ReactProvider: React.FC = ({ children }) => {
  return (
    <Web3ReactProviderLib connectors={connectors}>
      {children}
    </Web3ReactProviderLib>
  );
};

export default Web3ReactProvider;
