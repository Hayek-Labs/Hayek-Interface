import Sidebar, { SidebarContext } from '@/pages/Sidebar';
import { useState } from 'react';

const MainLayout: React.FC = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <SidebarContext.Provider value={{ sidebarVisible, setSidebarVisible }}>
      <div className="flex flex-row">
        <Sidebar />
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

export default MainLayout;
