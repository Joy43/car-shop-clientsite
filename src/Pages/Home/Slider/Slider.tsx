"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// ----------imnage import-----------------
import banner from "../../../assets/banner/banner.jpeg"
import banner1 from "../../../assets/banner/banner1.jpeg"
import banner2 from "../../../assets/banner/banner2.jpeg"
import banner3 from "../../../assets/banner/banner3.jpeg"
import banner4 from "../../../assets/banner/banner4.jpeg"

// Define Type for Slider Data
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imgSrc: string;
  gradient: string;
}

export const sliderData: Slide[] = [
  {
    id: 1,
    title: "Modern Architecture",
    subtitle: "01 / collection",
    description:
      "Exploring the intersection of form and function in contemporary design.",
    imgSrc: banner,
    gradient: "from-[#2A3D66]/70 to-[#2A3D66]/50",
  },
  {
    id: 2,
    title: "Urban Spaces",
    subtitle: "02 / collection",
    description: "Shoishob girl collection new",
    imgSrc: banner1,
    gradient: "from-[#4F7B92]/70 to-[#4F7B92]/50",
  },
  {
    id: 3,
    title: "Interior Flow",
    subtitle: "03 / Band collection",
    description: "Shoishob winter collection",
    imgSrc: banner3,
    gradient: "from-[#5C6B73]/70 to-[#5C6B73]/50",
  },
  {
    id: 4,
    title: "Interior Flow",
    subtitle: "03 / Band collection",
    description: "Shoishob winter collection",
    imgSrc: banner4,
    gradient: "from-[#5C6B73]/70 to-[#5C6B73]/50",
  },
];

const Slider: React.FC = () => {
  return (
    <div className="relative p-4 w-full h-screen min-h-[500px] bg-gray-200 text-white overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <div className="relative h-full flex flex-col md:flex-row">
              {/*-------- Image Section ------------*/}
              <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-[80vh] relative overflow-hidden group">
                <img
                  src={slide.imgSrc}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} transition-opacity duration-500 group-hover:opacity-0`}
                ></div>
              </div>

              {/* --------------  Content Section  ----------------------*/}
              <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 bg-white/80 md:bg-[#e9e9e9]">
                <div className="max-w-lg text-black">
                  <span className="font-serif tracking-wider text-sm">
                    {slide.subtitle}
                  </span>
                  <h2 className="mt-4 font-serif text-2xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-black to-neutral-400 bg-clip-text text-transparent">
                    {slide.title}
                  </h2>
                  <p className="mt-4 text-base md:text-lg leading-relaxed">
                    {slide.description}
                  </p>
                  <button className="mt-6 px-6 py-3 text-white bg-red-500 hover:bg-[#D94E1B] rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                    Buy Now →
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
