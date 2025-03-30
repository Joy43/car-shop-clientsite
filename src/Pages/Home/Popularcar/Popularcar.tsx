import { FaGasPump } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { BsChatQuoteFill, BsFillCarFrontFill } from "react-icons/bs";
import { MdSpeed } from "react-icons/md";
import { useGetAllcarsQuery } from "../../../redux/features/carProduct/carProduct.api";

const Popularcar = () => {
  const { data: products, isLoading } = useGetAllcarsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;

  return (
   <div className="px-6 my-6 bg-slate-50">
{/* ---------header section--------------- */}

<div className="mx-auto my-4 flex flex-col items-center text-center max-w-lg">
  <h1 className="font-bold text-3xl font-mono">Buy Your Dream Car</h1>
  <BsChatQuoteFill className="text-red-500 text-4xl mb-4" />
  <p className="text-md">
    Interdum neque adipiscing eros enim velit suspendisse pulvinar lacus rhoncus varius. 
    Inceptos lobortis. Sociosqu integer litora vulputate neque.
  </p>
</div>

{/* ---------car product ------------------- */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.data?.slice(0, 6).map((car, idx) => (
        <div key={car._id} className="bg-white shadow-md rounded-lg overflow-hidden w-80 border">
          <div className="relative">
            <img
              src={car.imageUrls[0]}
              alt={car.brand + " " + car.model}
              className="w-full h-48 object-cover"
            />
            {new Date(car.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                Sale
              </span>
            )}
          </div>
          <div className="p-4">
            <p className="text-gray-500 text-sm">{new Date(car.createdAt).toDateString()}</p>
            <h3 className="text-lg font-semibold text-gray-900">{car.brand} {car.model}</h3>
            <div className="flex items-center gap-1">
              <span className="text-green-600 font-bold text-lg">${car.price.toLocaleString()}</span>
              <span className="text-gray-400 text-sm">/MRP</span>
            </div>
            <div className="flex items-center text-yellow-500 text-sm mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <AiFillStar key={i} className={i < 4 ? "text-yellow-500" : "text-gray-300"} />
              ))}
              <span className="text-gray-500 text-xs ml-1">(5 Reviews)</span>
            </div>
            <p className="text-gray-600 text-sm mt-2">{car.description.slice(0, 80)}...</p>
            <div className="border-t mt-3 pt-3 flex justify-between text-gray-600 text-xs">
              <div className="flex items-center gap-1">
                <BsFillCarFrontFill className="text-red-500" />
                <span>{car.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <MdSpeed className="text-blue-500" />
                <span>300KM/h</span>
              </div>
              <div className="flex items-center gap-1">
                <FaGasPump className="text-green-500" />
                <span>{car.inStock ? "Available" : "Sold Out"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-red-400">📅</span>
                <span>{car.year}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    {/* ------------button see more---------- */}
<div className="mt-4 py-2 text-center">
<button className="text-white font-semibold bg-red-500 rounded-md p-2 mr-2">
        See More
    </button>
</div>
   
   </div>
  );
};

export default Popularcar;
