import React from "react";

export default function QuickActions() {
  const quickActions = [
    { icon"add_circle", label"New License" },
    { icon"search", label"Verify License" },
    { icon"business", label"New Enterprise" },
    { icon"inventory_2", label"New Package" },
  ];

  const statusItems = [
    { label"Active", count245, color"bg-green-500", percentage75 },
    { label"Expiring Soon", count34, color"bg-orange-500", percentage15 },
    { label"Expired", count18, color"bg-red-500", percentage10 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 slide-in">
      <h3 className="text-lg font-nunito font-semibold text-[#5A3A1C] mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <button 
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-[#F5EAD8] rounded-lg hover-[#E6D5B8] transition-colors duration-200"
          >
            <span className="material-icons text-[#704923] mb-2">{action.icon}</span>
            <span className="text-xs text-[#5A3A1C] text-center">{action.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-nunito font-semibold text-[#5A3A1C] mb-3">License Status</h4>
        
        <div className="space-y-3">
          {statusItems.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-[#8B5A2B]">{item.label}</span>
                <span className="text-xs text-[#5A3A1C] font-medium">{item.count}</span>
              </div>
              <div className="w-full bg-[#F5EAD8] rounded-full h-2">
                <div 
                  className={`${item.color} h-2 rounded-full`} 
                  style={{ width`${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
