import  { useState } from 'react';
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
  price: number;
  description: string;
  quantity: number;
  images: FileList;
};

const CreateProduct = () => {
  const [createProduct] = useAddCarProductMutation();
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

  // Local image preview state
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setImageFiles(prev => [...prev, ...fileArray]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading('Creating...');
    try {
      const imageUrls: string[] = [];
  
      if (imageFiles.length === 0) {
        toast.error('Please select at least one image.', { id: toastId });
        return;
      }
  
      // Upload images to Cloudinary
      for (const file of imageFiles) {
        const url = await uploadToCloudinary(file);
        if (url) imageUrls.push(url);
      }
  
      // Wrap in data key
      const payload = {
        data: {
          brand: data.brand,
          model: data.model,
          category: data.category,
          price: data.price,
          quantity: data.quantity,
          description: data.description,
          inStock: true,
          imageUrls: imageUrls,  // Match backend's expected field name
        }
      };
  
      // Send the wrapped payload
      const res = (await createProduct(payload)) as TResponse<any>;
  console.log(res)
 
    } catch (error) {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Car Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormInput label="Brand" name="brand" control={control} errors={errors} rules={{ required: 'Brand is required' }} />
            <FormInput label="Model" name="model" control={control} errors={errors} rules={{ required: 'Model is required' }} />

            {/* Category Dropdown */}
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
                    }`}
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
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            {/* Image Upload */}
            <div className="space-y-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {imageFiles.length === 0 && <p className="text-red-500 text-sm">At least one image is required</p>}
              <div className="flex flex-wrap gap-4 mt-2">
                {imageFiles.map((file, index) => (
                  <div key={index} className="relative group w-24 h-24">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1 hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <FormInput label="Price" name="price" type="number" control={control} errors={errors} rules={{ required: true, min: 0 }} />

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
                    }`}
                  />
                )}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <FormInput label="Quantity" name="quantity" type="number" control={control} errors={errors} rules={{ required: true, min: 0 }} />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
            >
              Submit
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
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <input
          {...field}
          type={type}
          min={type === 'number' ? 0 : undefined}
          className={`w-full px-3 py-2 border rounded-md ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      )}
    />
    {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
  </div>
);

export default CreateProduct;
