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
}

const sliderData: Slide[] = [
  {
    id: 1,
    title: "Modern Architecture",
    subtitle: "01 / Collection",
    description: "Exploring the intersection of form and function in contemporary design.",
    imgSrc: banner,
  },
  {
    id: 2,
    title: "Urban Spaces",
    subtitle: "02 / Collection",
    description: "A blend of modern and natural landscapes for urban living.",
    imgSrc: banner1,
  },
  {
    id: 3,
    title: "Interior Flow",
    subtitle: "03 / Collection",
    description: "Seamless design transitions for elegant interiors.",
    imgSrc: banner3,
  },
  {
    id: 4,
    title: "Minimalist Designs",
    subtitle: "04 / Collection",
    description: "Achieving more with less through simplicity and function.",
    imgSrc: banner4,
  },
  {
    id: 5,
    title: "Timeless Aesthetics",
    subtitle: "05 / Collection",
    description: "Designs that stand the test of time with elegance.",
    imgSrc: banner2,
  },
];

const Slider: React.FC = () => {
  return (
    <div className="relative w-full h-[700px] bg-gray-100 text-white overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <div className="relative h-full flex items-center justify-center">
              {/* Image Section */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={slide?.imgSrc}
                  alt={slide?.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Overlay with #183052 */}
                <div className="absolute inset-0 bg-[#183052] opacity-70"></div>
              </div>

              {/* Content Section */}
              <div className="relative z-10 text-center max-w-2xl p-8">
                <span className="text-sm font-semibold uppercase tracking-wide text-gray-200">
                  {slide?.subtitle}
                </span>
                <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white">
                  {slide?.title}
                </h2>
                <p className="mt-4 text-lg text-gray-300">{slide?.description}</p>
                <button className="mt-6 px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg">
                 Buy More →
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
