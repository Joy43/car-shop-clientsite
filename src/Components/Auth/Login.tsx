import { useForm, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { setUser, TUser } from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const defaultCredentials = {
  admin: { email: 'admin@gmail.com', password: '12345678' },
  user: { email: 'user@gmail.com', password: '12345678' }
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'admin' | 'user'>('user');

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging in...');
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      const user = verifyToken(res.data.token) as TUser;
      dispatch(setUser({ user, token: res.data.token }));

      toast.success('Logged in successfully', { id: toastId, duration: 2000 });
      navigate('/');
    } catch (err) {
      toast.error('Invalid credentials', { id: toastId, duration: 2000 });
    }
  };

  const handleTabChange = (tab: 'admin' | 'user') => {
    setActiveTab(tab);
    setValue('email', defaultCredentials[tab].email);
    setValue('password', defaultCredentials[tab].password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => handleTabChange('user')}
            className={`px-4 py-2 rounded-tl-lg ${activeTab === 'user' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          >
            User
          </button>
          <button
            onClick={() => handleTabChange('admin')}
            className={`px-4 py-2 rounded-tr-lg ${activeTab === 'admin' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          >
            Admin
          </button>
        </div>

    
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">User email</label>
            <input
              type="text"
              {...register('email', { required: 'User email is required' })}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.password && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <h1 className="mt-4 text-center">
          Create an account now
          <Link className="ml-2 text-blue-600" to="/register">register now</Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
