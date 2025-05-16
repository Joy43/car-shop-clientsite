
import Footer from "../shared/Footer";
import { Banner } from "./Banner/Banner"
import CarPurchaseSection from "./CarPurchaseSection/CarPurchaseSection";
import Popularcar from "./Popularcar/Popularcar";
import Slider from "./Slider/Slider"
import CustomerFeedback from "./Testomonia/Testomonia"

import { MdContactSupport } from "react-icons/md";
import { Link } from "react-router-dom";
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
        <Link
      to="/carsupport"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#FA2B35] text-white p-2
         rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      >
        <MdContactSupport  size={30} />
      </Link>
    </>
  )
};
