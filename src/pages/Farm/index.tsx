import PoolList from './PoolList';

const Farm = () => {
  return (
    <div className="w-full min-h-full self-center flex-1 flex flex-col items-center justify-center py-4">
      <div className="bg-card w-1/3 flex flex-col justify-center rounded-lg text-center pb-4 text-hblack-4">
        <PoolList />
      </div>
    </div>
  );
};

export default Farm;
