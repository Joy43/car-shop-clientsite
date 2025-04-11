"use client";

import { useState } from "react";
import { toast } from "sonner";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/hooks";
import { TOrder } from "../../../types/order.type";
import Loading from "../../../Components/Loading";
import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
  useUpdateOrderMutation,
} from "../../../redux/features/user/userOrder.api";

const ManageOrder = () => {
  const [page, setPage] = useState(1);
  const [loadingCancelId, setLoadingCancelId] = useState<string | null>(null);
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserEmail = currentUser?.email;
  const isAdmin = currentUser?.role === "admin";

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useGetAllOrderQuery([
    { name: "limit", value: 8 },
    { name: "page", value: page.toString() },
    { name: "sort", value: "id" },
  ]);

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderMutation();

  const metaData = orders?.meta;
  const filteredOrders: TOrder[] = Array.isArray(orders?.data?.result)
    ? orders.data.result.filter(
        (order: TOrder) => isAdmin || order.email === currentUserEmail
      )
    : [];

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

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus({ id: orderId, data: { status } }).unwrap();
      toast.success("Order status updated!");
      refetch();
    } catch (error) {
      toast.error("Failed to update order status.");
    }
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Error</h2>
          <p className="text-red-600">Failed to fetch orders. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-6  text-center text-2xl font-bold text-gray-800">Manage Orders</h1>

        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Transaction ID</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Items</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Total</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      You haven’t placed any orders yet.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{order.transaction?.id || "N/A"}</td>
                      <td className="px-4 py-3">{order.products.length} items</td>
                      <td className="px-4 py-3">
                        ৳{new Intl.NumberFormat().format(order.totalPrice)}
                      </td>
                      <td className="px-4 py-3">
                        {isAdmin ? (
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="rounded-md border-gray-300 text-sm focus:ring-primary focus:border-primary"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                              order.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div>
                          <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-400">
                            {new Date(order.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {order.status === "Pending" && (
                          <button
                            onClick={() => handleCancel(order._id)}
                            disabled={loadingCancelId === order._id}
                            className={`text-red-600 hover:text-red-800 text-sm ${
                              loadingCancelId === order._id ? "opacity-50" : ""
                            }`}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {metaData?.total && (
          <div className="mt-6 flex justify-center">
            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.ceil(metaData.total / metaData.limit) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded-md border text-sm ${
                    page === i + 1
                      ? "bg-primary text-white"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrder;
