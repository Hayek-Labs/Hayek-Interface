import { useWeb3Connector } from '@/providers/web3HooksProvider';
import { useWeb3React } from '@web3-react/core';
import Button from '../Button';

interface Props {
  onConnected: JSX.Element;
}

const ConnectDefaultBtn: React.FC<Props> = ({ onConnected }) => {
  const { account } = useWeb3React();
  const connector = useWeb3Connector();

  if (account) {
    return onConnected;
  } else {
    return <Button onClick={() => connector.activate()}>Connect Wallet</Button>;
  }
};

export default ConnectDefaultBtn;
