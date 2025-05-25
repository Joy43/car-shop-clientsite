
import logo from "../../assets/logo/carlogo.gif";

import { FaInstagram, FaPhone, FaWhatsapp, FaLinkedin, FaFacebook, FaFacebookF, FaLinkedinIn, FaSkype } from "react-icons/fa";

import bikas from "../../assets/images/paylogo/bikas.png";
import nagad from "../../assets/images/paylogo/Nagad.png";
import visacard from "../../assets/images/paylogo/visacard.png";
import douchbangla from "../../assets/images/paylogo/dutchbangla.png";
import martercard from "../../assets/images/paylogo/mastercard.png";

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-50 mt-8">
      {/* Payment Info */}
      <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <h1 className="text-black font-bold text-lg">Hours:</h1>
          <p className="text-gray-700 text-sm md:ml-2">9.00 am ~ 7.30 pm Saturday to Thursday</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[bikas, nagad, visacard, douchbangla, martercard].map((logoSrc, index) => (
            <div key={index} className="flex items-center justify-center p-4 bg-gray-100 rounded-md shadow-sm hover:shadow-lg transition-shadow">
              <img src={logoSrc} width={60} height={60} alt={`Payment logo ${index}`} className="object-contain" />
            </div>
          ))}
        </div>
      </div>

      <hr className="bottom-2" />
      {/* Contact Info */}
      <div className="flex flex-wrap items-center justify-between gap-6 p-4 text-center md:text-left border-spacing-2 border-pink-100">
        <div className="flex flex-col items-center md:items-start gap-2">
          <FaPhone className="text-red-500 w-8 h-8" />
          <p className="text-gray-700 text-sm">Do You Need Help</p>
          <a href="tel:+88 01701677162" className="text-blue-600 text-sm">+88 01701677162</a>
        </div>

        <div className="flex justify-center">
          <img className="w-20 h-16" src={logo}  alt="Shoishob Logo" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-black font-bold text-lg">Connect on Social</p>
          <ul className="flex gap-4">
            {[FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp].map((Icon, index) => (
              <li key={index}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Icon className="h-8 w-8 text-red-500 hover:text-indigo-400" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Section */}
    <footer className="w-full mx-auto max-w-[1400px] pt-16 pb-6 px-6 flex justify-between md:flex-row flex-col gap-8">
        <div className="w-full md:w-[30%]">
        <img src={logo} 
         className="w-32"
        alt="" />
          <p className="mt-3">
            Simple innate summer fat appear bas innate summer fat appear basket
            his desire joy.fat appear basket his desire joy.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <FaFacebookF className="p-2 text-[2rem] bg-brandColor text-white rounded-full" />
            <FaInstagram className="p-2 text-[2rem] bg-brandColor text-white rounded-full" />
            <FaLinkedinIn className="p-2 text-[2rem] bg-brandColor text-white rounded-full" />
            <FaSkype className="p-2 text-[2rem] bg-brandColor text-white rounded-full" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-[21px] font-[600]">Company</h2>
          <p className="hover:text-brandColor cursor-pointer transition-all duration-300">
            About Us
          </p>
          <p className="hover:text-brandColor cursor-pointer transition-all duration-300">
            Carear
          </p>
          <p className="hover:text-brandColor cursor-pointer transition-all duration-300">
            Blog
          </p>
          <p className="hover:text-brandColor cursor-pointer transition-all duration-300">
            Pricing
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-[21px] font-[600]">Resources</h2>
          <p className="hover:text-brandColor cursor-pointer transition-all duration-300">
            Templates
          </p>
          <p className="hover:text-brandColor cursor-pointer transition-all duration-300">
            Free Templates
          </p>
          <p className="hover:text-brandColor cursor-pointer transition-all duration-300">
            Tuitorials
          </p>
          <p className="hover:text-brandColor cursor-pointer transition-all duration-300">
            Contract templates
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-[21px] font-[600]">Join Our Newsletter</h2>
          <div className=" relative w-full">
            <input
              type="text"
              name=""
              id=""
              placeholder="Your email address"
              className="py-3 px-6 bordeno focus:outline-none bg-[#f3f3f3] w-full"
            />
            <button className="px-8 h-full absolute top-0 right-0 bg-red-500 text-white font-semibold">
              Subscribe
            </button>
          </div>
          <p className="w-[70%]">
            * Will send you weekly updates for your better finance management.
          </p>
        </div>
      </footer>
      
        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-5 mt-5 text-sm text-gray-600">
          <p>Copyright 2025 © Car shop. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><a href="#">Made by NI Car Shop</a></li>
          </ul>
        </div>
    </div>
  );
};

export default Footer;
