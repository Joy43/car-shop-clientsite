import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../redux/features/auth/authSlice"
import { useAppSelector } from "../redux/hooks"
import { ReactNode } from "react";

const ProtectedRoute=({children}:{children:ReactNode})=>{
    const token=useAppSelector(useCurrentToken);
    if(!token){
        return <Navigate to="/login" replace ={true}/>
    }
    return children;
};
export default ProtectedRoute;