import { MintRedeemState, useCreateMintOrRedeemState } from './mintOrRedeem';
import { SwapState, useCreateSwapState } from './swap';

export interface AppState {
  mintRedeem: MintRedeemState;
  swap: SwapState;
}

export const useCreateAppState = (): AppState => {
  const mintRedeem = useCreateMintOrRedeemState();
  const swap = useCreateSwapState();

  return {
    mintRedeem,
    swap,
  };
};
