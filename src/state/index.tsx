import { MintRedeemState, useCreateMintOrRedeemState } from './mintOrRedeem';
import { SwapState, useCreateSwapState } from './swap';
import { useCreateVeHASState, VeHASState } from './veHAS';

export interface AppState {
  mintRedeem: MintRedeemState;
  swap: SwapState;
  veHAS: VeHASState;
}

export const useCreateAppState = (): AppState => {
  const mintRedeem = useCreateMintOrRedeemState();
  const swap = useCreateSwapState();
  const veHAS = useCreateVeHASState();

  return {
    mintRedeem,
    swap,
    veHAS,
  };
};
