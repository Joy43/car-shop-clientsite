
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetUsersQuery } from "../../../redux/features/user/userManage.api";
import { useGetAllReviewQuery } from "../../../redux/features/review/Review.api";
import { useGetAllOrderQuery } from "../../../redux/features/user/userOrder.api";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { MdVerifiedUser } from "react-icons/md";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

const AdminProfile = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { isLoading: isUsersLoading, isError: isUsersError } = useGetUsersQuery(undefined);
  const { data: reviewData } = useGetAllReviewQuery([]);
  const { data: orderData } = useGetAllOrderQuery([]);

  const [timeLeft, setTimeLeft] = useState("");

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

  // Chart Sample Data
  const orders = orderData?.data?.result || [];
  const reviews = reviewData?.data?.result || [];
  const activity = orders.length + reviews.length;

  const chartLabels = ["Orders", "Reviews", "Activity"];
  const chartValues = [orders.length, reviews.length, activity];

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Admin Metrics",
        data: chartValues,
        backgroundColor: ["#2563eb", "#10b981", "#f59e0b"],
        borderRadius: 8
      }
    ]
  };

  const lineChartData = {
    labels: ["Week 1", "Week 2", "Week 3"],
    datasets: [
      {
        label: "Engagement",
        data: [orders.length, reviews.length, activity],
        fill: true,
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        tension: 0.4
      }
    ]
  };

  if (isUsersLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (isUsersError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-md">
        Error loading admin data. Try again later.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow-lg mt-10">
      <div className="flex items-center gap-6">
        <img
          src={currentUser?.image || "/default-avatar.png"}
          alt="admin"
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MdVerifiedUser className="text-blue-500" />
            {currentUser?.name || "Admin"}
          </h2>
          <p className="text-gray-600">{currentUser?.email}</p>
          <p className="text-sm text-gray-500 mt-1">
            Joined: {currentUser?.createdAt ? formatDate(currentUser.createdAt) : "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-sky-50 p-4 rounded-md shadow-sm">
          <p className="text-gray-500 text-sm">Role</p>
          <p className="font-medium">{currentUser?.role || "Admin"}</p>
        </div>
        <div className="bg-sky-50 p-4 rounded-md shadow-sm">
          <p className="text-gray-500 text-sm">Session Expires In</p>
          <p className={`font-medium ${timeLeft === "Expired" ? "text-red-500" : "text-green-600"}`}>
            {timeLeft}
          </p>
        </div>
        <div className="bg-sky-50 p-4 rounded-md shadow-sm">
          <p className="text-gray-500 text-sm">Admin ID</p>
          <p className="font-medium">{currentUser?.userId || "N/A"}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 border">
          <h3 className="text-lg font-semibold mb-4">Overview</h3>
          <Bar data={chartData} />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border">
          <h3 className="text-lg font-semibold mb-4">User Engagement</h3>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
