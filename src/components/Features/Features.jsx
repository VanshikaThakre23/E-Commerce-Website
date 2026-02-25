// Features.jsx
import React from "react";

const Features = ({ features }) => {
  return (
    <div className="flex flex-wrap justify-between items-center bg-gray-200 p-6 rounded-lg shadow-md gap-4">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center text-center space-y-2 flex-1 min-w-37.5">
          <div className="text-orange-400">{feature.icon}</div>
          <h3 className="font-semibold text-gray-800">{feature.title}</h3>
          <p className="text-gray-800 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;