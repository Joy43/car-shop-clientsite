import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Pages/Mainlayout/Mainlayout";
import { Home } from "../Pages/Home/Home";


export const router =createBrowserRouter([
    {
        path:"/",
        element:<Mainlayout/>,
        children:[
            {
               path:"/",
               element:<Home/>
            }
        ]
    }
])