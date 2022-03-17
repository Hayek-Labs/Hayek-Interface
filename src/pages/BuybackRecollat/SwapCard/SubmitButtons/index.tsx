import { useState, useCallback } from 'react';

const SubmitButtons = () => {
  const [{ isApproved, isSwapped }, setState] = useState({
    isApproved: false,
    isSwapped: false,
  });

  const Button: React.FC<HTML.Button> = ({ children, ...props }) => {
    return (
      <button
        {...props}
        className="bg-[#2C2B2B] rounded-md px-4 py-4 w-full self-center text-xl"
      >
        {children}
      </button>
    );
  };

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
