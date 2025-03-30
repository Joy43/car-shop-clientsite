import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useForm, FieldValues } from "react-hook-form";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating User...");
    try {
      const userInfo = {
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
      };
  
      const res = await register(userInfo).unwrap();
      console.log("Register Response:", res); 
  
      // if (!res.data || !res.data.token) {
      //   throw new Error("Invalid response from server");
      // }
  
      // const user = verifyToken(res.data.token) as TUser;
      // dispatch(setUser({ user: user, token: res.data.token }));
  
      toast.success("Register success", { id: toastId, duration: 2000 });
      navigate('/login');
    } catch (error: any) {
      console.error("Registration Error:", error);
      toast.error(error?.data?.message || "Registration failed", { id: toastId, duration: 2000 });
    }
    
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Name" {...formRegister("name", { required: "Name is required" })} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>}
          </div>
          <div>
            <input className="w-full p-2 border border-gray-300 rounded-md" type="email" placeholder="Email" {...formRegister("email", { required: "Email is required" })} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>}
          </div>
          <div>
            <input className="w-full p-2 border border-gray-300 rounded-md" type="password" placeholder="Password" {...formRegister("password", { required: "Password is required" })} />
            {errors.password && <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>}
          </div>
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
