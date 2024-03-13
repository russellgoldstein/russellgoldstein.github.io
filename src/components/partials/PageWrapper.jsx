import React, { useState } from 'react';

import Sidebar from './Sidebar';
import Header from './Header';

function PageWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex h-[100dvh] overflow-hidden'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className='grow'>{children}</main>
      </div>
    </div>
  );
}

export default PageWrapper;
