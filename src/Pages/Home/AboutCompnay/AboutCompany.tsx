import { FaCar, FaGasPump, FaCogs, FaRoad } from 'react-icons/fa';
import img1 from "../../../assets/carblogs/carblog (7).png";
import img2 from "../../../assets/carblogs/carblog (3).png";
import img3 from "../../../assets/carblogs/carblog (2).png";

const AboutCompany = () => {
  return (
    <section className="px-6 py-12 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* Left Section - Images and Stats */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <img src={img1} alt="Modern car design" width={200} height={200} className="rounded object-cover w-full h-40" />
            <img src={img2} alt="Advanced engine system" width={200} height={200} className="rounded object-cover w-full h-40" />
          </div>
          <div className="bg-gray-100 rounded p-4 text-center shadow-md">
            <p className="text-orange-600 text-xl font-bold">$698K</p>
            <p className="text-sm text-gray-600 font-semibold">Revenue</p>
            <p className="mt-2 text-gray-800 font-bold">
              Target <span className="text-orange-600">$2.8 Million</span>
            </p>
          </div>
        </div>

        {/* Right Section - Text and Icons */}
        <div>
          <h4 className="text-sm text-orange-600 font-semibold mb-2">ABOUT US</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 leading-tight mb-4">
            Driving Innovation <br /> In The Automotive World
          </h2>
          <p className="text-gray-600 mb-6">
            At AutoDynamics, we specialize in modern vehicle engineering, high-performance design, and sustainable car technology. 
            Our commitment is to deliver the best automotive experiences, pushing boundaries with every model.
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm font-medium">
            <div className="flex items-center space-x-2">
              <FaCar className="text-orange-500" />
              <span>Modern Vehicles</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaGasPump className="text-blue-500" />
              <span>Fuel Efficiency</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCogs className="text-yellow-500" />
              <span>Advanced Tech</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaRoad className="text-indigo-600" />
              <span>Road Performance</span>
            </div>
          </div>

          {/* Optional small image */}
          <div className="mt-6">
            <img src={img3} alt="Team at AutoDynamics" width={120} height={120} className="rounded object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
