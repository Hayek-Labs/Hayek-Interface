import Button from '@/components/Button';
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
      {account ? (
        <Button onClick={onSwap}>Swap</Button>
      ) : (
        <Button onClick={() => connector.activate()}>Connect Wallet</Button>
      )}
    </div>
  );
};

export default SubmitButtons;
