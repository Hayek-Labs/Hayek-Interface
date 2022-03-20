import StateProvider from './StateProvider';
import Web3HooksProvider from './web3HooksProvider';

const Providers: React.FC = ({ children }) => {
  return (
    <StateProvider>
      <Web3HooksProvider>{children}</Web3HooksProvider>
    </StateProvider>
  );
};

export default Providers;
