import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";



export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md-row">
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 md-64 bg-[#FAF6F1] min-h-screen">
        <TopNav toggleSidebar={toggleSidebar} />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
