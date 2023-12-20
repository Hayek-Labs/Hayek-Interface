import MintOrRedeem from '@/components/MintRedeem';
import { useMintOrRedeemState } from '@/providers/StateProvider';
import { useEffect } from 'react';
const Mint = () => {
  const { setCoin0 } = useMintOrRedeemState();
  useEffect(() => {
    setCoin0('BTC');
  }, []);
  return <MintOrRedeem mode="mint" />;
};

export default Mint;
