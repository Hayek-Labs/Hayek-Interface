import Sidebar, { SidebarContext } from '@/pages/Sidebar';
import { useState } from 'react';

const MainLayout: React.FC = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <SidebarContext.Provider value={{ sidebarVisible, setSidebarVisible }}>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex w-full">
          <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
            .
          </div>
          <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
            {children}
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default MainLayout;
