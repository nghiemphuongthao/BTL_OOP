import React from "react";
import { Link, useLocation } from "wouter";
import { AdminUserInfo } from "../auth/AdminUserInfo";
import { LogoutButton } from "../auth/LogoutButton";
import { useAuth } from "../../hooks/use-auth";

export default function Sidebar({ open, toggleSidebar }) {
  const [location] = useLocation();
   const { admin, isLoading } = useAuth();

  const isActive = (path) => {
    return location === path;
  };

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "dashboard" },
    { path: "/licenses", label: "License Management", icon: "verified_user" },
    { path: "/applications", label: "Applications", icon: "apps" },
    { path: "/packages", label: "License Packages", icon: "inventory_2" },
    { path: "/customers", label: "Customers", icon: "people" },
    { path: "/invoices", label: "Invoices", icon: "receipt" },
    { path: "/admins", label: "Admin Users", icon: "admin_panel_settings" },
    { path: "/settings", label: "Settings", icon: "settings" },
  ];
  if(!admin){
    return <></>
  }

  return (
    <aside
      className={`${open ? "block" : "hidden md:block"
        } w-full md:w-64 bg-[#8B5A2B] text-white min-h-screen shadow-lg`}
    >
      <div className="p-4 border-b border-[#704923]">
        <h1 className="text-2xl font-nunito font-bold text-center">LMAI</h1>
        <p className="text-sm font-light text-center text-[#F5EAD8]">
          License Management
        </p>
      </div>

      <nav className="p-2">
        <p className="text-xs uppercase text-[#D2B48C] mt-4 mb-2 px-4">Main</p>

        {menuItems.slice(0, 6).map((item) => (
          <Link key={item.path} href={item.path} className={`flex items-center p-3 mb-1 rounded text-white ${isActive(item.path)
              ? "bg-[#704923]"
              : "hover:bg-[#A67C52] transition-colors duration-200"
            }`}>
            <span className="material-icons mr-3 text-sm">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}

        <p className="text-xs uppercase text-[#D2B48C] mt-6 mb-2 px-4">Administration</p>

        {menuItems.slice(6).map((item) => (
          <Link key={item.path} href={item.path}
              className={`flex items-center p-3 mb-1 rounded text-white ${isActive(item.path)
                  ? "bg-[#704923]"
                  : "hover:bg-[#A67C52] transition-colors duration-200"
                }`}
            >
              <span className="material-icons mr-3 text-sm">{item.icon}</span>
              <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-[#704923]">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#D2B48C] flex items-center justify-center">
            <span className="material-icons text-[#3D2815]">person</span>
          </div>
          <div className="ml-3">
            <AdminUserInfo />
          </div>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
