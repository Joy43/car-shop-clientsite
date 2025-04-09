import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../redux/features/carProduct/carProduct.api";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Loading from "../../Components/Loading";

// interface TProduct {
//   _id: string;
//   brand: string;
//   model: string;
//   year: number;
//   price: number;
//   category: string;
//   imageUrls: string[];
//   description: string;
//   quantity: number;
//   inStock: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading, isError } = useGetCarByIdQuery(id as string);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const product = response?.data;
  const imageUrls = product?.imageUrls || [];

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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 sm:mb-8 text-gray-600 hover:text-blue-600 flex items-center transition-colors group"
        >
          <span className="text-2xl transform group-hover:-translate-x-1 transition-transform">←</span>
          <span className="ml-2">Back to Results</span>
        </button>

{/* -----------------product iteams---------------- */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="aspect-square bg-gray-100 rounded-sm overflow-hidden shadow-sm relative">
                <Zoom
                
                >
                  <img
                    src={selectedImage}
                    alt={product?.model}
                    className="w-full object-cover cursor-zoom-in transition-opacity duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
                    }}
                  />
                </Zoom>
                {!product.inStock && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Sold Out
                  </div>
                )}
              </div>

              {imageUrls.length > 1 && (
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {imageUrls.map((img, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square group relative bg-gray-100 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                        selectedImage === img 
                          ? "border-blue-600 ring-2 ring-red-400 ring-offset-2"
                          : "border-transparent hover:border-blue-400"
                      }`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`${product.model}-${idx + 1}`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-car.jpg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {product.brand} {product.model}
                </h1>
                <div className="text-sm text-gray-500">
                  {product.year} • {product.category}
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-bold text-red-400">
                  ${product.price.toLocaleString()}
                </span>
                <span className="ml-3 text-sm text-gray-500">(Excluding taxes & fees)</span>
              </div>

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
                    <span className="text-gray-600">Listed {new Date(product.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to={`/product/checkout/${product._id}`} className="flex-1">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!product.inStock}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
             
              
              </Link>
                </div>
              </div>

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

          {/* Description Section */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">Vehicle Overview</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Reviews Section */}
          <div className="mt-8 pt-8 border-t">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Customer Reviews (0)</h3>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Write a Review
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-gray-500 mb-3">Be the first to review this vehicle</p>
              <div className="flex justify-center items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;