import BigNumber from 'bignumber.js';
import Votes from '../../Gauge/VoteCard/Votes';

const Vote = () => {
  const veHASBalance = new BigNumber(0.0);

  return (
    <div className="min-h-[26rem] flex flex-col">
      <div className="flex flex-row text-hblack-4">
        <span>veHAS Balance:</span>
        <span className="ml-auto">{veHASBalance.toFixed(2)}</span>
      </div>
      <Votes />
    </div>
  );
};

export default Vote;
