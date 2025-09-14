import { motion } from "framer-motion";
import { FaGasPump } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { BsChatQuoteFill, BsFillCarFrontFill } from "react-icons/bs";

import { useGetAllcarsQuery } from "../../../redux/features/carProduct/carProduct.api";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";
import { HiArrowNarrowRight } from "react-icons/hi";
// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
  hover: {
    scale: 1.05,
    rotateX: 5,
    rotateY: 3,
    transition: { type: "spring", stiffness: 300, damping: 20 },
    boxShadow: "0 15px 25px rgba(255, 53, 77, 0.3)",
  },
};

const badgeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20,
      delay: 0.5,
    },
  },
};

const Popularcar = () => {
  const { data: products, isLoading } = useGetAllcarsQuery(undefined);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12 bg-slate-50 rounded-3xl">
      {/* Header */}
      <motion.div
        className="text-center max-w-xl mx-auto mb-12"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-extrabold text-4xl font-mono tracking-tight mb-2">
          Buy Your Dream Car
        </h1>
        <BsChatQuoteFill className="mx-auto text-[#FF354D] text-5xl mb-4" />
        <p className="text-gray-600 text-lg leading-relaxed">
          Interdum neque adipiscing eros enim velit suspendisse pulvinar lacus
          rhoncus varius. Inceptos lobortis. Sociosqu integer litora vulputate
          neque.
        </p>
      </motion.div>

      {/* Cars Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {products?.data?.slice(0, 6).map((car) => (
          <motion.div
            key={car._id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer select-none"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="relative overflow-hidden">
              <img
                src={car.imageUrls[0]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-52 object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
              {new Date(car.createdAt) >
                new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                <motion.span
                  className="absolute top-3 right-3 bg-[#FF354D] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg"
                  variants={badgeVariants}
                >
                  Sale
                </motion.span>
              )}
            </div>

            <Link
              to={`/products/${car._id}`}
              className="block p-5 hover:bg-gray-50 transition"
              aria-label={`View details for ${car.brand} ${car.model}`}
            >
              <time
                className="text-gray-400 text-xs mb-1 block"
                dateTime={car.createdAt}
              >
                {new Date(car.createdAt).toLocaleDateString()}
              </time>
              <h3 className="text-xl font-semibold text-gray-900 truncate">
                {car.brand} {car.model}
              </h3>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-[#16a34a] font-extrabold text-lg">
                  {car.price.toLocaleString()}
                </span>
                <span className="text-gray-400 text-sm">BDT</span>
              </div>

              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <AiFillStar
                    key={i}
                    className={i < 4 ? "text-yellow-400" : "text-gray-300"}
                    aria-hidden="true"
                  />
                ))}
                <span className="text-gray-500 text-xs ml-2">(5 Reviews)</span>
              </div>

              <p className="mt-3 text-gray-700 text-sm line-clamp-3">
                {car.description.length > 80
                  ? `${car.description.slice(0, 80)}...`
                  : car.description}
              </p>

              <div className="mt-4 border-t pt-3 flex justify-between text-gray-600 text-xs font-medium">
                <div className="flex items-center gap-1" title="Category">
                  <BsFillCarFrontFill className="text-[#EF4444]" />
                  <span>{car.category}</span>
                </div>

                <div
                  className="flex items-center gap-1"
                  title="Fuel Availability"
                >
                  <FaGasPump className="text-[#10B981]" />
                  <span>{car.inStock ? "Available" : "Sold Out"}</span>
                </div>
                <div className="flex items-center gap-1" title="Year">
                  <span className="text-red-400">📅</span>
                  <span>{car.year}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* See More Button */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
       <Link className="cursor-pointer" to="/product">
  <motion.button
    whileHover={{
      scale: 1.05,
      boxShadow: "0 6px 15px rgba(255,53,77,0.4)",
    }}
    className="bg-[#FF354D] cursor-pointer text-white font-semibold px-3 py-2 flex items-center mx-auto text-center gap-2 rounded-lg shadow-md transition"
  >
    <span>See More</span>
    <HiArrowNarrowRight className="text-lg" />
  </motion.button>
</Link>
      </motion.div>
    </div>
  );
};

export default Popularcar;
