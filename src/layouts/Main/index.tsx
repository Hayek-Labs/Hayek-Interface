import Sidebar, { SidebarContext } from '@/pages/Sidebar';
import Providers from '@/providers/providers';
import { useState } from 'react';

const MainLayout: React.FC = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <Providers>
      <SidebarContext.Provider value={{ sidebarVisible, setSidebarVisible }}>
        <div className="flex flex-col sm:flex-row">
          <Sidebar />
          <div className="flex w-full overflow-auto">
            <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
              .
            </div>
            <div className="h-max sm:h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
              {children}
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </Providers>
  );
};

export default MainLayout;
