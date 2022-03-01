import { useState } from 'react';

import Sidebar from './Sidebar';
import Content from './Content';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

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
