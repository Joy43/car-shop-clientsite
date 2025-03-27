import { Outlet } from "react-router-dom"
import { Navbar } from "../shared/Navbar";
import Footer from "../shared/Footer";


const Mainlayout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
     <Footer/>
    </div>
  )
}

export default Mainlayout;