import LineChart from '@/components/LineChart';
import Icon from '../Icon';

const CRGraph: React.FC = () => {
  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-80">
        <div className="flex p-4 h-full flex-col">
          <div className="">
            <div className="flex items-center">
              <span className="font-bold text-white inline-flex flex-row items-center">
                Collateral Ratio
              </span>
              <div className="flex-grow" />

              <Icon path="res-react-dash-graph-range" className="w-4 h-4" />
              <div className="ml-2">Last 9 Months</div>
              <div className="ml-6 w-5 h-5 flex justify-center items-center rounded-full icon-background">
                ?
              </div>
            </div>
            <div className="font-bold ml-5">Nov - July</div>
          </div>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default CRGraph;
