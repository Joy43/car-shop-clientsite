
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import {
  HiUser,
  HiEnvelope,
  HiLockClosed,
  HiHome,
  HiExclamationCircle,
  HiMapPin,

} from "react-icons/hi2";
import { useRegisterMutation } from "../../redux/features/auth/authApi";

// Cloudinary uploader
const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "upload_car");
  data.append("cloud_name", "dluuillmt");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dluuillmt/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const responseData = await response.json();
    return responseData.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

const Register = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const [phoneValue, setPhoneValue] = useState<string>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating user...");

    try {
      let imageUrl = "";
      if (imageFile) {
        const uploadedImage = await uploadToCloudinary(imageFile);
        if (uploadedImage) imageUrl = uploadedImage;
      }

      const userInfo = {
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
        phone: phoneValue?.trim(),
        address: data.address.trim(),
        city: data.city,
        image: imageUrl,
      };

      const res = await registerUser(userInfo).unwrap();
      console.log(res);

      toast.success("Registration successful!", { id: toastId });
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-red-500">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                {...formRegister("name", { required: "Name is required" })}
                placeholder="Full Name"
                className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-purple-400"
              />
              <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <HiExclamationCircle className="mr-1" />
                  {String(errors.name.message)}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type="email"
                {...formRegister("email", { required: "Email is required" })}
                placeholder="Email"
                className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-purple-400"
              />
              <HiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <HiExclamationCircle className="mr-1" />
                  {String(errors.email.message)}
                </p>
              )}
            </div>
          </div>

          {/* Password and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="password"
                {...formRegister("password", {
                  required: "Password is required",
                })}
                placeholder="Password"
                className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-purple-400"
              />
              <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <HiExclamationCircle className="mr-1" />
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            <div className="relative">
              <PhoneInput
                defaultCountry="BD"
                value={phoneValue}
                onChange={setPhoneValue}
                placeholder="Phone Number"
                className="w-full px-4 py-3 pl-12 border rounded-lg"
              />
              {!phoneValue && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <HiExclamationCircle className="mr-1" />
                  Phone number is required
                </p>
              )}
            </div>
          </div>

          {/* Address and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <select
                {...formRegister("city", { required: "City is required" })}
                className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-purple-400"
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
              <HiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
              {errors.city && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <HiExclamationCircle className="mr-1" />
                  {String(errors.city.message)}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                {...formRegister("address", {
                  required: "Address is required",
                })}
                placeholder="Address"
                className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-purple-400"
              />
              <HiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <HiExclamationCircle className="mr-1" />
                  {String(errors.address.message)}
                </p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
            />
            <div className="flex items-center mt-2 space-x-4">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-gray-500">Upload Profile Picture</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-fit px-3 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Create Account
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
