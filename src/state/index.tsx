import { FarmState, useCreateFarmState } from './farm';
import { MintRedeemState, useCreateMintOrRedeemState } from './mintOrRedeem';
import { SwapState, useCreateSwapState } from './swap';
import { useCreateVeHASState, VeHASState } from './veHAS';

export interface AppState {
  mintRedeem: MintRedeemState;
  swap: SwapState;
  veHAS: VeHASState;
  farm: FarmState;
}

export const useCreateAppState = (): AppState => {
  const mintRedeem = useCreateMintOrRedeemState();
  const swap = useCreateSwapState();
  const veHAS = useCreateVeHASState();
  const farm = useCreateFarmState();

  return {
    mintRedeem,
    swap,
    veHAS,
    farm,
  };
};
