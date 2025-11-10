import React from 'react';
import Stats from '../Component/Stats';
import ImageSlider from '../Component/ImageSlider';
import WhyGoGreen from '../Component/WhyGoGreen';
import HowItWorks from '../Component/HowItWorks';

const Home = () => {
    return (
        <div>
            <ImageSlider/>
            <Stats />
            <WhyGoGreen />
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;