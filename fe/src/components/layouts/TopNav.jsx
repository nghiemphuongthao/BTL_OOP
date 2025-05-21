import React from "react";
import { useLocation } from "wouter";



export default function TopNav({ toggleSidebar }) {
  const [location] = useLocation();

  const getPageTitle = () => {
    let pageTitle;

    switch (location) {
      case "/":
        pageTitle = "Dashboard";
        break;
      case "/applications":
        pageTitle = "Applications";
        break;
      case "/licenses":
        pageTitle = "License Management";
        break;
      case "/services":
        pageTitle = "Services";
        break;
      case "/packages":
        pageTitle = "Service Packages";
        break;
      case "/enterprises":
        pageTitle = "Enterprises";
        break;
      case "/admins":
        pageTitle = "Admin Users";
        break;
      case "/settings":
        pageTitle = "Settings";
        break;
      default:
        pageTitle = "Dashboard";
    }
    return pageTitle;
  };

  return (
    <div className="bg-white shadow-sm py-2 px-4 flex items-center justify-between">
      <div className="flex items-center justify-center">
        <button
          className="md-4"
          onClick={toggleSidebar}
        >
          <span className="material-icons text-[#8B5A2B]">menu</span>
        </button>
        <h2 className="text-xl ml-2 font-nunito font-semibold text-[#5A3A1C]">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center">
        <div className="relative mr-4">
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-4 py-1 rounded-lg border border-[#E6D5B8] focus-none focus-2 focus-[#C19A6B] text-sm"
          />
          <span className="material-icons absolute left-2 top-1 text-[#C19A6B] text-sm">search</span>
        </div>

        <button className="p-2 rounded-full hover-[#FAF6F1] relative">
          <span className="material-icons text-[#8B5A2B]">notifications</span>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
        </button>
      </div>
    </div>
  );
}
