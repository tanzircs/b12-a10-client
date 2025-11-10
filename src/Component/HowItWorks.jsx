import React from 'react';

const HowItWorks = () => {

  const steps = [
    {
      step: "01",
      title: "Join a Challenge",
      desc: "Pick a sustainability challenge that matches your lifestyle and goals.",
    },
    {
      step: "02",
      title: "Track Progress",
      desc: "Record your daily eco-friendly actions and watch your impact grow.",
    },
    {
      step: "03",
      title: "Share Tips",
      desc: "Exchange ideas and inspire others in the EcoTrack community.",
    },
  ];

    return (
      <div>
        <div className="max-w-[1440px] mx-auto px-4 mt-20">
          <h2 className="text-3xl font-semibold text-center mb-10">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl p-6 text-center shadow-sm transition-transform hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="text-4xl font-bold text-green-600 mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default HowItWorks;