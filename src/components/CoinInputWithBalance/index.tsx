import { Coin, coinToLogo } from '@/constants/coin';
import { useState } from 'react';
import Input, {
  NumberInputOnChangeGenerator,
  useDefaultNumberInputOnChange,
} from '../Input';

const CoinInputWithBalance: React.FC<{
  title: string;
  coin: Coin;
  onChangeGen: NumberInputOnChangeGenerator;
}> = ({ title, coin, onChangeGen }) => {
  const [amount, setAmount] = useState(0);
  const amountOnChange = useDefaultNumberInputOnChange(onChangeGen, setAmount);

  const Logo = coinToLogo[coin];
  const logoSize = 20;

  return (
    <div className="flex flex-col items-start py-1">
      <span>{title}</span>
      <div className="flex flex-row items-center w-full">
        <span className="mr-2 w-24 text-left inline-flex flex-row items-center">
          <Logo width={logoSize} height={logoSize} className="mr-1" />
          {coin}
        </span>
        <Input
          className="text-black w-full"
          val={amount}
          onChange={amountOnChange}
        />
      </div>
      <div className="flex flex-row justify-start w-full mt-1">
        <span>Balance</span>
        <span className="ml-auto">~$1250</span>
      </div>
    </div>
  );
};

export default CoinInputWithBalance;
