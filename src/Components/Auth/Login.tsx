import { useForm, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { setUser, TUser } from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging in...');
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.token) as TUser;
      dispatch(setUser({ user, token: res.data.token }));
      toast.success('Logged in successfully', { id: toastId, duration: 2000 });
    } catch (err) {
      toast.error('Invalid credentials', { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">User ID</label>
            <input 
              type="text" 
              {...register('userId', { required: 'User ID is required' })} 
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-200" 
            />
            {errors.userId && <p className="text-red-500 text-sm">{String(errors.userId.message)}</p>}
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
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
