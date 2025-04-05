

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { useAddCarProductMutation } from '../../../redux/features/carProduct/carProduct.api';
import { TResponse } from '../../../types';
import { categoryOptions } from '../../../utils/global';

type FormValues = {
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  description: string;
  quantity: number;
  images: FileList;
};

const CreateProduct = () => {
  const [createProduct] = useAddCarProductMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    const formData = new FormData();

    // Append fields under data key
    formData.append('data[brand]', data.brand);
    formData.append('data[model]', data.model);
    formData.append('data[category]', data.category);
    formData.append('data[description]', data.description);
    formData.append('data[price]', String(data.price));
    formData.append('data[quantity]', String(data.quantity));
    formData.append('data[inStock]', 'true');

    // Append images under data[images] key
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append('data[images][]', file);
      });
    }

    try {
      const res = (await createProduct(formData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message || 'Error creating product', { id: toastId });
      } else {
        toast.success('Product created successfully!', { id: toastId });
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId });
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 pb-2 border-b-2 border-gray-200">
          Add New Car Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Brand */}
            <FormInput label="Brand" name="brand" control={control} errors={errors} />
            <FormInput label="Model" name="model" control={control} errors={errors} />

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category.message}</p>
              )}
            </div>

            {/* Images Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Images</label>
              <Controller
                name="images"
                control={control}
                rules={{ required: 'At least one image is required' }}
                render={({ field }) => (
                  <input
                    type="file"
                    multiple
                    onChange={(e) => field.onChange(e.target.files)}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.images ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                )}
              />
              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images.message}</p>
              )}
            </div>

            {/* Price */}
            <FormInput
              label="Price"
              name="price"
              control={control}
              errors={errors}
              type="number"
            />

            {/* Description */}
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            {/* Quantity */}
            <FormInput
              label="Quantity"
              name="quantity"
              control={control}
              errors={errors}
              type="number"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

// 🔹 Reusable Input Field Component
const FormInput = ({
  label,
  name,
  control,
  errors,
  type = 'text',
}: {
  label: string;
  name: keyof FormValues;
  control: any;
  errors: any;
  type?: string;
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <Controller
      name={name}
      control={control}
      rules={{ required: `${label} is required` }}
      render={({ field }: any) => (
        <input
          {...field}
          type={type}
          className={`w-full px-3 py-2 border rounded-md ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      )}
    />
    {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
  </div>
);
