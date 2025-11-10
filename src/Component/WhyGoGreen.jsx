import React from 'react';
import { Leaf, Coins, ShieldCheck } from "lucide-react";

const WhyGoGreen = () => {

  const benefits = [
    {
      icon: <Leaf size={40} />,
      title: "Reduce Pollution",
      desc: "Small sustainable choices help lower air, water, and land pollution.",
    },
    {
      icon: <Coins size={40} />,
      title: "Save Money",
      desc: "Energy-efficient habits and mindful consumption reduce daily costs.",
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Protect Future Generations",
      desc: "Your actions today help preserve resources for tomorrow.",
    },
  ];

    return (
      <div className="max-w-[1440px] mx-auto px-4 mt-20">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Why Go Green?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-6 text-center shadow-sm transition-transform hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="flex justify-center text-green-600 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default WhyGoGreen;