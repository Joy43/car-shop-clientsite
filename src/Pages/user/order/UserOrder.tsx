"use client";
import { toast } from "sonner";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
} from "../../../redux/features/user/userOrder.api";
import { useAppSelector } from "../../../redux/hooks";
import { TOrder } from "../../../types/order.type";
import { useState } from "react";
import Loading from "../../../Components/Loading";

const UserOrder = () => {
  const [page, setPage] = useState(1);
  const [loadingCancelId, setLoadingCancelId] = useState<string | null>(null);
  const limit = 8;

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useGetAllOrderQuery([
    { name: "limit", value: limit.toString() },
    { name: "page", value: page.toString() },
    { name: "sort", value: "id" },
  ]);

  const [deleteOrder] = useDeleteOrderMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserEmail = currentUser?.email;

  const rawOrders = Array.isArray(orders?.data?.result) ? orders?.data.result : [];
  const userOrders: TOrder[] = rawOrders.filter(
    (order: TOrder) => order.user?.email === currentUserEmail
  );
  console.log('userOrders', userOrders);
  console.log('orders', orders?.data?.result);
  const totalOrders = orders?.meta?.total || 0;
  const totalPages = Math.ceil(totalOrders / limit);
// -------------CANCEL ORDER FUNCTION---------
  const handleCancel = async (orderId: string) => {
    try {
      setLoadingCancelId(orderId);
      await deleteOrder(orderId).unwrap();
      toast.success("Order canceled successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to cancel order. Please try again.");
    } finally {
      setLoadingCancelId(null);
    }
  };

  if (isLoading) return <Loading />;
if(isError){
  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Error</h1>
        <p className="text-red-500">Failed to load orders. Please try again later.</p>
      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Your Orders</h1>
        
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 md:px-6">Order ID</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600 md:px-6">Items</th>
                  <th className="hidden px-4 py-3 text-right text-sm font-semibold text-gray-600 md:table-cell md:px-6">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 md:px-6">Status</th>
                  <th className="hidden px-4 py-3 text-left text-sm font-semibold text-gray-600 md:table-cell md:px-6">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 md:px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {userOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <span className="text-4xl">📦</span>
                        <p className="text-gray-500">You haven’t placed any orders yet.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  userOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50/50 even:bg-gray-50">
                      <td className="max-w-[120px] px-4 py-3 text-sm md:px-6">
                        <span className="truncate font-medium text-gray-800">
                          {order.transaction.id}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-gray-600 md:px-6">
                        {order.products.length} items
                      </td>
                      <td className="hidden px-4 py-3 text-right text-sm text-gray-600 md:table-cell md:px-6">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "BDT",
                        }).format(order.totalPrice)}
                      </td>
                      <td className="px-4 py-3 text-sm md:px-6">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                            order.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-sm text-gray-600 md:table-cell md:px-6">
                        <div className="flex flex-col">
                          <span>
                            {new Date(order.createdAt).toLocaleDateString("en-GB")}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(order.createdAt).toLocaleTimeString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm md:px-6">
                        {order.status !== "Paid" ? (
                          <button
                            onClick={() => handleCancel(order._id)}
                            disabled={loadingCancelId === order._id}
                            className={`text-sm font-medium text-red-600 transition-colors hover:text-red-800 ${
                              loadingCancelId === order._id ? "opacity-50" : ""
                            }`}
                          >
                            {loadingCancelId === order._id ? "Canceling..." : "Cancel"}
                          </button>
                        ) : (
                          <span className="text-sm font-medium text-green-600">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {userOrders.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="hidden flex-1 justify-between sm:flex">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(page * limit, totalOrders)}</span> of{" "}
                  <span className="font-medium">{totalOrders}</span> results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page >= totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrder;