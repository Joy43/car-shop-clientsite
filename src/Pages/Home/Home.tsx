import { motion } from "framer-motion";
import Footer from "../shared/Footer";
import AboutUs from "./AboutUs/AboutUs";
import Blogs from "./Blogs/Blogs";
import NewsletterForm from "./Newsletter/Nesletter";
import Popularcar from "./Popularcar/Popularcar";
import Slider from "./Slider/Slider";
import CustomerFeedback from "./Testomonia/Testomonia";

import { MdContactSupport } from "react-icons/md";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const Home = () => {
  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <Slider />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Popularcar />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <AboutUs />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <CustomerFeedback />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Blogs />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <NewsletterForm />
      </motion.div>

      <motion.main
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="min-h-screen"
      >
        <Footer />
      </motion.main>

      {/* Floating Contact Support Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link
          to="/carsupport"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-[#FA2B35] text-white p-2
          rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        >
          <MdContactSupport size={40} />
        </Link>
      </motion.div>

      {/* See More Button with Motion */}
      <motion.div
        className="flex justify-center mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      ></motion.div>
    </>
  );
};
