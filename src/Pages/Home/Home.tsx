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
    </>
  )
};
