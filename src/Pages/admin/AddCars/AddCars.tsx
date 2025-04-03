import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAddCarProductMutation } from '../../../redux/features/carProduct/carProduct.api';
import { toast } from 'sonner';
import { useState } from 'react';
import { FiAlertCircle, FiUploadCloud } from 'react-icons/fi';
import ImageUploader from '../../../Components/ImageUpload';
import ImagePreviewer from '../../../Components/ImageUpload/ImagePreview';

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
  const [addCarProduct] = useAddCarProductMutation();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      price: 0,
      quantity: 1,
      inStock: true,
    }
  });

  // Removed unused handleImageUpload function to resolve the error

  const onSubmit = async (data: CarFormValues) => {
    const requestData = {
      ...data,
      year: Number(data.year),
      price: Number(data.price),
      quantity: Number(data.quantity),
      inStock: Boolean(data.inStock),
      imageUrls: imagePreviews, 
    };
  
    try {
      const result = await addCarProduct({
         data: JSON.stringify(requestData)
         }).unwrap(); 
      toast.success(result.message);
      console.log('Created car:', result.data);
      reset();
      setImagePreviews([]);
      setImageFiles([]);
    } catch (error: any) {
      console.error('Full error:', error);
      toast.error(error?.data?.message || 'Car creation failed');
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br
     from-gray-50 to-gray-100 shadow-2xl rounded-2xl p-2 my-4">
      <h1 className="text-4xl font-bold text-gray-900  text-center font-serif">
        Add New Car Listing
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Brand <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register('brand')}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.brand ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Mercedes, BMW, Audi..."
              />
              {errors.brand && (
                <div className="absolute inset-y-0 right-3 flex items-center pr-3 pointer-events-none">
                  <FiAlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.brand && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <FiAlertCircle className="inline" /> {errors.brand.message}
              </p>
            )}
          </div>

          {/* Model Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Model <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register('model')}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.model ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="e.g., Model S, X5, A4..."
              />
              {errors.model && (
                <div className="absolute inset-y-0 right-3 flex items-center pr-3 pointer-events-none">
                  <FiAlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.model && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <FiAlertCircle className="inline" /> {errors.model.message}
              </p>
            )}
          </div>

          {/* Year Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Manufacturing Year <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                {...register('year', { valueAsNumber: true })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.year ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
              {errors.year && (
                <div className="absolute inset-y-0 right-3 flex items-center pr-3 pointer-events-none">
                  <FiAlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.year && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <FiAlertCircle className="inline" /> {errors.year.message}
              </p>
            )}
          </div>

          {/*------------- Price Input ------------------*/}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                {...register('price', { valueAsNumber: true })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
              {errors.price && (
                <div className="absolute inset-y-0 right-3 flex items-center pr-3 pointer-events-none">
                  <FiAlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.price && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <FiAlertCircle className="inline" /> {errors.price.message}
              </p>
            )}
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                {...register('category')}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white`}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="capitalize">
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <div className="absolute inset-y-0 right-3 flex items-center pr-3 pointer-events-none">
                  <FiAlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.category && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <FiAlertCircle className="inline" /> {errors.category.message}
              </p>
            )}
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                {...register('quantity', { valueAsNumber: true })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
              {errors.quantity && (
                <div className="absolute inset-y-0 right-3 flex items-center pr-3 pointer-events-none">
                  <FiAlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.quantity && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <FiAlertCircle className="inline" /> {errors.quantity.message}
              </p>
            )}
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Car Images <span className="text-red-500">*</span>
          </label>
          <div className="space-y-4">
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
        </div>

        {/* Description Textarea */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Description <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              {...register('description')}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Detailed description including features, condition, and special notes..."
            />
            {errors.description && (
              <div className="absolute top-3 right-3">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.description && (
            <p className="text-red-600 text-sm flex items-center gap-1">
              <FiAlertCircle className="inline" /> {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className=" bg-red-500  hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-xl"
        >
          Add Car 
        </button>
      </form>
    </div>
  );
};

export default AddCars;