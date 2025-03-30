import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Pages/Mainlayout/Mainlayout";
import { Home } from "../Pages/Home/Home";
import Login from "../Components/Auth/Login";

import ProtectedRoute from "./ProtectedRoutes";

import Register from "../Components/Auth/Register";
import product from './../Pages/product/product';




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
            },
            {
path:'/register',
element:<Register/>
            },
            {
                path:'/product',
               element:(
                <ProtectedRoute>
                    <product/>
                </ProtectedRoute>
               )
            }
        ]
    }
])