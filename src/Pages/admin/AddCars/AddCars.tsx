import { useState } from 'react';
import { useAddCarProductMutation } from '../../../redux/features/carProduct/carProduct.api';
import { TProduct } from '../../../types';
import { toast } from 'sonner';

const categories = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'];

const AddCars = () => {
  const [addCarProduct] = useAddCarProductMutation();
  const [carData, setCarData] = useState<Partial<TProduct>>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    category: '',
    imageUrls: [],
    description: '',
    quantity: 1,
    inStock: true,
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setCarData((prev) => ({
      ...prev,
      [name]: name === 'year' || name === 'price' || name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));

      setImagePreviews(previews);
      setImageFiles(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!carData.brand || !carData.model || !carData.year || !carData.price || !carData.category || !carData.description) {
      toast.error('All fields are required.');
      return;
    }

    const formData = new FormData();
    imageFiles.forEach((file) => formData.append('images', file));

    Object.entries(carData).forEach(([key, value]) => {
      if (key !== 'imageUrls') formData.append(key, String(value));
    });

    try {
      const response = await addCarProduct(formData).unwrap();
      console.log('API Response:', response);

      if (response.success) {
        toast.success('Car added successfully!');
        setCarData({
          brand: '',
          model: '',
          year: new Date().getFullYear(),
          price: 0,
          category: '',
          imageUrls: [],
          description: '',
          quantity: 1,
          inStock: true,
        });
        setImagePreviews([]);
        setImageFiles([]);
      } else {
        toast.error(response.message || 'Failed to add car.');
      }
    } catch (error: any) {
      console.error('Error adding car:', error);
      toast.error(error?.data?.message || 'Failed to add car.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded-md" type="text" name="brand" placeholder="Brand" onChange={handleChange} value={carData.brand} required />
        <input className="w-full p-2 border rounded-md" type="text" name="model" placeholder="Model" onChange={handleChange} value={carData.model} required />
        <input className="w-full p-2 border rounded-md" type="number" name="year" placeholder="Year" onChange={handleChange} value={carData.year} required />
        <input className="w-full p-2 border rounded-md" type="number" name="price" placeholder="Price" onChange={handleChange} value={carData.price} required />

        <select className="w-full p-2 border rounded-md" name="category" onChange={handleChange} value={carData.category} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input className="w-full p-2 border rounded-md" type="file" multiple accept="image/*" onChange={handleImageUpload} />
        
        <div className="flex gap-2 mt-2">
          {imagePreviews.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded-md shadow-md" />
          ))}
        </div>

        <textarea className="w-full p-2 border rounded-md" name="description" placeholder="Description" onChange={handleChange} value={carData.description} required></textarea>
        
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">Add Car</button>
      </form>
    </div>
  );
};

export default AddCars;
