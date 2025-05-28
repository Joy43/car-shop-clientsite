"use client";
import { useAddContractMutation } from "../../redux/features/connected/connected.api";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [contract] = useAddContractMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  // -----------form data------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contract(formData).unwrap();
      toast.success("Message sent successfully! ✅");
      setFormData({ name: "", email: "", description: "" }); 
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="p-4">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-[2rem] font-bold text-red-500 leading-[36px]">Contact Us</h1>
        <p className="text-[1rem] text-[#424242]">Contact with our team</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[50px]">
        <div className="flex flex-col sm:flex-row items-center gap-[20px]">
          <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
            <label className="relative">
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
              />
              <span className="absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300">
                Your name
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
            <label className="relative">
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-red-500 transition-colors duration-300"
              />
              <span className="absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300">
                Email Address
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-[5px] w-full mt-[20px]">
          <label className="relative w-full">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="peer min-h-[200px] border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
            ></textarea>
            <span className="absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300">
              Write Message
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="py-2 px-6 border border-[#3B9DF8] text-[#3B9DF8] rounded font-[500] relative overflow-hidden z-10 mt-[10px]"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Contact;
