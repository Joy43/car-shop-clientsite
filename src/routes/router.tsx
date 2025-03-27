import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Pages/Mainlayout/Mainlayout";
import { Home } from "../Pages/Home/Home";
import Login from "../Components/Auth/login";


export const router =createBrowserRouter([
    {
        path:"/",
        element:<Mainlayout/>,
        children:[
            {
               path:"/",
               element:<Home/>
            },{
                path:"/login",
                element:<Login/>
            }
        ]
    }
])