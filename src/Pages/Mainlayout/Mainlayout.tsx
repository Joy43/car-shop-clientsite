import { Outlet } from "react-router-dom"
import { Navbar } from "../Home/shared/Navbar"
import Footer from '../Home/shared/Footer';


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