import StateProvider from './StateProvider';
import Web3HooksProvider from './web3HooksProvider';
import Web3ReactProvider from './Web3ReactProvider';

const Providers: React.FC = ({ children }) => {
  return (
    <StateProvider>
      <Web3ReactProvider>
        <Web3HooksProvider>{children}</Web3HooksProvider>
      </Web3ReactProvider>
    </StateProvider>
  );
};

export default Providers;
