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
  const [createOrder, { isSuccess,isLoading: isOrderLoading,data }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    await createOrder({
      products: [{ product: id, quantity }],
    });
  };

  const toastId = "order";
  if (isOrderLoading) toast.loading("Processing your order...", { id: toastId });
  if (isSuccess) {
    toast.success(data?.message, { id: toastId });
    if (data?.data) {
      setTimeout(() => {
        window.location.href = data.data;
      }, 1000);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, Math.min(10, newQuantity)))
  };

  if (isLoading) return <Loading />;

  return (
    <section className="font-poppins flex items-center justify-center min-h-screen bg-black bg-opacity-20">
      <div className="flex w-[1300px] p-10 bg-white border-2 border-gray-400 rounded-xl">
        {/* Product Images Column */}
        <div className="flex flex-col gap-14 items-center mr-6">
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path
              d="M15 8.5L8 1.5L1 8.5"
              stroke="#999999"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          <div className="flex flex-col gap-3">
            {[1, 2, 3, ].map((_, idx) => (
              <img
                key={idx}
                className="w-20 h-[90px] object-cover"
                src={product?.data?.imageUrls[idx]}
                alt={product?.data?.brand}
              />
            ))}
          </div>

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 8.5L12 15.5L5 8.5"
              stroke="#999999"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Main Product Image */}
        <img 
          className="w-[556px] mr-6"
          src={product?.data?.imageUrls[0]}
          alt={product?.data?.brand}
        />

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex gap-2 items-center">
            <h1 className="text-4xl font-semibold text-black">
              {product?.data?.brand}
            </h1>
            <span className="text-sm text-white px-2 py-1 bg-red-500 bg-opacity-20">
              In Stock
            </span>
          </div>

          {/* Rating and SKU */}
          <div className="flex items-center mt-3 text-sm">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="#FF8A00"
                >
                  <path d="M8.31008 11.9111L11.8566 14.1577C12.31 14.4446 12.8725 14.0177 12.7381 13.4884L11.7138 9.45805C11.6848 9.34579 11.6882 9.22764 11.7234 9.11718C11.7586 9.00673 11.8243 8.90846 11.9129 8.83368L15.0933 6.18711C15.5106 5.83949 15.2958 5.14593 14.7586 5.11105L10.6056 4.84105C10.4938 4.83312 10.3866 4.79359 10.2964 4.72707C10.2061 4.66055 10.1367 4.56977 10.096 4.4653L8.5469 0.564927C8.50471 0.454081 8.42984 0.358673 8.33219 0.291355C8.23455 0.224037 8.11875 0.187988 8.00015 0.187988C7.88155 0.187988 7.76574 0.224037 7.6681 0.291355C7.57046 0.358673 7.49558 0.454081 7.4534 0.564927L5.90427 4.4653C5.86372 4.56988 5.79429 4.66077 5.70406 4.7274C5.61383 4.79402 5.50652 4.83364 5.39465 4.84161L1.24171 5.11161C0.705084 5.14593 0.489084 5.83949 0.907022 6.18711L4.0874 8.83424C4.17588 8.90898 4.2415 9.00715 4.27673 9.11749C4.31195 9.22783 4.31534 9.34587 4.28652 9.45805L3.33702 13.1959C3.17558 13.8309 3.85115 14.3434 4.39452 13.9986L7.69077 11.9111C7.78342 11.8522 7.89093 11.8209 8.00071 11.8209C8.11049 11.8209 8.218 11.8522 8.31065 11.9111H8.31008Z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 mr-3">4 Reviews •</span>
  
            
          </div>

          {/* Pricing */}
          <div className="h-9 mt-5 flex items-center gap-3">
            <div className="flex items-center gap-1">
            
              <div className="text-[#2c732f] text-2xl font-medium">
              ${((product?.data?.price ?? 0) * quantity).toFixed(2)}
              </div>
            </div>
            <div className="px-2.5 py-[3px] bg-[#e94b48]/10 rounded-[30px] text-[#e94b48] text-sm font-medium">
             Total Price
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="h-[88px] mt-6 py-[18px] flex items-center gap-3">
            <div className="p-2 bg-white rounded-[170px] border border-neutral-200 flex items-center">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-[34px] h-[34px] flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path
                    d="M2.33398 7H11.6673"
                    stroke="#666666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="w-10 text-center text-[#191919] text-base outline-none"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-[34px] h-[34px] flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path
                    d="M2.33398 6.99998H11.6673M7.00065 2.33331V11.6666"
                    stroke="#1A1A1A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isOrderLoading}
              className="h-[51px] px-20 py-4 bg-red-500 rounded-[43px] flex items-center gap-4 hover:bg-[#009f06] transition-colors disabled:opacity-50"
            >
              <span className="text-white text-base font-semibold">
                {isOrderLoading ? 'Adding...' : 'Order Now'}
              </span>
           
            </button>
          </div>

          {/* Product Description */}
          <p className="text-[#7f7f7f] text-sm mt-4 leading-[21px]">
            {product?.data?.description || "Class aptent taciti sociosqu ad litora torquent per conubia nostra..."}
          </p>

          {/* Product Meta */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[#191919] text-sm font-medium">Category:</span>
              <span className="text-[#7f7f7f] text-sm">{product?.data?.category}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[#191919] text-sm font-medium">Related-Band:</span>
              {["Kia", "Hyundai",  "Rogue", "Pathfinder","Nissan" ,"Chevrolet"].map((tag) => (
                <span key={tag} className="text-[#7f7f7f] text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;