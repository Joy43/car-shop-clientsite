
import errorimg from "../assets/error/astonot.jpg"
const Errorpage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A40] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,_transparent_1px)] bg-[length:20px_20px] opacity-30 z-0" />


<div className="z-10 text-center">
  <h2 className="text-2xl md:text-3xl font-semibold mb-6">Look like you’re lost in Route</h2>
  <div className="relative text-[120px] md:text-[180px] font-bold leading-none tracking-wider flex justify-center items-center">
    <span className="z-10">4</span>

    {/*----- Astronaut in the middle of 404 --------------*/}
    <span className="relative z-10 w-[80px] h-[120px] md:w-[120px] md:h-[160px] mx-2">
      <img
        src={errorimg} 
  
        className="object-contain"
      />
    </span>

    <span className="z-10">4</span>
  </div>

  {/* Go Back Button */}
  <button
    className="mt-8 px-6 py-3 bg-white text-[#0A0A40] rounded-md font-semibold hover:bg-gray-100 transition"
    onClick={() => window.history.back()}
  >
    GO BACK
  </button>
</div>
    </div>
  )
}

export default Errorpage
