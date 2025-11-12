import React from "react";
import Stats from "../Component/Stats";
import ImageSlider from "../Component/ImageSlider";
import WhyGoGreen from "../Component/WhyGoGreen";
import HowItWorks from "../Component/HowItWorks";
import RecentTips from "../Component/RecentTips";
import ActiveChallenges from "./../Component/ActiveChallenges";

const Home = () => {
  return (
    <div>
      <ImageSlider />
      <Stats />
      <ActiveChallenges />
      <RecentTips />
      <WhyGoGreen />
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;
