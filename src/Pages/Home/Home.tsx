import { FaWhatsapp } from "react-icons/fa";
import Footer from "../shared/Footer";
import { Banner } from "./Banner/Banner"
import CarPurchaseSection from "./CarPurchaseSection/CarPurchaseSection";
import Popularcar from "./Popularcar/Popularcar";
import Slider from "./Slider/Slider"
import CustomerFeedback from "./Testomonia/Testomonia"


export const Home = () => {
  return (
    <>
    <Slider/>
    <Banner/>
    <Popularcar/>
    <CustomerFeedback/>
    <CarPurchaseSection/>
    <main className="min-h-screen">
        <Footer/>
        </main>
        <a
        href="https://wa.me/+8801726606815"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4
         rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      >
        <FaWhatsapp size={22} />
      </a>
    </>
  )
};
