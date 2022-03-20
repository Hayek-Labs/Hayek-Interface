import { AppState, useCreateAppState } from '@/state';
import { MintRedeemState } from '@/state/mintOrRedeem';
import React from 'react';
import { useContext } from 'react';

const StateContext = React.createContext<AppState>(undefined!);

export const useAppState = (): AppState => {
  return useContext(StateContext);
};

export const useMintOrRedeemState = (): MintRedeemState => {
  return useAppState().mintRedeem;
};

const StateProvider: React.FC = ({ children }) => {
  const state = useCreateAppState();
  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
