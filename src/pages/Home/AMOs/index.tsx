import InvestorsGraph from './Investors';
import LendingPlatformGraph from './Lending';
import LiquidityGraph from './Liquidity';

const AMOs = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <InvestorsGraph />
      <LiquidityGraph />
      <LendingPlatformGraph />
    </div>
  );
};

export default AMOs;
