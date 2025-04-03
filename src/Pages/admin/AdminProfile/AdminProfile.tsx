
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetUsersQuery } from "../../../redux/features/user/userManage.api";
import { useAppSelector } from "../../../redux/hooks";


const AdminProfile = () => {
  const { isLoading, isError } = useGetUsersQuery(undefined);
  const currentUser = useAppSelector(selectCurrentUser);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load profile data</p>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Admin Profile</h2>
      <p>Name: { currentUser?.name}</p>
      <p>Email: { currentUser?.email}</p>
    </div>
  );
};

export default AdminProfile;
