import { toast } from "sonner";
import { selectCurrentUser, TUser } from "../../../redux/features/auth/authSlice";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/features/user/userManage.api";
import { useAppSelector } from "../../../redux/hooks";
import Loading from "../../../Components/Loading";

const UserManagement = () => {
  const { data: users, isLoading, refetch } = useGetUsersQuery(undefined);
  const [updateUserStatus] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserEmail = currentUser?.email ?? "";

  const isAdmin = currentUser?.role === "admin";

  const filteredUsers: TUser[] = Array.isArray(users?.data)
    ? users.data.filter(
        (user: TUser) => isAdmin || user.email === currentUserEmail
      )
    : [];

  // ----------------handle delete user------------------
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  // ---------status change handle------------------
  const handleStatusChange = async (userId: string, status: string) => {
    try {
      await updateUserStatus({ id: userId, data: { status } }).unwrap();
      toast.success("User status updated successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to update user status. Please try again.");
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl text-center font-semibold mb-4">
        User Management
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">Role</th>
              <th className="p-3 border border-gray-300">Status</th>
              <th className="p-3 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const { _id, name, email, role, status } = user;

              // Ensure _id exists (runtime check for safety)
              if (!_id) return null;

              return (
                <tr key={_id} className="text-center border border-gray-300">
                  <td className="p-3 border border-gray-300">{name}</td>
                  <td className="p-3 border border-gray-300">{email}</td>
                  <td className="p-3 border border-gray-300">{role}</td>
                  <td className="p-3 border border-gray-300">
                    {isAdmin ? (
                      <select
                        defaultValue={status}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          handleStatusChange(_id, e.target.value)
                        }
                        className="px-2 py-1 border rounded"
                      >
                        <option value="in-progress">In-progress</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    ) : (
                      <span>{status}</span>
                    )}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteUser(_id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
