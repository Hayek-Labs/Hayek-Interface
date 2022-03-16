import React, { useContext } from 'react';
import clsx from 'clsx';
import { history } from 'umi';

import { MdDashboard } from 'react-icons/md';
import { GiMineTruck, GiTakeMyMoney, GiArchBridge } from 'react-icons/gi';
import { FaBalanceScale, FaToolbox } from 'react-icons/fa';
import { ImPieChart } from 'react-icons/im';
import { GrStakeholder } from 'react-icons/gr';
import { AiFillDiff } from 'react-icons/ai';
import {
  RiGovernmentFill,
  RiDiscussFill,
  RiExchangeBoxLine,
} from 'react-icons/ri';
import { BsStack } from 'react-icons/bs';

import { ReactComponent as LogoSVG } from '@/assets/logo.svg';

import Icon from '../Home/Icon';
import MenuItem from './MenuItem';
import ChainDisplay from './ChainDisplay';
import { useWeb3Hooks } from '@/providers/web3HooksProvider';

const svgSize = 25;
const sidebarItems = [
  {
    title: 'Dashboard',
    icon: <MdDashboard size={svgSize} />,
    route: '/',
  },
  {
    title: 'Exchange',
    icon: <RiExchangeBoxLine size={svgSize} />,
    route: '/exchange',
  },
  {
    title: 'Mint',
    icon: <GiMineTruck size={svgSize} />,
    route: '/mint',
  },
  {
    title: 'Redeem',
    icon: <GiTakeMyMoney size={svgSize} />,
    route: '/redeem',
  },
  {
    title: 'Swap',
    icon: <FaBalanceScale size={svgSize} />,
    route: '/swap',
  },
  {
    title: 'veHAS',
    icon: <FaToolbox size={svgSize} />,
    route: '/vehas',
  },
  {
    title: 'Gauge',
    icon: <ImPieChart size={svgSize} />,
    route: '/gauge',
  },
  {
    title: 'Cross Chain',
    icon: <GiArchBridge size={svgSize} />,
    route: '/cross-chain',
  },
  {
    title: 'Staking',
    icon: <GrStakeholder size={svgSize} className="remove-svg-fill" />,
    route: '/staking',
  },
  { title: 'AMOs', icon: <AiFillDiff size={svgSize} />, route: '/amos' },
  {
    title: 'Governance',
    icon: <RiGovernmentFill size={svgSize} />,
    route: '/governance',
  },
  {
    title: 'Governance Discussion',
    icon: <RiDiscussFill size={svgSize} />,
    route: '/governance-discussion',
  },
  {
    title: 'Integrations',
    icon: <BsStack size={svgSize} />,
    route: '/integrations',
  },
].map<{
  id: string;
  title: string;
  icon: JSX.Element;
  route: string;
}>((item, index) => ({
  ...item,
  id: index.toString(),
}));

export const icons = sidebarItems.reduce<Record<string, JSX.Element>>(
  (accum, next) => {
    accum[next.id] = next.icon;
    return accum;
  },
  {},
);

export const SidebarContext = React.createContext<{
  sidebarVisible: boolean;
  setSidebarVisible: SetState<boolean>;
}>(undefined!);

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

const idToRoute: Record<string, string> = sidebarItems.reduce<
  Record<string, string>
>((accum, next) => {
  accum[next.id] = next.route;
  return accum;
}, {});

const routeToId: Record<string, string> = Object.keys(idToRoute).reduce<
  Record<string, string>
>((accum, next) => {
  accum[idToRoute[next]] = next;
  return accum;
}, {});

const Sidebar = () => {
  const { sidebarVisible } = useSidebarContext();

  const { useAccount } = useWeb3Hooks();
  const account = useAccount();

  const formatAccount = (account: string) => {
    const first = account.substring(0, 6);
    const last = account.substring(account.length - 4, account.length);
    return (
      <span>
        Connected: {first}...{last}
      </span>
    );
  };

  const selected = routeToId[history.location.pathname];
  const setSelected = (id: string) => {
    history.push(idToRoute[id]);
  };

  return (
    <div
      className={clsx(
        'fixed inset-y-0 left-0 bg-card w-full sm:w-20 xl:w-60 sm:flex flex-col z-10',
        sidebarVisible ? 'flex' : 'hidden',
      )}
    >
      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start px-2 py-5 sidebar-separator-top">
          <LogoSVG width="100" height="22.5" />
        </div>
      </div>
      <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
        <ChainDisplay />
        {sidebarItems.map((i) => (
          <MenuItem
            key={i.id}
            item={{
              ...i,
              notifications: null,
            }}
            onClick={setSelected}
            selected={selected}
          />
        ))}

        <div className="flex-grow" />
      </div>

      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-bottom">
          <div className="block sm:hidden xl:block font-bold">
            {account && formatAccount(account)}
          </div>
          <div className="flex-grow block sm:hidden xl:block" />
          <Icon
            path="res-react-dash-options"
            className="block sm:hidden xl:block w-3 h-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
