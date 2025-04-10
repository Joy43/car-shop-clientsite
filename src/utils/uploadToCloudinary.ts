export const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'upload_car'); 
  data.append('cloud_name', 'dluuillmt'); 


  try {
    // Replace with your actual cloud name from Cloudinary dashboard
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dluuillmt/image/upload',
      {
        method: 'POST',
        body:data,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary error details:', errorData);
      throw new Error(`Upload failed: ${errorData.error.message}`);
    }

    const responseData = await response.json();
    return responseData.secure_url;
  } catch (error) {
    console.error('Upload Error:', error);
    return null;
  }
};