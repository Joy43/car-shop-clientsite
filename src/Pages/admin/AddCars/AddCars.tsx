import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { toast } from 'sonner';
import { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import ImageUploader from '../../../Components/ImageUpload';
import ImagePreviewer from '../../../Components/ImageUpload/ImagePreview';
import { useAddCarProductMutation } from '../../../redux/features/carProduct/carProduct.api';

const categories = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'];

const carSchema = z.object({
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900, 'Invalid year').max(new Date().getFullYear() + 1),
  price: z.number().min(0, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  quantity: z.number().min(1, 'Minimum quantity is 1'),
  inStock: z.boolean().default(true),
});

type CarFormValues = z.infer<typeof carSchema>;

const AddCars = () => {
  const [createProduct] = useAddCarProductMutation(); // 👈 Using your mutation
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      price: 0,
      quantity: 1,
      inStock: true,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const productData = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      year: Number(data.year),
      inStock: Boolean(data.inStock),
      imageUrls: imagePreviews,
    };

    try {
      await createProduct({ data: JSON.stringify(productData) }).unwrap();
      toast.success("Car added successfully", { id: toastId });
      reset();
      setImagePreviews([]);
      setImageFiles([]);
    } catch (error: any) {
      toast.error(error?.data?.message || "Car creation failed", { id: toastId });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl rounded-sm p-4 my-4">
      <h1 className="text-4xl font-bold text-gray-900 text-center font-serif">
        Add New Car Listing
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <InputField
            label="Brand"
            name="brand"
            register={register}
            error={errors.brand?.message}
            placeholder="Mercedes, BMW, Audi..."
          />
          {/* Model */}
          <InputField
            label="Model"
            name="model"
            register={register}
            error={errors.model?.message}
            placeholder="e.g., Model S, X5, A4..."
          />
          {/* Year */}
          <InputField
            label="Manufacturing Year"
            name="year"
            register={register}
            error={errors.year?.message}
            type="number"
          />
          {/* Price */}
          <InputField
            label="Price ($)"
            name="price"
            register={register}
            error={errors.price?.message}
            type="number"
          />
          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register('category')}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 transition-all`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <FiAlertCircle className="inline" /> {errors.category.message}
              </p>
            )}
          </div>
          {/* Quantity */}
          <InputField
            label="Stock Quantity"
            name="quantity"
            register={register}
            error={errors.quantity?.message}
            type="number"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Car Images <span className="text-red-500">*</span>
          </label>
          <ImageUploader
            setImageFiles={setImageFiles}
            setImagePreview={setImagePreviews}
            label="Click to Upload Images"
            className="w-full"
          />
          <ImagePreviewer
            setImageFiles={setImageFiles}
            imagePreview={imagePreviews}
            setImagePreview={setImagePreviews}
            className="w-full"
          />
        </div>

        {/* Description */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 transition-all`}
            placeholder="Detailed description including features, condition, and special notes..."
          />
          {errors.description && (
            <p className="text-red-600 text-sm flex items-center gap-1">
              <FiAlertCircle className="inline" /> {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-xl"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

// ✅ Reusable InputField Component (for cleanliness)
const InputField = ({
  label,
  name,
  register,
  error,
  placeholder = '',
  type = 'text',
}: {
  label: string;
  name: keyof CarFormValues;
  register: any;
  error?: string;
  placeholder?: string;
  type?: string;
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <input
        type={type}
        {...register(name)}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:ring-2 focus:ring-blue-500 transition-all`}
        placeholder={placeholder}
      />
      {error && (
        <div className="absolute inset-y-0 right-3 flex items-center pr-3 pointer-events-none">
          <FiAlertCircle className="h-5 w-5 text-red-500" />
        </div>
      )}
    </div>
    {error && (
      <p className="text-red-600 text-sm flex items-center gap-1">
        <FiAlertCircle className="inline" /> {error}
      </p>
    )}
  </div>
);

export default AddCars;
