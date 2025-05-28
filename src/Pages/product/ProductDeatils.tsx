import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../redux/features/carProduct/carProduct.api";

import 'react-medium-image-zoom/dist/styles.css';
import Loading from "../../Components/Loading";
import Reviews from "./reviews";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAddWishlistMutation } from "../../redux/features/wishlist/wishlist.api";
import { toast } from "sonner";



const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading, isError } = useGetCarByIdQuery(id as string);
  const [selectedImage, setSelectedImage] = useState<string>("");


  const product = response?.data;
  const imageUrls = product?.imageUrls || [];


  // -------whishlist---------------
  const currentUser = useAppSelector(selectCurrentUser);
const [addToWishlist] = useAddWishlistMutation();

const handleAddToWishlist = async () => {
  if (!product) {
    alert("Product details are not loaded yet.");
    return;
  }

  try {
    await addToWishlist({
      userId: currentUser?.userId,
      carId: product._id,
    }).unwrap();

    toast.success("Added to wishlist successfully!");
  } catch (error) {
    console.error("Failed to add to wishlist:", error);
    toast.error("Something went wrong while adding to wishlist.");
  }
};
  useEffect(() => {
    if (imageUrls.length > 0) {
      setSelectedImage(imageUrls[0]);
    }
  }, [imageUrls]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading/>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 p-4">
        <h2 className="text-2xl font-bold text-red-500">Vehicle not found!</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
        >
          Return to Showroom
        </button>
      </div>
    );
  }

  return (
   
      <div className="mx-auto md:px-8 md:py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 sm:mb-8 text-gray-600 hover:text-blue-600 flex items-center transition-colors group"
        >
          <span className="text-2xl transform group-hover:-translate-x-1 transition-transform">←</span>
          <span className="ml-2">Back to Results</span>
        </button>

{/* -----------------product iteams---------------- */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* -----------left side------------- */}
          <div className="flex flex-col-reverse gap-[15px] md:gap-0 md:flex-row">
            {/*----------- Image Gallery -------------
            */}
           
              <div className="w-full md:w-[20%] flex flex-row md:flex-col md:gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 md:pr-2">

              {imageUrls.length > 1 && (
  imageUrls.map((img, idx) => (
    <button
      key={idx}
      className={`relative w-36 md:w-20 h-[70px] md:h-20 border-2 p-1 md:p-2 rounded-lg overflow-hidden ${
        selectedImage === img 
          ? "border-blue-600 ring-2 ring-red-400 ring-offset-2"
          : "border-transparent hover:border-blue-400"
      }`}
      onClick={() => setSelectedImage(img)}
    >
      <img
        src={img}
        alt={`${product.model}-${idx + 1}`}
        className="object-cover "
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
        }}
      />
    </button>
  ))
)}
   </div>
              {/* ----------main image------- */}
                <div className="w-full md:w-[80%] bg-gray-100 rounded-sm h-[280px] md:h-[400px] relative flex items-center justify-center"
                
                >
                  <img
                    src={selectedImage}
                    alt={product?.model}
                    className="object-cover w-[200px] md:w-[300px] rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
                    }}
                  />
                </div>

                    </div>
         

         
            {/* Right Product Details */}
<div className="flex flex-col gap-6">
  {/* Title */}
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
      {product.brand} {product.model}
    </h1>
    <div className="text-sm text-gray-500 mt-1">
      {product.year} • {product.category}
    </div>
  </div>

  {/* Price */}
  <div className="flex items-center">
    <span className="text-xl sm:text-2xl font-bold text-red-400">
      ${product.price.toLocaleString()}
    </span>
    <span className="ml-3 text-sm text-gray-500">
      (Excluding taxes & fees)
    </span>
  </div>

  {/* Availability & Date */}
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center">
        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
          {product.inStock ? "Available Now" : "Out of Stock"}
        </span>
      </div>
      <div className="flex items-center">
        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-gray-600">
          Listed {new Date(product.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  </div>

  {/* Add to Cart Button */}
  <div className="flex gap-4">
    <Link to={`/product/checkout/${product._id}`} className="block">
      <button
        className="w-fit bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!product.inStock}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Add to Cart
      </button>
    </Link>
    {/* --------------add to wishishlist----- */}
   <button
  onClick={handleAddToWishlist}
  className="w-fit cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
 
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
add wishlist
</button>

  </div>

  {/* Specifications */}
  <div className="pt-4 border-t">
    <h3 className="text-lg font-semibold mb-3">Key Specifications</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg">
        <span className="text-gray-600">Brand</span>
        <span className="font-medium">{product.brand}</span>
      </div>
      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg">
        <span className="text-gray-600">Model</span>
        <span className="font-medium">{product.model}</span>
      </div>
      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg">
        <span className="text-gray-600">Year</span>
        <span className="font-medium">{product.year}</span>
      </div>
      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg">
        <span className="text-gray-600">Category</span>
        <span className="font-medium capitalize">{product.category}</span>
      </div>
    </div>
  </div>
</div>




   


       
        </div>
   {/*-------------- Reviews Section------------- */}
        <Reviews productId={product._id} />

      </div>
  
  );
};

export default ProductDetails;