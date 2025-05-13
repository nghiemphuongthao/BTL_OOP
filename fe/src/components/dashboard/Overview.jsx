import React from "react";
import StatusCard from "./StatusCard";

export default function Overview() {
  const statusCards = [
    {
      title"Active Licenses",
      value"245",
      icon"verified_user",
      color"green",
      trend"12% increase",
        icon"trending_up",
        color"text-green-600",
      },
    },
    {
      title"Expired Licenses",
      value"18",
      icon"gpp_bad",
      color"red",
      trend"5% decrease",
        icon"trending_down",
        color"text-red-600",
      },
    },
    {
      title"Total Services",
      value"32",
      icon"miscellaneous_services",
      color"blue",
      trend"3 new this month",
        icon"add_circle",
        color"text-blue-600",
      },
    },
    {
      title"Enterprise Clients",
      value"126",
      icon"business",
      color"purple",
      trend"8% increase",
        icon"trending_up",
        color"text-purple-600",
      },
    },
  ];

  return (
    <div className="mb-8 slide-in">
      <h3 className="text-lg font-nunito font-semibold text-[#5A3A1C] mb-4">Overview</h3>
      
      <div className="grid grid-cols-1 md-cols-2 lg-cols-4 gap-4">
        {statusCards.map((card, index) => (
          <StatusCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
