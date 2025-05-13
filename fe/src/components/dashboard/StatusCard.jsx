import React from "react";

;
}

export default function StatusCard({ title, value, icon, color, trend }) {
  const getColorClasses = () => {
    switch (color) {
      case "green""border-green-500",
          iconBg"bg-green-100",
          iconColor"text-green-600",
        };
      case "red""border-red-500",
          iconBg"bg-red-100",
          iconColor"text-red-600",
        };
      case "blue""border-blue-500",
          iconBg"bg-blue-100",
          iconColor"text-blue-600",
        };
      case "purple""border-purple-500",
          iconBg"bg-purple-100",
          iconColor"text-purple-600",
        };
      default"border-[#C19A6B]",
          iconBg"bg-[#F5EAD8]",
          iconColor"text-[#8B5A2B]",
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div className={`bg-white rounded-lg shadow-sm p-5 border-l-4 ${colorClasses.border}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#A67C52]">{title}</p>
          <p className="text-2xl font-nunito font-bold text-[#5A3A1C]">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-full ${colorClasses.iconBg} flex items-center justify-center ${colorClasses.iconColor}`}>
          <span className="material-icons">{icon}</span>
        </div>
      </div>
      <div className={`mt-2 flex items-center text-sm ${trend.color}`}>
        <span className="material-icons text-sm mr-1">{trend.icon}</span>
        <span>{trend.value}</span>
      </div>
    </div>
  );
}
