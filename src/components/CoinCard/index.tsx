import { Coin, coinToLogo } from '@/constants/coin';

const CoinDisplay: React.FC<{ coin: Coin }> = ({ coin }) => {
  const Logo = coinToLogo[coin];
  const logoSize = 30;
  return (
    <>
      <Logo width={logoSize} height={logoSize} className="min-w-min" />
      <div className="w-2" />
      <span className="text-lg">{coin}</span>
    </>
  );
};

const CoinCard: React.FC<{
  coin: Coin;
  input: {
    value: string;
    setValue: SetState<string>;
    canInput: boolean;
  };
  select?: {
    selectFrom: Coin[];
    setCoin: SetState<Coin>;
    canSelect: boolean;
  };
}> = ({ coin, input: { value, setValue, canInput } }) => {
  return (
    <div className="rounded-lg w-full bg-hblack-1 flex flex-col justify-start px-4 py-3 border border-transparent hover:border-hyellow-1">
      <div className="flex flex-row items-center">
        <CoinDisplay coin={coin} />
        <input
          className="ml-4 bg-transparent outline-none text-right w-20 text-lg flex-1"
          value={value}
          type="number"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!canInput}
        />
      </div>
      <div className="h-1" />
      <div className="flex flex-row items-center text-hblack-4">
        <span>Balance</span>
        <span className="ml-auto">$0.00</span>
      </div>
    </div>
  );
};

export default CoinCard;
