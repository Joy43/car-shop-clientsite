import { toast } from "sonner";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

import { useAppSelector } from "../../../redux/hooks";
import { Tuser } from "../../../types/User.types";
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../../../redux/features/user/userManage.api";


const UserManage = () => {
  const { data: usersData, refetch } = useGetUsersQuery(undefined);
  const [updateUserStatus] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserEmail = currentUser?.email;

  const isAdmin = currentUser?.role === "admin";

  const filteredUsers = ((usersData?.data as Tuser[]) ?? []).filter(
    (user: Tuser) => isAdmin || user.email === currentUserEmail
  );

  // ------------Delete User----------
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  // ----------STATUS Setting----------
  const handleStatusChange = async (userId: string, status: boolean) => {
    try {
      await updateUserStatus({ _id: userId, data: { status } }).unwrap();
      toast.success("User status updated successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to update user status. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-200">Name</th>
              <th className="p-3 border border-gray-200">Email</th>
              <th className="p-3 border border-gray-200">Role</th>
              <th className="p-3 border border-gray-200">Status</th>
              <th className="p-3 border border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(({ _id, name, email, role, status }: Tuser) => (
              <tr key={_id} className="border border-gray-200 hover:bg-gray-50">
                <td className="p-3 border border-gray-200">{name}</td>
                <td className="p-3 border border-gray-200">{email}</td>
                <td className="p-3 border border-gray-200">
                  <span className={`px-2 py-1 rounded text-white ${role === "admin" ? "bg-blue-500" : "bg-green-500"}`}>
                    {role}
                  </span>
                </td>
                <td className="p-3 border border-gray-200">
                  <button
                    onClick={() => handleStatusChange(_id, !status)}
                    className={`px-3 py-1 rounded text-white ${status ? "bg-red-500" : "bg-green-500"}`}
                  >
                    {status ? "Deactivate" : "Activate"}
                  </button>
                </td>
                <td className="p-3 border border-gray-200">
                  <button
                    onClick={() => handleDeleteUser(_id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManage;
