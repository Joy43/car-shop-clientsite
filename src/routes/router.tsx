import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Pages/Mainlayout/Mainlayout";
import { Home } from "../Pages/Home/Home";
import Login from "../Components/Auth/Login";

import ProtectedRoute from "./ProtectedRoutes";

import Register from "../Components/Auth/Register";

import ManageCars from "../Pages/admin/ManageCars/ManageCars";
import AdminUser from "../Pages/admin/AdminUser/AdminUser";
import UserLayout from "../Pages/Mainlayout/userLayout";
import AdminLayout from "../Pages/Mainlayout/adminLayout";

import UserHome from "./../Pages/user/userHome/userHome";
import ManageCar from "../Pages/admin/ManageCars/ManageCars";
import AddCars from "../Pages/admin/AddCars/AddCars";
import AdminProfile from "../Pages/admin/AdminProfile/AdminProfile";
import UserManage from "../Pages/admin/ManageUser/UserManage";
import ProductPage from "../Pages/product/product";

import ProductDetails from "../Pages/product/ProductDeatils";
import Checkout from "../Pages/order/Checkout/Checkout";
import VerifyOrder from "../Pages/order/varifyorder/varifyOrder";





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
                path:'product',
                element:<ProductPage/>
    
    
             },
             {
                path: '/products',
                children: [
                  {
                    path: '/products:id',  
                    element: <ProductDetails />
                  },
                  
                ]
              },
              { path: "/product/checkout/:id",
                element: <Checkout /> 
            },
            {
                path:"order/verification",
                element:<VerifyOrder/>
            }
         
        ]
    },
// ---------admin route-----------
    {
        path:'admindashboard',
        element:(
            <ProtectedRoute>
                <AdminLayout/>
            </ProtectedRoute>
        ),
        children:[
           
         {
            path:'managecar',
            element:<ManageCar/>
         },
         {
            path:"adminhome",
            element:<AdminUser/>
         },
         {
            path:'addcarproduct',
            element:<AddCars/>
         },
         {
            path:'adminprofile',
            element:<AdminProfile/>
         },
         {
            path:'usermanage',
            element:<UserManage/>
         },
      
        ]
    },
    // ----------user------------
    {
        path:'userdashboard',
        element:(
            <ProtectedRoute>
                <UserLayout/>
            </ProtectedRoute>
        ),
        children:[
         {
            path:'managecar',
            element:<ManageCars/>
         },
         {
            path:"userhome",
            element:<UserHome/>
         },
        

        ]
    },


])