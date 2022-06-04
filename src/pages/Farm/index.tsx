import PoolList from './PoolList';

const Farm = () => {
  return (
    <div className="w-full min-h-full self-center flex-1 flex flex-col items-center justify-center py-4">
      <div className="bg-card w-96 flex flex-col justify-center rounded-lg text-center px-4 pt-2 pb-4 text-hblack-4">
        <span className="font-bold text-center text-md mb-2">FARM</span>
        <PoolList />
      </div>
    </div>
  );
};

export default Farm;
