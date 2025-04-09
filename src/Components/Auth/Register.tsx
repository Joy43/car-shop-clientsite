import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useForm, FieldValues } from "react-hook-form";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { 
  HiUser, 
  HiEnvelope, 
  HiLockClosed, 
 
  HiHome, 
  HiExclamationCircle,
  HiMapPin 
} from 'react-icons/hi2';

const Register = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const [phoneValue, setPhoneValue] = useState<string>();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
   
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating User..");
    
    try {
      const userInfo = {
        name: data.name?.trim(),
        email: data.email?.trim(),
        password: data.password,
        phone: phoneValue?.trim(),
        address: data.address?.trim(),
        city: data.city?.trim(),
      };

      const res = await registerUser(userInfo).unwrap();
      console.log(res);
      toast.success("Register success", { id: toastId, duration: 2000 });
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-md shadow-xl backdrop-blur-lg bg-opacity-90 border border-white border-opacity-20">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-500 text-sm">Join our Carshop community to get started</p>
        </div>
{/* ------------------from start----------- */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/*----------- Name Field ---------------*/}
            <div className="relative">
            <input
              className="w-full px-4 py-3 pl-12 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Full Name"
              {...formRegister("name", { required: "Name is required" })}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <HiUser className="w-5 h-5 text-red-500" />
            </span>
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {String(errors.name.message)}
              </p>
            )}
          </div>

          {/*-------------- Email Field ------------------*/}
          <div className="relative">
            <input
              type="email"
              className="w-full px-4 py-3 pl-12 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Email"
              {...formRegister("email", { required: "Email is required" })}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <HiEnvelope className="w-5 h-5 text-red-500" />
            </span>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {String(errors.email.message)}
              </p>
            )}
          </div>
        </div>

          {/* Password Field */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative">
            <input
              type="password"
              className="w-full px-4 py-3 pl-12 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Password"
              {...formRegister("password", { required: "Password is required" })}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <HiLockClosed className="w-5 h-5 text-red-500" />
            </span>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {String(errors.password.message)}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="relative">
            <PhoneInput
              defaultCountry="BD"
              value={phoneValue}
              onChange={setPhoneValue}
              className="w-full px-4 py-3 pl-12 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Phone Number"
            />
            {!phoneValue && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                Phone number is required
              </p>
            )}
          </div>
          </div>


<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
   {/* City Field */}
   <div className="relative">
            <select
              className="w-full px-4 py-3 pl-12 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              {...formRegister("city", { required: "City is required" })}
            >
              <option value="">Select City</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Khulna">Khulna</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Barisal">Barisal</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <HiMapPin className="w-5 h-5 text-red-500" />
            </span>
            {errors.city && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {String(errors.city.message)}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div className="relative">
            <input
              className="w-full px-4 py-3 pl-12 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Address"
              {...formRegister("address", { required: "Address is required" })}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <HiHome className="w-5 h-5 text-red-500" />
            </span>
            {errors.address && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {String(errors.address.message)}
              </p>
            )}
          </div>
</div>
         

          {/* Submit Button */}
          <button
            type="submit"
            className="py-2 px-2  mx-auto flex justify-center items-center gap-2 rounded-lg border border-transparent font-semibold bg-red-500  text-white hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
