import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { useAddCarProductMutation } from '../../../redux/features/carProduct/carProduct.api';
import { TResponse } from '../../../types';
import { categoryOptions } from '../../../utils/global';
import { uploadToCloudinary } from '../../../utils/uploadToCloudinary';

type FormValues = {
  brand: string;
  model: string;
  category: string;
  year: number;
  price: number;
  description: string;
  quantity: number;
  images: FileList;
};

const CreateProduct = () => {
  const [createProduct] = useAddCarProductMutation();
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = (files: FileList | null) => {
    if (files) setImageFiles(prev => [...prev, ...Array.from(files)]);
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading('Creating product...');
    try {
      if (imageFiles.length === 0) {
        toast.error('Please select at least one image.', { id: toastId });
        return;
      }

      // Upload images in parallel
      const uploadPromises = imageFiles.map(file => uploadToCloudinary(file));
      const imageUrls = (await Promise.all(uploadPromises)).filter(url => url) as string[];

      const payload = {
        data: {
          ...data,
          year: Number(data.year),
          price: Number(data.price),
          quantity: Number(data.quantity),
          imageUrls,
          inStock: true,
        }
      };

      const res = await createProduct(payload) as TResponse<any>;
      if (res.error) throw res.error;

      toast.success('Product created successfully!', { id: toastId });
      setImageFiles([]);

    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Creation failed', { id: toastId });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Add New Vehicle
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              label="Brand" 
              name="brand" 
              control={control}
              errors={errors}
              rules={{ required: 'Brand is required' }}
            />
            
            <FormInput 
              label="Model" 
              name="model" 
              control={control}
              errors={errors}
              rules={{ required: 'Model is required' }}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Category</label>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.category ? 'border-red-400' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-300 outline-none transition-all`}
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <FormInput 
              label="Year" 
              name="year" 
              type="number"
              control={control}
              errors={errors}
              rules={{ 
                required: 'Year is required',
                min: { value: 1900, message: 'Minimum year is 1900' },
                max: { 
                  value: new Date().getFullYear() + 1,
                  message: `Maximum year is ${new Date().getFullYear() + 1}`
                }
              }}
            />

            <FormInput 
              label="Price (taka)" 
              name="price" 
              type="number"
              control={control}
              errors={errors}
              rules={{ 
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' }
              }}
            />

            <FormInput 
              label="Quantity" 
              name="quantity" 
              type="number"
              control={control}
              errors={errors}
              rules={{ 
                required: 'Quantity is required',
                min: { value: 0, message: 'Quantity cannot be negative' }
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Images</label>
              <div className="flex flex-col gap-4">
                <div className="relative group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files)}
                    className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer 
                    hover:border-blue-400 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md
                    file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  />
                </div>
                
                {imageFiles.length === 0 && (
                  <p className="text-red-500 text-sm">At least one image is required</p>
                )}

                <div className="flex flex-wrap gap-4">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="relative group w-28 h-28">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full 
                        w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Description</label>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.description ? 'border-red-400' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-300 outline-none transition-all`}
                    placeholder="Enter detailed vehicle description..."
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg
              transition-all duration-200 transform hover:scale-105"
            >
              Create Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormInput = ({
  label,
  name,
  control,
  errors,
  type = 'text',
  rules,
}: {
  label: string;
  name: keyof FormValues;
  control: any;
  errors: any;
  type?: string;
  rules?: any;
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <input
          {...field}
          type={type}
          onChange={(e) => {
            const value = type === 'number' 
              ? parseFloat(e.target.value) || 0
              : e.target.value;
            field.onChange(value);
          }}
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors[name] ? 'border-red-400' : 'border-gray-300'
          } focus:ring-2 focus:ring-blue-300 outline-none transition-all`}
          min={type === 'number' ? 0 : undefined}
          step={type === 'number' ? (name === 'price' ? 0.01 : 1) : undefined}
        />
      )}
    />
    {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
  </div>
);

export default CreateProduct;