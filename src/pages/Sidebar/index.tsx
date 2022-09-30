import React, { useContext } from 'react';
import clsx from 'clsx';
import { history } from 'umi';

import { MdDashboard } from 'react-icons/md';
import { GiMineTruck, GiTakeMyMoney, GiArchBridge } from 'react-icons/gi';
import { FaToolbox } from 'react-icons/fa';
import { AiOutlinePieChart } from 'react-icons/ai';
import { GrStakeholder } from 'react-icons/gr';
import { AiFillDiff } from 'react-icons/ai';
import {
  RiGovernmentFill,
  RiDiscussFill,
  RiExchangeBoxLine,
} from 'react-icons/ri';
import { BsStack } from 'react-icons/bs';
import { GoFileDirectory } from 'react-icons/go';

import { ReactComponent as LogoSVG } from '@/assets/logo.svg';
import { ReactComponent as MintSVG } from '@/assets/icons/mint_sidebar.svg';
import { ReactComponent as RedeemSVG } from '@/assets/icons/redeem_sidebar.svg';

import Icon from '../Home/Icon';
import MenuItem from './MenuItem';
import ChainDisplay from './ChainDisplay';
import { useWeb3Hooks } from '@/providers/web3HooksProvider';

import styles from './styles.less';

const svgSize = 25;
const smallerSvgSize = 22;
const sidebarItems = [
  {
    title: 'Dashboard',

    icon: <MdDashboard viewBox="0 0 24 24" size={svgSize} />,
    route: '/',
  },
  {
    title: 'Mint',
    icon: (
      <MintSVG
        className="ml-[2px]"
        fill="currentColor"
        width={smallerSvgSize}
        height={smallerSvgSize}
      />
    ),
    route: '/mint',
  },
  {
    title: 'Redeem',
    icon: (
      <RedeemSVG
        className="ml-[2px]"
        fill="currentColor"
        width={smallerSvgSize}
        height={smallerSvgSize}
      />
    ),
    route: '/redeem',
  },
  // {
  //   title: 'Redeem',
  //   icon: (
  //     <RedeemSVG
  //       className="ml-[2px]"
  //       fill="currentColor"
  //       width={smallerSvgSize}
  //       height={smallerSvgSize}
  //     />
  //   ),
  //   route: '/redeem',
  // },
  {
    title: 'Swap',
    icon: <RiExchangeBoxLine viewBox="0 0 24 24" size={svgSize} />,
    route: '/swap',
  },
  // {
  //   title: 'veHAS',
  //   icon: <FaToolbox size={svgSize} />,
  //   route: '/vehas',
  // },
  {
    title: 'Gauge',
    icon: <AiOutlinePieChart size={svgSize} />,
    route: '/gauge',
  },
  // {
  //   title: 'Cross Chain',
  //   icon: <GiArchBridge size={svgSize} />,
  //   route: '/cross-chain',
  // },
  {
    title: 'Farm',
    icon: <GrStakeholder size={svgSize} className="mr-[-3px]" />,
    route: '/farm',
  },
  {
    title: 'Portfolio',
    icon: <GoFileDirectory size={svgSize} className="mr-[-3px]" />,
    route: '/portfolio',
  },
  // { title: 'AMOs', icon: <AiFillDiff size={svgSize} />, route: '/amos' },
  // {
  //   title: 'Governance',
  //   icon: <RiGovernmentFill size={svgSize} />,
  //   route: '/governance',
  // },
  // {
  //   title: 'Governance Discussion',
  //   icon: <RiDiscussFill size={svgSize} />,
  //   route: '/governance-discussion',
  // },
  // {
  //   title: 'Integrations',
  //   icon: <BsStack size={svgSize} />,
  //   route: '/integrations',
  // },
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

const SidebarItemHighlight: React.FC<{ selectedIndex: number }> = ({
  selectedIndex,
}) => {
  const yOffset = selectedIndex * (40 + 12) + 12;
  return (
    <div
      className="sidebar-selection-box z-0 absolute bg-hyellow-1 h-10 rounded-lg px-4 py-2"
      style={{
        top: `${yOffset}px`,
        width: 'calc(100% - 24px)',
      }}
    />
  );
};

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
    <div className={styles['styles']}>
      <div
        className={clsx(
          'sidebar-wrapper flex-shrink-0 sm:fixed inset-y-0 left-0 bg-card w-full sm:w-24 xl:hover:w-60 group sm:flex flex-col z-10',
          sidebarVisible ? 'flex' : 'hidden',
        )}
      >
        <div className="flex-shrink-0 overflow-hidden p-2">
          <div className="flex items-center h-full sm:justify-center px-2 py-5 sidebar-separator-top">
            <LogoSVG width="100" height="22.5" />
          </div>
        </div>
        <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
          <ChainDisplay />
          <div className="flex flex-col relative px-3">
            <SidebarItemHighlight selectedIndex={Number.parseInt(selected)} />
            {sidebarItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onClick={setSelected}
                isSelected={selected === item.id}
              />
            ))}
          </div>

          <div className="flex-grow" />
        </div>

        <div className="flex-shrink-0 overflow-hidden p-2">
          <div className="flex items-center h-full sm:justify-center xl:group-hover:justify-start p-2 sidebar-separator-bottom">
            <div className="block sm:hidden xl:group-hover:block font-bold">
              {account && formatAccount(account)}
            </div>
            <div className="flex-grow block sm:hidden xl:group-hover:block" />
            <Icon
              path="res-react-dash-options"
              className="block sm:hidden xl:group-hover:block w-3 h-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
