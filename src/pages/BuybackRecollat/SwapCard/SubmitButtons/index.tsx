import Button from '@/components/Button';
import { useState, useCallback } from 'react';

const SubmitButtons = () => {
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
      <Button onClick={onSwap}>Connect Wallet</Button>
    </div>
  );
};

export default SubmitButtons;
