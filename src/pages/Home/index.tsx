import { useEffect, useState } from 'react';

import Sidebar from './Sidebar';
import Content from './Content';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const a = 5;
  useEffect(() => {
    if (a) {
      setShowSidebar(true);
    }
  }, []);
  return (
    <div className="flex">
      <Sidebar
        onSidebarHide={() => {
          setShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <Content
        onSidebarHide={() => {
          setShowSidebar(false);
        }}
      />
    </div>
  );
};
export default App;
