import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";


const slides = [
  {
    image: slide1,
    title: "Join Eco Challenges",
    description: "Small steps every day lead to a greener world.",
    buttonText: "Explore Challenges",
    buttonLink: "/challenges",
  },
  {
    image: slide2,
    title: "Track Your Impact",
    description: "Measure how your actions contribute to sustainability.",
    buttonText: "View Dashboard",
    buttonLink: "/dashboard",
  },
  {
    image: slide3,
    title: "Community Driven Change",
    description: "Connect and grow with eco-conscious members.",
    buttonText: "Get Started",
    buttonLink: "/register",
  },
];


const ImageSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="relative max-w-[1440px] mx-auto h-[500px]">
      <button
        ref={prevRef}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white p-3 rounded-full hover:bg-black transition"
      >
        ❮
      </button>
      <button
        ref={nextRef}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white p-3 rounded-full hover:bg-black transition"
      >
        ❯
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full h-full"
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="w-full h-full bg-cover bg-center flex flex-col items-start justify-center text-white px-10"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="max-w-xl mt-3 text-lg md:text-xl drop-shadow-md">
                {slide.description}
              </p>

              <a
                href={slide.buttonLink}
                className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-md hover:opacity-90 transition"
              >
                {slide.buttonText}
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
