import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetUsersQuery } from "../../../redux/features/user/userManage.api";
import { format } from 'date-fns';
import { MdEmail, MdPerson, MdVerifiedUser, MdFingerprint, MdTimer } from "react-icons/md";

const AdminProfile = () => {
  const { isLoading, isError } = useGetUsersQuery(undefined);
  const currentUser = useAppSelector(selectCurrentUser);

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'PPpp');
  };

  if (isLoading) return (
    <div className="flex justify-center p-8">
      <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  );

  if (isError) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>Failed to load profile data. Please try again later.</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MdVerifiedUser className="text-blue-600 w-6 h-6" />
          Administrator Profile
        </h2>
      </div>

      <div className="px-6 py-4">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MdPerson className="w-5 h-5" />
              <h3 className="text-lg font-semibold">User Details</h3>
            </div>
            <div className="space-y-2 pl-8">
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {currentUser?.name || 'N/A'}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <MdEmail className="w-4 h-4" />
                {currentUser?.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Role:</span> {currentUser?.role}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <MdFingerprint className="w-4 h-4" />
                <span>User ID: {currentUser?.userId}</span>
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MdTimer className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Token Information</h3>
            </div>
            <div className="space-y-2 pl-8">
              <p className="text-gray-700">
                <span className="font-medium">Issued At:</span> {currentUser?.iat ? formatDate(currentUser.iat) : 'N/A'}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Expiration:</span> {currentUser?.exp ? formatDate(currentUser.exp) : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;