

type TImagePreviewer = {
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreview: string[];
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
};

const ImagePreviewer: React.FC<TImagePreviewer> = ({
  setImageFiles,
  imagePreview,
  setImagePreview,
  className,
}) => {
  // ------- Remove IMAGE -----------
  const handleRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
    setImagePreview((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {imagePreview.map((preview, index) => (
        <div
          key={index}
          className="relative w-36 h-36 rounded-md overflow-hidden border border-dashed border-gray-300"
        >
          <img
            src={preview}
            alt={`Preview ${index + 1}`}
            className="object-cover w-full h-full"
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="bg-red-300 hover:bg-red-400 absolute top-1 right-1 w-6 h-6 p-0 rounded-full flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewer;
