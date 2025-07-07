import React from "react";

const StatCard = ({
  title,
  value,
  icon,
  color = "text-blue-600",
  bg = "bg-blue-100",
}) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow  hover:shadow-md transition-all">
      <div className={`p-3 rounded-full ${bg} ${color} text-xl`}>{icon}</div>
      <div className="ml-4">
        <h4 className="text-gray-600 text-sm">{title}</h4>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
