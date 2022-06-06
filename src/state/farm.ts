import { useState } from 'react';

export const useCreateFarmState = (): FarmState => {
  const [onlyShowStakedFarms, setOnlyShowStakedFarms] = useState(false);

  return {
    onlyShowStakedFarms,
    setOnlyShowStakedFarms,
  };
};

export interface FarmState {
  onlyShowStakedFarms: boolean;
  setOnlyShowStakedFarms: SetState<boolean>;
}
