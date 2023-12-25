import Btn from '@/components/Btn';
import { Coin, coinToLogo } from '@/constants/coin';
import BigNumber from 'bignumber.js';
import { BsArrowRight } from 'react-icons/bs';

interface Deposit {
  id: number;
  depositTime: Date;
  endTime: Date;
  HAS: BigNumber;
  veHAS: BigNumber;
  lockPeriod: BigNumber;
}

const deposits: Deposit[] = [
  {
    id: 0,
    depositTime: new Date(2021, 4, 1, 14, 2, 23),
    endTime: new Date(
      new Date(2021, 4, 1, 14, 2, 23).getTime() + 365.0 * 24 * 60 * 60 * 1000,
    ),
    HAS: new BigNumber(500),
    veHAS: new BigNumber(2146.7188986),
    lockPeriod: new BigNumber(365.0),
  },
  {
    id: 1,
    depositTime: new Date(2022, 4, 5, 3, 50, 2),
    endTime: new Date(
      new Date(2022, 4, 5, 3, 50, 2).getTime() + 975.0 * 24 * 60 * 60 * 1000,
    ),
    HAS: new BigNumber(234),
    veHAS: new BigNumber(11470.5923608),
    lockPeriod: new BigNumber(975),
  },
  {
    id: 2,
    depositTime: new Date(2022, 4, 8, 12, 36, 43),
    endTime: new Date(
      new Date(2022, 4, 8, 12, 36, 43).getTime() + 540.0 * 24 * 60 * 60 * 1000,
    ),
    HAS: new BigNumber(1000),
    veHAS: new BigNumber(8633.858303),
    lockPeriod: new BigNumber(540),
  },
];

const DepositDisplay: React.FC<{ deposit: Deposit }> = ({ deposit }) => {
  const logoSize = 15;

  const Amount: React.FC<{ value: BigNumber; name: Coin }> = ({
    value,
    name,
  }) => {
    const Logo = coinToLogo[name];
    return (
      <div className="flex flex-row items-center">
        <span className="mr-1">{value.toFixed(2)}</span>
        <Logo width={logoSize} height={logoSize} className="mr-[0.15rem]" />
        <span>{name}</span>
      </div>
    );
  };

  const withdrawlDurationMs = deposit.endTime.getTime() - Date.now();

  console.log('withdrawlDurationMs', withdrawlDurationMs);

  const withdrawlDurationDays = Math.floor(
    withdrawlDurationMs / (1000 * 60 * 60 * 24),
  );

  console.log('withdrawlDurationDays', withdrawlDurationDays);

  const withdrawlDurationHours = Math.floor(
    withdrawlDurationMs / (1000 * 60 * 60),
  );
  const withdrawlDurationMinutes = Math.floor(
    withdrawlDurationMs / (1000 * 60),
  );
  const withdrawlDurationSeconds = Math.floor(withdrawlDurationMs / 1000);

  const withdrawlMsg =
    withdrawlDurationDays > 0
      ? `${withdrawlDurationDays} days`
      : withdrawlDurationHours > 0
      ? `${withdrawlDurationHours} hours`
      : withdrawlDurationMinutes > 0
      ? `${withdrawlDurationMinutes} minutes`
      : withdrawlDurationSeconds > 0
      ? `${withdrawlDurationSeconds} seconds`
      : null;

  const canWithdraw = withdrawlDurationMs < 0;

  return (
    <div className="w-full px-2 py-1 bg-hblack-2 text-white rounded-lg flex flex-col items-start">
      <div className="self-start flex flex-row items-center w-full">
        <span className="text-[#989898]">
          Deposited: {deposit.depositTime.toLocaleString()}
        </span>
      </div>
      <div className="text-[#989898]">
        Lock Period: {deposit.lockPeriod.toFixed(2)} days
      </div>
      <div className="flex flex-row items-center text-[#989898]">
        {canWithdraw
          ? 'Withdraw: Yes'
          : `Withdraw: In ${withdrawlMsg} (${deposit.endTime.toLocaleDateString()})`}
      </div>
      <div className="flex flex-row items-center mb-2 text-white">
        <Amount value={deposit.HAS} name="HAS" />
        <BsArrowRight size={18} className="mx-2" />
        <Amount value={deposit.veHAS} name="veHAYEK" />
      </div>
      <Btn disabled={!canWithdraw} className="w-full self-center">
        Withdraw
      </Btn>
    </div>
  );
};

const MyDeposits: React.FC = () => {
  return (
    <div className="h-[26rem] pt-6 px-4 pb-4 flex flex-col gap-2 overflow-y-auto">
      {deposits.map((deposit) => (
        <DepositDisplay deposit={deposit} key={deposit.id} />
      ))}
    </div>
  );
};

export default MyDeposits;
