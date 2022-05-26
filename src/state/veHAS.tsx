import BigNumber from 'bignumber.js';
import { useState } from 'react';

export const useCreateVeHASState = (): VeHASState => {
  const [HASCoinValue, setHASCoinValue] = useState(new BigNumber(0.0));
  const [veHASCoinValue, setVeHASCoinValue] = useState(new BigNumber(0.0));
  const [lockPeriod, setLockPeriod] = useState(new BigNumber(5.0));

  return {
    HASCoinValue,
    setHASCoinValue,

    setVeHASCoinValue,
    veHASCoinValue,

    lockPeriod,
    setLockPeriod,
  };
};

export interface VeHASState {
  HASCoinValue: BigNumber;
  setHASCoinValue: SetState<BigNumber>;

  veHASCoinValue: BigNumber;
  setVeHASCoinValue: SetState<BigNumber>;

  lockPeriod: BigNumber;
  setLockPeriod: SetState<BigNumber>;
}
