import { metaMask } from '@/connectors/metamask';
import { useCallback, useEffect } from 'react';

const ConnectButton: React.FC = () => {
  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  const onClick = useCallback(() => {
    metaMask.activate();
  }, []);

  return (
    <div className="w-full p-3 h-12 sm:h-8 xl:h-16 hidden flex-shrink-0 sm:flex flex-col items-center justify-center hover:cursor-pointer">
      <span
        className="hover-cursor-pointer text-white rounded-xl bg-black px-4 py-2"
        onClick={onClick}
      >
        Connect
      </span>
    </div>
  );
};

export default ConnectButton;
