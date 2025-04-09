import { Outlet } from "react-router-dom"
import { Navbar } from "../shared/Navbar";
import Footer from "../shared/Footer";


const Mainlayout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <main className="min-h-screen">
        <Footer/>
        </main>
       
    </div>
  )
}

export default Mainlayout;