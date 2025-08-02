import { useState } from "react";
import { toast } from "sonner";
import { useAddSubscribeMutation } from "../../../redux/features/connected/connected.api";
import { motion } from "framer-motion";

const NewsletterForm = () => {
  const [subscribe] = useAddSubscribeMutation();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subscribe({ email }).unwrap();
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      toast.error("Subscription failed.");
    }
  };

  return (
    <section className="w-full bg-white rounded-2xl shadow-sm px-6 py-10 sm:p-12">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        <motion.div
          className="w-full lg:w-[50%]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <b className="text-xl sm:text-2xl">Get our weekly</b>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FF354D] leading-tight uppercase mt-1">
            Newsletter
          </h1>
          <p className="text-base sm:text-lg mt-5 text-gray-600">
            Get weekly updates on the newest design stories, case studies, and
            tips right in your mailbox. <b>Subscribe now!</b>
          </p>

          <form onSubmit={handleSubmit} className="relative mt-8 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="py-3 px-4 pr-[130px] w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF354D] transition"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-1 -translate-y-1/2 bg-[#FF354D] hover:bg-[#e0263c] text-white font-semibold px-5 py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </motion.div>

        <motion.div
          className="w-full lg:w-[45%]"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://i.ibb.co/sKzp64h/undraw-Newsletter-re-wrob-1.png"
            alt="Newsletter"
            className="w-full max-w-sm mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterForm;
