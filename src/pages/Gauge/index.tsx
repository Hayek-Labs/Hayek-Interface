import LockHASCard from '../VeHAS/LockHASCard';
import VoteCard from './VoteCard';

const Gauge = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center">
      <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:h-96 p-4 sm:p-2 gap-5">
        <LockHASCard />
        <VoteCard />
      </div>
    </div>
  );
};

export default Gauge;
