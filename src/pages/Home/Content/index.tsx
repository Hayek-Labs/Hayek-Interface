import { useSidebarContext } from '@/pages/Sidebar';
import AddComponent from '../AddComponent';
import Graph from '../Graph';
import Icon from '../Icon';
import IconButton from '../IconButton';
import NameCard from '../NameCard';
import Satisfication from '../Satisfaction';
import Segmentation from '../Segmentation';
import TopCountries from '../TopCountries';

const employeeData = [
  {
    id: 1,
    name: 'Esther Howard',
    position: "Sale's manager USA",
    transactions: 3490,
    rise: true,
    tasksCompleted: 3,
    imgId: 0,
  },

  {
    id: 2,
    name: 'Eleanor Pena',
    position: "Sale's manager Europe",
    transactions: 590,
    rise: false,
    tasksCompleted: 5,
    imgId: 2,
  },

  {
    id: 3,
    name: 'Robert Fox',
    position: "Sale's manager Asia",
    transactions: 2600,
    rise: true,
    tasksCompleted: 1,
    imgId: 3,
  },
];

const SidebarShowButton = () => {
  const { setSidebarVisible } = useSidebarContext();
  return (
    <IconButton
      icon="res-react-dash-sidebar-open"
      className="block sm:hidden"
      onClick={() => {
        console.log('setting');
        setSidebarVisible((prev) => !prev);
      }}
    />
  );
};

const Content: React.FC = () => {
  return (
    <>
      <div className="w-full sm:flex p-2 items-end">
        <div className="sm:flex-grow flex justify-between">
          <div className="">
            <div className="flex items-center">
              <div className="text-3xl font-bold text-white">Hello David</div>
              <div className="flex items-center p-2 bg-card ml-2 rounded-xl">
                <Icon path="res-react-dash-premium-star" />

                <div className="ml-2 font-bold text-premium-yellow">
                  PREMIUM
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Icon path="res-react-dash-date-indicator" className="w-3 h-3" />

              <div className="ml-2">October 26</div>
            </div>
          </div>
          <SidebarShowButton />
        </div>
        <div className="w-full sm:w-56 mt-4 sm:mt-0 relative">
          <Icon
            path="res-react-dash-search"
            className="w-5 h-5 search-icon left-3 absolute"
          />
          <form action="#" method="POST">
            <input
              type="text"
              name="company_website"
              id="company_website"
              className="pl-12 py-2 pr-2 block w-full rounded-lg border-gray-300 bg-card"
              placeholder="search"
            />
          </form>
        </div>
      </div>
      {employeeData.map(
        ({ id, name, position, transactions, rise, tasksCompleted, imgId }) => (
          <NameCard
            key={id}
            id={id}
            name={name}
            position={position}
            transactionAmount={transactions}
            rise={rise}
            tasksCompleted={tasksCompleted}
            imgId={imgId}
          />
        ),
      )}

      <div className="w-full flex flex-col lg:w-2/3">
        <div className="w-full p-2">
          <div className="rounded-lg bg-card sm:h-80 h-60">
            <Graph />
          </div>
        </div>
        <div className="w-full p-2">
          <div className="rounded-lg bg-card sm:h-80 h-60">
            <Graph />
          </div>
        </div>
        <div className="w-full p-2">
          <div className="rounded-lg bg-card sm:h-80 h-60">
            <Graph />
          </div>
        </div>
        <div className="w-full p-2">
          <div className="rounded-lg bg-card sm:h-80 h-60">
            <Graph />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:w-1/3">
        <div className="w-full p-2">
          <div className="rounded-lg bg-card h-80">
            <TopCountries />
          </div>
        </div>

        <div className="w-full p-2">
          <div className="rounded-lg bg-card h-80">
            <Segmentation />
          </div>
        </div>
        <div className="w-full p-2">
          <div className="rounded-lg bg-card h-80">
            <Satisfication />
          </div>
        </div>
        <div className="w-full p-2">
          <div className="rounded-lg bg-card overflow-hidden h-80">
            <AddComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
