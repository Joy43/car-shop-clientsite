import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteCarProductMutation,
  useGetAllcarsQuery,
} from "../../../redux/features/carProduct/carProduct.api";
import Loading from "../../../Components/Loading";

const ManageCar = () => {
  const [page, setPage] = useState(1);
  const [deleteCarProduct] = useDeleteCarProductMutation();

  const {
    data: products,
    isLoading,
    refetch,
  } = useGetAllcarsQuery([
    { name: "limit", value: 8 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
  ]);

  const handleDelete = async (id: string) => {
    try {
      await deleteCarProduct(id).unwrap();
      toast.success("Car product deleted successfully!");
      refetch();
    } catch {
      toast.error("Failed to delete car product!");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto rounded-lg shadow">
        {isLoading ? (
          <div className="text-center text-lg text-gray-500">
            <Loading/>
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Brand</th>
                <th className="px-6 py-3">Model</th>
              
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.data?.map((car: any, index: number) => (
                <tr
                  key={car._id}
                  className={`border-b ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <td className="px-6 py-4">
                    <img
                      src={car.imageUrls?.[0]}
                      alt={car.brand}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">{car.brand}</td>
                  <td className="px-6 py-4">{car.model}</td>
                  
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition ml-2">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Page {page}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCar;
