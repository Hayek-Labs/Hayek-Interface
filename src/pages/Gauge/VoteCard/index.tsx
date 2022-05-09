import BigNumber from 'bignumber.js';
import Votes from './Votes';

const VoteCard = () => {
  const veHASBalance = new BigNumber(0.0);

  return (
    <div className="bg-card w-96 flex flex-col justify-center px-4 pt-2 pb-6 rounded-lg text-white text-center">
      <span className="font-bold text-center text-md mb-2 text-hblack-4">
        Vote with veHAS
      </span>
      <div className="h-2" />
      <span>veHAS Balance: {veHASBalance.toFixed(3)}</span>
      <div className="h-2" />
      <Votes />
    </div>
  );
};

export default VoteCard;
