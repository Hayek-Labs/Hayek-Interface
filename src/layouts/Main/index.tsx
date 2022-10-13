import Sidebar, { SidebarContext } from '@/pages/Sidebar';
import Providers from '@/providers/providers';
import React, { useContext, useMemo } from 'react';
import { useRef, useState } from 'react';
import clsx from 'clsx';

const ContainerContext = React.createContext<{
  containerRef: React.RefObject<HTMLDivElement>;
}>(undefined!);

export const useContainerRef = () => {
  return useContext(ContainerContext);
};

const MainLayout: React.FC = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarExpand, setSidebarExpand] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerContextValue = useMemo(() => ({ containerRef }), []);

  return (
    <Providers>
      <SidebarContext.Provider
        value={{
          sidebarVisible,
          setSidebarVisible,
          sidebarExpand,
          setSidebarExpand,
        }}
      >
        <div className="h-screen flex flex-col sm:flex-row bg-[#060203]">
          {/* <div className="w-full sm:w-24 hover:xl:w-60 flex-shrink-0 main-trans"> */}
          <div
            className={clsx(
              sidebarExpand
                ? 'w-full xl:w-60 flex-shrink-0 main-trans'
                : 'w-full sm:w-24 flex-shrink-0 main-trans',
            )}
          >
            <Sidebar />
          </div>
          <button
            className="w-4 h-10"
            style={{
              marginTop: '25%',
              backgroundColor: '#353535',
              border: 'solid 0.75px #171717',
              borderRadius: '4px',
            }}
            onClick={() => {
              setSidebarExpand(!sidebarExpand);
            }}
          >
            {!sidebarExpand ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#171717"
                width="1.25em"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#171717"
                width="1.25em"
                transform="rotate(180)"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}
          </button>
          <div
            className="h-full flex-1 overflow-x-hidden overflow-y-auto flex flex-row flex-wrap content-start px-2"
            ref={containerRef}
          >
            <ContainerContext.Provider value={containerContextValue}>
              {children}
            </ContainerContext.Provider>
          </div>
        </div>
      </SidebarContext.Provider>
    </Providers>
  );
};

export default MainLayout;
