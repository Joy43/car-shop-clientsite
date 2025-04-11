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
import UserOrder from "../Pages/user/order/UserOrder";
import ManageOrder from "../Pages/admin/OrderManage/OrderManage";
import UpdateCars from "../Pages/admin/ManageCars/UpdateCars";
import Errorpage from "../Components/Errorpage";





export const router =createBrowserRouter([
    {
        path:"/",
        element:<Mainlayout/>,
        errorElement:<Errorpage/>,
        children:[
            {
               path:"/",
               element:<Home/>
            },
            {
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
                element: (
                    <ProtectedRoute>
                    <Checkout />
                    </ProtectedRoute>
                ) 
            },
            {
                path:"order/verification",
                element:<VerifyOrder/>
            },
            
         
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
         {
            path:'manageorder',
            element:<ManageOrder/>
         },
         {
            path: 'carupdate/:id', 
            element: <UpdateCars />,
           
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
         {
            path:"myorder",
            element:<UserOrder/>
         },
         

        ]
    },


])