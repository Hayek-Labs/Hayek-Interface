import Button from '@/components/Button';
import ConnectDefaultBtn from '@/components/ConnectDefaultBtn';
import { useWeb3Connector, useWeb3Hooks } from '@/providers/web3HooksProvider';
import { useWeb3React } from '@web3-react/core';
import { useState, useCallback } from 'react';

const SubmitButtons = () => {
  const { account } = useWeb3React();
  const connector = useWeb3Connector();

  const [{ isApproved, isSwapped }, setState] = useState({
    isApproved: false,
    isSwapped: false,
  });

  const onApprove = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isApproved: true,
    }));
  }, []);

  const onSwap = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isSwapped: true,
    }));
  }, []);

  return (
    <div className="flex flex-row w-full justify-evenly">
      <ConnectDefaultBtn onConnected={<Button onClick={onSwap}>Swap</Button>} />
    </div>
  );
};

export default SubmitButtons;
