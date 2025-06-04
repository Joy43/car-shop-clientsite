
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useAppSelector } from '../../../redux/hooks';
import { selectCurrentUser } from '../../../redux/features/auth/authSlice';
import { useGetAllReviewQuery } from '../../../redux/features/review/Review.api';
import { useGetAllOrderQuery } from '../../../redux/features/user/userOrder.api';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const UserHome = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [timeLeft, setTimeLeft] = useState<string>('');

  const { data: reviewData } = useGetAllReviewQuery([]);
  const reviews = reviewData?.data?.result || [];

  const { data: orderData } = useGetAllOrderQuery([]);
  const orders = orderData?.data?.result || [];

  // Format date
  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'PPpp');
  };

  // Countdown Timer
  useEffect(() => {
    if (!currentUser?.exp) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = currentUser.exp - now;

      if (remaining <= 0) {
        setTimeLeft('Expired');
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

  // Chart data
  const orderChartData = {
    labels: orders.map((_, index) => `Order #${index + 1}`),
    datasets: [
      {
        label: 'Orders',
        data: orders.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: '#38bdf8',
        borderRadius: 5,
      },
    ],
  };

  const reviewChartData = {
    labels: reviews.map((_, index) => `Review #${index + 1}`),
    datasets: [
      {
        label: 'Reviews',
        data: reviews.map(() => Math.floor(Math.random() * 10 + 1)),
        fill: false,
        borderColor: '#6366f1',
        tension: 0.3,
      },
    ],
  };

  const activityChartData = {
    labels: ['Orders', 'Reviews'],
    datasets: [
      {
        label: 'User Activity',
        data: [orders.length, reviews.length],
        backgroundColor: ['#4ade80', '#facc15'],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 bg-white rounded-3xl shadow-xl mt-10">
      {/* Header */}
      <div className="flex items-center gap-6">
        <img
          src={currentUser?.image}
          alt="user"
          className="w-16 h-16 rounded-full object-cover border-2 border-sky-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {currentUser?.name || 'Guest User'}
          </h2>
          <p className="text-gray-500">{currentUser?.email}</p>
          {currentUser?.createdAt && (
            <p className="text-sm text-gray-400">
              Joined: {formatDate(currentUser.createdAt)}
            </p>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-sky-100 p-5 rounded-xl shadow-md">
          <p className="text-sm text-gray-600">Role</p>
          <p className="text-lg font-semibold text-gray-800">{currentUser?.role}</p>
        </div>
        <div className="bg-green-100 p-5 rounded-xl shadow-md">
          <p className="text-sm text-gray-600">Session Expires In</p>
          <p
            className={`text-lg font-semibold ${
              timeLeft === 'Expired' ? 'text-red-500' : 'text-green-700'
            }`}
          >
            {timeLeft}
          </p>
        </div>
        <div className="bg-yellow-100 p-5 rounded-xl shadow-md">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-lg font-semibold text-gray-800">{orders.length}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-5 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Orders Overview</h3>
          <Bar data={orderChartData} />
        </div>

        <div className="bg-white p-5 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Review Activity</h3>
          <Line data={reviewChartData} />
        </div>

        <div className="bg-white p-5 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">User Activity Summary</h3>
          <Doughnut data={activityChartData} />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
