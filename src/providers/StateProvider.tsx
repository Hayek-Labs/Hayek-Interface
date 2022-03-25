import React, { useContext } from 'react';
import { AppState, useCreateAppState } from '@/state';
import { MintRedeemState } from '@/state/mintOrRedeem';
import { SwapState } from '@/state/swap';

const StateContext = React.createContext<AppState>(undefined!);

export const useAppState = (): AppState => {
  return useContext(StateContext);
};

export const useMintOrRedeemState = (): MintRedeemState => {
  return useAppState().mintRedeem;
};

export const useSwapState = (): SwapState => {
  return useAppState().swap;
};

const StateProvider: React.FC = ({ children }) => {
  const state = useCreateAppState();
  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
