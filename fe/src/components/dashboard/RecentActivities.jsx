import React from "react";



export default function RecentActivities() {
  const activities= [
    {
      icon"add_circle",
      iconColor"text-green-600",
      iconBg"bg-green-100",
      title"New license created",
      description"For ABC Corporation - Premium Package",
      time"Today, 10:45 AM",
    },
    {
      icon"update",
      iconColor"text-orange-600",
      iconBg"bg-orange-100",
      title"License renewed",
      description"For XYZ Technologies - Basic Package",
      time"Yesterday, 2:30 PM",
    },
    {
      icon"cancel",
      iconColor"text-red-600",
      iconBg"bg-red-100",
      title"License suspended",
      description"For Global Enterprises - Enterprise Package",
      time"Yesterday, 11:15 AM",
    },
    {
      icon"verified_user",
      iconColor"text-blue-600",
      iconBg"bg-blue-100",
      title"License verification request",
      description"From Alpha Services API",
      time"2 days ago, 9:45 AM",
    },
  ];

  return (
    <div className="lg-span-2 bg-white rounded-lg shadow-sm p-5 slide-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-nunito font-semibold text-[#5A3A1C]">Recent Activities</h3>
        <button className="text-sm text-[#8B5A2B] hover-[#5A3A1C]">View All</button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={index}
            className={`flex items-start ${
              index < activities.length - 1 ? "pb-4 border-b border-[#F5EAD8]" ""
            }`}
          >
            <div className={`w-8 h-8 rounded-full ${activity.iconBg} flex items-center justify-center ${activity.iconColor} mt-1`}>
              <span className="material-icons text-sm">{activity.icon}</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-[#5A3A1C]">{activity.title}</p>
              <p className="text-xs text-[#A67C52]">{activity.description}</p>
              <p className="text-xs text-[#C19A6B] mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
