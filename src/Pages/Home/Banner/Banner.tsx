
import herovid from "../../../assets/images/hero.webm";

export const Banner = () => {
  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-black">
      {/* Background Video */}
      <video
  className="absolute inset-0 w-full h-full object-cover"
  src={herovid}
  autoPlay
  muted
  loop
  playsInline
></video>


      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      {/*-------------- Content ------------------*/}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl animate-fadeIn">
          Car Shop
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-2 animate-fadeIn delay-200">
          Explore the ultimate collection of high-performance cars.
        </p>

        {/* --------------- Button -----------------------------*/}
        <button className="mt-4 px-6 py-2 bg-red-500 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg animate-fadeIn delay-500">
          Explore Now
        </button>
      </div>
    </div>
  );
};
