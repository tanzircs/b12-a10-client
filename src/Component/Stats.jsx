import React from 'react';

  const data = [
    { label: "Total CO₂ Saved", value: "12,450 kg" },
    { label: "Plastic Reduced", value: "2,330 kg" },
    { label: "Active Participants", value: "987" },
    { label: "Challenges Running", value: "12" },
  ];

const Stats = () => {
    return (
      <div className="max-w-[1440px] mx-auto px-4 mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl shadow-sm p-5 flex flex-col items-center"
          >
            <span className="text-sm text-gray-500">{item.label}</span>
            <span className="text-2xl font-semibold mt-1 text-gray-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    );
};

export default Stats;