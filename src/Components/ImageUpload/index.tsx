

type TImageUploader = {
    label?: string;
    className?: string;
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
    setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  };
  
  const ImageUploader: React.FC<TImageUploader> = ({
    label="Upload Images",
    className,
    setImageFiles,
    setImagePreview,
  }) => {
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;
  
      const newFile = files[0];
      setImageFiles((prev) => [...prev, newFile]);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(newFile);
  
      event.target.value = "";
    };
  
    return (
      <div className={`flex flex-col items-center w-full gap-4 ${className}`}>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <label
          htmlFor="image-upload"
          className="w-full h-36 md:h-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
        >
          {label}
        </label>
      </div>
    );
  };
  
  export default ImageUploader;
  