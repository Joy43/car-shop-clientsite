

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Image imports
import banner from "../../../assets/banner/banner.jpeg";
import banner1 from "../../../assets/banner/banner1.jpeg";
import banner2 from "../../../assets/banner/banner2.jpeg";
import banner3 from "../../../assets/banner/banner3.jpeg";
import banner4 from "../../../assets/banner/banner4.jpeg";

// Slide Data Type
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imgSrc: string;
  gradient: string;
}

const sliderData: Slide[] = [
  {
    id: 1,
    title: "Modern Architecture",
    subtitle: "01 / Collection",
    description:
      "Exploring the intersection of form and function in contemporary design.",
    imgSrc: banner,
    gradient: "from-[#2A3D66]/80 to-[#2A3D66]/50",
  },
  {
    id: 2,
    title: "Urban Spaces",
    subtitle: "02 / Collection",
    description: "A blend of modern and natural landscapes for urban living.",
    imgSrc: banner1,
    gradient: "from-[#4F7B92]/80 to-[#4F7B92]/50",
  },
  {
    id: 3,
    title: "Interior Flow",
    subtitle: "03 / Collection",
    description: "Seamless design transitions for elegant interiors.",
    imgSrc: banner3,
    gradient: "from-[#5C6B73]/80 to-[#5C6B73]/50",
  },
  {
    id: 4,
    title: "Minimalist Designs",
    subtitle: "04 / Collection",
    description: "Achieving more with less through simplicity and function.",
    imgSrc: banner4,
    gradient: "from-[#5C6B73]/80 to-[#5C6B73]/50",
  },
  {
    id: 5,
    title: "Minimalist Designs",
    subtitle: "04 / Collection",
    description: "Achieving more with less through simplicity and function.",
    imgSrc: banner2,
    gradient: "from-[#5C6B73]/80 to-[#5C6B73]/50",
  },
];

const Slider: React.FC = () => {
  return (
    <div className="relative w-full h-screen min-h-[500px] bg-gray-100 text-white overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <div className="relative h-full flex flex-col md:flex-row items-center">
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-full relative overflow-hidden group">
                <img
                  src={slide.imgSrc}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} transition-opacity duration-500 group-hover:opacity-0`}
                ></div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white/90 md:bg-[#f8f8f8]">
                <div className="max-w-lg text-black text-center md:text-left">
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    {slide.subtitle}
                  </span>
                  <h2 className="mt-4 text-2xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent">
                    {slide.title}
                  </h2>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700">
                    {slide.description}
                  </p>
                  <button className="mt-6 px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg">
                    Explore More →
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