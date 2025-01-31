import ReactPlayer from "react-player";
import herovid from "../../../assets/images/hero.webm";

export const Banner = () => {
  return (
    <div className="relative rounded-xl mt-8 w-full h-[600px] bg-black">
      {/* Background Video */}
      <ReactPlayer
        url={herovid}
        playing
        loop
        muted
        controls={false}
        width="100%"
        height="100%"
        className="absolute inset-0 object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-fadeIn">
          Hello, World!
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mt-4 animate-fadeIn delay-200">
          This is a sample text with an improved design.
        </p>
      </div>
    </div>
  );
};
