import { useSearchParams } from "react-router-dom";
import Loading from "../../../Components/Loading";
import { toast } from "sonner";
import { useVerifyOrderQuery } from "../../../redux/features/user/userOrder.api";
import { FiCheckCircle, FiXCircle, FiCreditCard, FiUser, FiBox, FiDollarSign } from "react-icons/fi";
import { MdPending } from "react-icons/md";
import { format } from "date-fns";

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  
  const { 
    isLoading, 
    data, 
    error 
  } = useVerifyOrderQuery(orderId || "", {
    skip: !orderId,
    refetchOnMountOrArgChange: true
  });

  const orderData = data?.data?.[0];
  console.log('order data is',orderData);

  if (!orderId) {
    toast.error("Invalid order ID");
    console.log('order data is',orderData);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <MdPending  className="text-red-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Invalid Order ID</h1>
          <p className="text-gray-600">Please check your order confirmation email for the correct link.</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  if (error || !orderData) {
    toast.error("Failed to load order details");
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <FiXCircle className="text-red-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h1>
          <p className="text-gray-600">Please verify your order ID or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            {orderData.payment_status === "Completed" ? (
              <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            ) : (
              <FiXCircle className="text-yellow-500 text-6xl mx-auto mb-4" />
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order {orderData.payment_status === "Completed" ? "Confirmed" : "Pending"}
            </h1>
            <p className="text-gray-600">
              {orderData.payment_status === "Completed" 
                ? "Your payment was successful!"
                : "Waiting for payment confirmation"}
            </p>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FiBox className="text-blue-500" /> Order Details
              </h2>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Order ID:</dt>
                  <dd className="font-medium">{orderData.order_id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Date:</dt>
                  <dd className="font-medium">
                    {format(new Date(orderData.date_time), 'dd MMM yyyy, h:mm a')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Currency:</dt>
                  <dd className="font-medium text-green-600">
                    {orderData?.currency} 
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Total Amount:</dt>
                  <dd className="font-medium text-green-600">
                    {orderData?.amount} 
                  </dd>
                </div>
                
                {orderData.discount_amount && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Discount:</dt>
                    <dd className="font-medium text-red-600">
                      -${orderData.discount_amount}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* User Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FiUser className="text-purple-500" /> Customer Information
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-gray-600">Name:</dt>
                  <dd className="font-medium">{orderData.name}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Email:</dt>
                  <dd className="font-medium">{orderData.email}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Phone:</dt>
                  <dd className="font-medium">{orderData.phone_no}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Address:</dt>
                  <dd className="font-medium">
                    {orderData.address}, {orderData.city}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FiCreditCard className="text-green-500" /> Payment Details
            </h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-gray-600">Payment Method:</dt>
                <dd className="font-medium">{orderData.method}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Transaction ID:</dt>
                <dd className="font-medium">{orderData.bank_trx_id|| "N/A"}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Invoice Number:</dt>
                <dd className="font-medium">{orderData.invoice_no}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Payment Status:</dt>
                <dd className={`font-medium ${
                  orderData.payment_status === "Completed" 
                    ? "text-green-600" 
                    : "text-yellow-600"
                }`}>
                  {orderData.bank_status}
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-gray-600">Bank Message:</dt>
                <dd className="font-medium">{orderData.sp_message || "N/A"}</dd>
              </div>
            </dl>
          </div>

          {orderData.payment_status !== "Completed" && (
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg text-center">
              <p className="text-yellow-700">
                Your payment is being processed. This might take a few minutes.
                <br />
                Please refresh the page or check your email for updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOrder;