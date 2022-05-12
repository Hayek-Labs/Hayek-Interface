import BigNumber from 'bignumber.js';
import Votes from './Votes';

const VoteCard = () => {
  const veHASBalance = new BigNumber(0.0);

  return (
    <div className="bg-card w-96 flex flex-col justify-center px-4 pt-2 rounded-lg text-white text-center">
      <span className="font-bold text-center text-md mb-2 text-hblack-4">
        Vote
      </span>
      <div className="flex flex-row text-hblack-4">
        <span>veHAS Balance:</span>
        <span className="ml-auto">{veHASBalance.toFixed(2)}</span>
      </div>
      <Votes />
    </div>
  );
};

export default VoteCard;
