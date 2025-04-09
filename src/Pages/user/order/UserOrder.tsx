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

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useGetAllOrderQuery([
    { name: "limit", value: "8" },
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
  console.log("userOrders", userOrders);
  console.log("orders", orders);
    const totalOrders = orders?.meta?.total || 0;  
    console.log("totalOrders", totalOrders);
  const totalPages = Math.ceil(totalOrders / 8); 


//   const handlePageChange = (newPage: number) => {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="overflow-x-auto w-full lg:w-3/4">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left text-gray-600 font-semibold">Order ID</th>
              <th className="px-6 py-4 text-left text-gray-600 font-semibold">User Email</th>
              <th className="px-6 py-4 text-left text-gray-600 font-semibold">Products</th>
              <th className="px-6 py-4 text-left text-gray-600 font-semibold">Total Price</th>
              <th className="px-6 py-4 text-left text-gray-600 font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-gray-600 font-semibold">Created At</th>
              <th className="px-6 py-4 text-left text-gray-600 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  You haven’t placed any orders yet.
                </td>
              </tr>
            ) : (
              userOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{order._id}</td>
                  <td className="px-6 py-4 text-gray-800">{order.user?.email}</td>
                  <td className="px-6 py-4 text-gray-800">{order.products.length}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "BDT",
                    }).format(order.totalPrice)}
                  </td>
                  <td className="px-6 py-4 text-gray-800">{order.status}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {new Date(order.createdAt).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {order.status !== "Paid" ? (
                      <button
                        onClick={() => handleCancel(order._id)}
                        disabled={loadingCancelId === order._id}
                        className={`text-red-500 hover:text-red-700 ${
                          loadingCancelId === order._id ? "opacity-50" : ""
                        }`}
                      >
                        {loadingCancelId === order._id ? "Canceling..." : "Cancel"}
                      </button>
                    ) : (
                      <span className="text-green-600 font-medium">Paid</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
