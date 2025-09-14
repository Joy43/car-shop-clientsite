"use client";

import { FaPhoneAlt } from "react-icons/fa";
import { BsChatQuoteFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const feedbacks = [
  {
    text: "I really had my doubts at first. I asked for a quote online and the next day I was contacted by a sales representative. The quote came out high so the salesman did a good job to find me a good deal.",
    name: "David Morgan",
    title: "Director Of Morden Trade Ltd",
    img: "https://unicoderbd.com/template/chaka/assets/images/testimonial/1.png",
  },
  {
    text: "The service was quick and efficient. The staff was extremely helpful and guided me through every step of the process.",
    name: "Sarah Johnson",
    title: "CEO of TechPro Solutions",
    img: "https://static.vecteezy.com/system/resources/thumbnails/044/453/324/small_2x/beautiful-young-latin-american-woman-portrait-woman-walking-in-evening-city-in-hat-with-curly-hair-in-warm-weather-smiling-and-looking-at-camera-close-up-photo.jpg",
  },
  {
    text: "Great experience! Transparent pricing and excellent customer support throughout.",
    name: "Michael Smith",
    title: "Manager at AutoHouse Inc.",
    img: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
  },
];

// Animation variants
const textVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.5, ease: "easeIn" } },
};

const dotVariants = {
  active: { scale: 1.4, backgroundColor: "#EF4444" },
  inactive: { scale: 1, backgroundColor: "#D1D5DB" },
};

const contactCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const CustomerFeedback = () => {
  const [currentFeedback, setCurrentFeedback] = useState(0);

  const goToNext = () => {
    setCurrentFeedback((prev) => (prev + 1) % feedbacks.length);
  };

  const goToPrev = () => {
    setCurrentFeedback(
      (prev) => (prev - 1 + feedbacks.length) % feedbacks.length
    );
  };

  const goToIndex = (index: number) => {
    setCurrentFeedback(index);
  };

  useEffect(() => {
    const timer = setTimeout(goToNext, 6000);
    return () => clearTimeout(timer);
  }, [currentFeedback]);

  const current = feedbacks[currentFeedback];

  return (
    <section className="container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center min-h-[480px]">
      {/* Image Section */}
      <div className="relative flex justify-center">
        <motion.img
          key="car-bg"
          src="https://unicoderbd.com/template/chaka/assets/images/background/8.png"
          alt="Car Image"
          width={600}
          height={400}
          className="rounded-sm shadow-md object-contain max-w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          loading="lazy"
        />
      </div>

      {/* Feedback Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 select-none">
          Customer Feedback
        </h2>
        <BsChatQuoteFill
          className="text-red-500 text-5xl mb-6"
          aria-hidden="true"
        />

        {/* Animated feedback content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentFeedback}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="mb-10"
          >
            <p className="text-gray-600 text-lg leading-relaxed">
              {current.text}
            </p>
            <div className="flex items-center gap-5 mt-6">
              <img
                src={current.img}
                alt={current.name}
                width={60}
                height={60}
                className="rounded-full border-2 border-gray-300 object-cover"
              />
              <div>
                <h4 className="text-lg font-semibold text-red-600">
                  {current.name}
                </h4>
                <p className="text-gray-500 text-sm">{current.title}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation controls */}
        <div className="flex items-center justify-between mb-8 max-w-sm mx-auto">
          <button
            onClick={goToPrev}
            aria-label="Previous feedback"
            className="px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            ← Previous
          </button>

          <div className="flex gap-3">
            {feedbacks.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => goToIndex(idx)}
                aria-label={`Go to feedback ${idx + 1}`}
                className="w-3 h-3 rounded-full"
                variants={dotVariants}
                animate={idx === currentFeedback ? "active" : "inactive"}
                whileHover={{ scale: 1.6 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            aria-label="Next feedback"
            className="px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Next →
          </button>
        </div>

     <div className="mt-10 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
  {/* Service Info Card */}
  <motion.div
    className="bg-red-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-center"
    variants={contactCardVariants}
    initial="hidden"
    animate="visible"
    custom={0}
  >
    <h4 className="text-xl md:text-2xl font-semibold select-none tracking-wide">
      Reliability & Quality Service
    </h4>
    <p className="text-base md:text-lg mt-3 leading-relaxed opacity-90">
      If you would like to take our service and support, please contact us
      through our provided number.
    </p>
  </motion.div>

  {/* Contact Info Card */}
  <motion.div
    className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg flex items-center gap-5"
    variants={contactCardVariants}
    initial="hidden"
    animate="visible"
    custom={1}
  >
    {/* Icon */}
    <div className="bg-white/20 p-4 rounded-full flex items-center justify-center">
      <FaPhoneAlt className="text-2xl text-white" />
    </div>

    {/* Text Info */}
    <div>
      <h1 className="text-xl  font-bold tracking-wide select-none">
        Call Now
      </h1>
      <h4 className="text-lg md:text-xl font-semibold select-none mt-1">
        +880 817946548
      </h4>
      <p className="text-base md:text-lg mt-2 opacity-90">9:00 AM – 8:00 PM</p>
      <p className="text-base md:text-lg opacity-90">Sunday Off</p>
    </div>
  </motion.div>
</div>

      </div>
    </section>
  );
};

export default CustomerFeedback;
