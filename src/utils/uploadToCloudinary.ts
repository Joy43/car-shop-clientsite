export const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'cars'); 

  try {
    // Replace with your actual cloud name from Cloudinary dashboard
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dluuillmt/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary error details:', errorData);
      throw new Error(`Upload failed: ${errorData.error.message}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Upload Error:', error);
    return null;
  }
};