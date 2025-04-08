import { useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../../redux/features/carProduct/carProduct.api";
import { useState } from "react";
import { useCreateOrderMutation } from "../../../redux/features/user/userOrder.api";
import { toast } from "sonner";
import Loading from "../../../Components/Loading";

const Checkout = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetCarByIdQuery(id as string);
  const [quantity, setQuantity] = useState(1);
  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();

  const handleOrder = async () => {
    const toastId = "order";
    try {
      toast.loading("Processing your order...", { id: toastId });
      
      const result = await createOrder({
        products: [{ product: id, quantity }]
      }).unwrap();

      toast.success(result.message, { id: toastId });
      
      if (result.data) {
        setTimeout(() => {
          window.location.href = result.data;
        }, 1000);
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || 
        "Something went wrong! Please try again.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Secure Checkout
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Order Summary
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <img 
              src={product?.data?.imageUrls[0]} 
              alt={product?.data?.brand}
              className="w-full md:w-64 h-64 object-contain rounded-lg border p-4"
            />
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product?.data?.brand}
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                ${product?.data?.price?.toFixed(2)}
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <label className="text-gray-700">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(10, Number(e.target.value))))}
                  className="w-20 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${(product?.data?.price * quantity)?.toFixed(2)}
              </span>
            </div>
            
            <button
              onClick={handleOrder}
              disabled={isOrderLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isOrderLoading ? 'Processing...' : 'Place Secure Order'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-gray-600 mb-2">
            <i className="fas fa-lock text-green-500 mr-2"></i>
            Secure SSL Encryption
          </p>
          <p className="text-gray-500 text-sm">
            Your payment information is protected with 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;