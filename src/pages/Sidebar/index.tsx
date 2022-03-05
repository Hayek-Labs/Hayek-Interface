import React, { useContext } from 'react';
import clsx from 'clsx';
import { history } from 'umi';

import { MdDashboard } from 'react-icons/md';
import { GiMineTruck, GiTakeMyMoney, GiArchBridge } from 'react-icons/gi';
import { FaBalanceScale, FaToolbox } from 'react-icons/fa';
import { ImPieChart } from 'react-icons/im';
import { GrStakeholder } from 'react-icons/gr';
import { AiFillDiff } from 'react-icons/ai';
import { RiGovernmentFill, RiDiscussFill } from 'react-icons/ri';
import { BsStack } from 'react-icons/bs';

import { ReactComponent as LogoSVG } from '@/assets/logo.svg';

import Icon from '../Home/Icon';
import MenuItem from './MenuItem';
import ChainDisplay from './ChainDisplay';

const sidebarItems = [
  { id: '0', title: 'Dashboard', notifications: null },
  { id: '1', title: 'Mint', notifications: null },
  { id: '2', title: 'Redeem', notifications: null },
  { id: '3', title: 'Buyback & Recollateralize', notifications: null },
  { id: '4', title: 'veHAS', notifications: null },
  { id: '5', title: 'Gauge', notifications: null },
  { id: '6', title: 'Cross Chain', notifications: null },
  { id: '7', title: 'Staking', notifications: null },
  { id: '8', title: 'AMOs', notifications: null },
];

export const icons: Record<string, JSX.Element> = {
  0: <MdDashboard size={25} />,
  1: <GiMineTruck size={25} />,
  2: <GiTakeMyMoney size={25} />,
  3: <FaBalanceScale size={25} />,
  4: <FaToolbox size={25} />,
  5: <ImPieChart size={25} />,
  6: <GiArchBridge size={25} />,
  7: <GrStakeholder size={25} className="remove-svg-fill" />,
  8: <AiFillDiff size={25} />,
  9: <RiGovernmentFill size={25} />,
  10: <RiDiscussFill size={25} />,
  11: <BsStack size={25} />,
};

export const SidebarContext = React.createContext<{
  sidebarVisible: boolean;
  setSidebarVisible: SetState<boolean>;
}>(undefined!);

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

const idToRoute: Record<string, string> = {
  '0': '/',
  '1': '/mint',
  '2': '/redeem',
  '3': '/buyback-recollateralize',
  '4': '/vefxs',
  '5': '/gauge',
  '6': '/cross-chain',
  '7': '/staking',
  '8': '/amos',
};

const routeToId: Record<string, string> = Object.keys(idToRoute).reduce<
  Record<string, string>
>((accum, next) => {
  accum[idToRoute[next]] = next;
  return accum;
}, {});

const Sidebar = () => {
  const { sidebarVisible } = useSidebarContext();

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
            item={i}
            onClick={setSelected}
            selected={selected}
          />
        ))}

        <div className="flex-grow" />
      </div>

      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-bottom">
          <div className="block sm:hidden xl:block font-bold">
            0x3f5E...BfE9
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
