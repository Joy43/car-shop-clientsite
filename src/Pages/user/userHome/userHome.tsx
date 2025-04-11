import { useEffect, useState } from "react";
import { format } from "date-fns";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import {  useAppSelector } from "../../../redux/hooks";
import { FaUserCircle } from "react-icons/fa";

const UserHome = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const [timeLeft, setTimeLeft] = useState("");

  // Countdown Logic
  useEffect(() => {
    if (!currentUser?.exp) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = currentUser.exp - now;

      if (remaining <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(remaining / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentUser]);

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "PPpp");
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 mt-10">
      <div className="flex items-center gap-6">
        <div className="text-red-500">
          <FaUserCircle size={40} />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentUser?.name || "Guest User"}
          </h2>
          <p className="text-gray-600">{currentUser?.email}</p>
          {currentUser?.createdAt && (
            <p className="text-sm text-gray-500 mt-2">
              Joined: {formatDate(currentUser.createdAt)}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-sky-50 p-4 rounded-md shadow-sm">
          <p className="text-gray-500 text-sm">Role</p>
          <p className="font-medium">{currentUser?.role}</p>
        </div>
        <div className="bg-sky-50 p-4 rounded-md shadow-sm">
          <p className="text-gray-500 text-sm">Session Expires In</p>
          <p className={`font-medium ${timeLeft === "Expired" ? "text-red-500" : "text-green-600"}`}>
            {timeLeft}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
