import { Outlet } from "react-router-dom"
import { Navbar } from "../Home/shared/Navbar"


const Mainlayout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>

    </div>
  )
}

export default Mainlayout