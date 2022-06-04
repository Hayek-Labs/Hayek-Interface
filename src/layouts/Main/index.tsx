import Sidebar, { SidebarContext } from '@/pages/Sidebar';
import Providers from '@/providers/providers';
import React, { useContext, useMemo } from 'react';
import { useRef, useState } from 'react';

const ContainerContext = React.createContext<{
  containerRef: React.RefObject<HTMLDivElement>;
}>(undefined!);

export const useContainerRef = () => {
  return useContext(ContainerContext);
};

const MainLayout: React.FC = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerContextValue = useMemo(() => ({ containerRef }), []);

  return (
    <Providers>
      <SidebarContext.Provider value={{ sidebarVisible, setSidebarVisible }}>
        <div className="h-screen flex flex-col sm:flex-row bg-[#060203]">
          <div className="w-full sm:w-24 hover:xl:w-60 flex-shrink-0 main-trans">
            <Sidebar />
          </div>
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
