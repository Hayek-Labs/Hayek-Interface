import LockHASCard from '../VeHAS/LockHASCard';
import VoteCard from './VoteCard';

const Gauge = () => {
  return (
    <div className="w-full h-[unset] flex flex-col items-center justify-center overflow-y-auto gap-6">
      <LockHASCard />
      <VoteCard />
    </div>
  );
};

export default Gauge;
