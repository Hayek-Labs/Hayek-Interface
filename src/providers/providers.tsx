import Web3HooksProvider from './web3HooksProvider';

const Providers: React.FC = ({ children }) => {
  return <Web3HooksProvider>{children}</Web3HooksProvider>;
};

export default Providers;
