import { MintRedeemState, useCreateMintOrRedeemState } from './mintOrRedeem';

export interface AppState {
  mintRedeem: MintRedeemState;
}

export const useCreateAppState = (): AppState => {
  const mintRedeem = useCreateMintOrRedeemState();

  return {
    mintRedeem,
  };
};
