
import logo from "../../assets/logo/logoGif.gif";

import { FaInstagram, FaPhone, FaWhatsapp, FaLinkedin, FaFacebook } from "react-icons/fa";

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
      <footer className="bg-gray-100 p-6 border-t-2">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-1">
            <h2 className="text-xl font-bold text-gray-800">Our Company</h2>
            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              Shoishob is a leading kids fashion brand in Bangladesh that represents style and quality since 2008.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">Customer Services</h2>
            <ul className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
              {["Contact Us", "Fabric Care", "Store Locator", "Terms & Conditions", "Return & Exchange Policy", "Track Your Order", "Privacy Policy", "FAQs"].map((item, index) => (
                <li key={index}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">Our Categories</h2>
            <ul className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
              {["Baby Collection", "Girls Collection", "Boys Collection", "Bubble", "Accessories"].map((item, index) => (
                <li key={index}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p className="text-lg font-bold text-gray-900">Contact Us</p>
            <div className="flex gap-4 mt-2">
              <a href="#">
                <img src="https://mcqmate.com/public/imgs/icons/playstore.svg" alt="Playstore Button" width={40} height={40} />
              </a>
              <a href="https://www.youtube.com/channel/UCo8tEi6SrGFP8XG9O0ljFgA">
                <img src="https://mcqmate.com/public/imgs/icons/youtube.svg" alt="Youtube Button"  />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:info@shoishobbd.com" className="text-blue-600">info@shoishobbd.com</a>
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> <a href="tel:+8802 55058350" className="text-blue-600">+8802 55058350</a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-5 mt-5 text-sm text-gray-600">
          <p>Copyright 2025 © Shoishob Fashion Ltd. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><a href="#">Made by NI Car Shop</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
