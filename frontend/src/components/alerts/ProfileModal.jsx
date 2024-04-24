import React, { useState } from 'react';


const ProfileModal = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const userId = localStorage.getItem("useri")

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!previewImage) {
      console.log("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append('image', previewImage); // Assuming your server expects 'image' as the field name for the image

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Image uploaded successfully:", response.data);
      // Reset the preview image and input field after successful upload
      setPreviewImage(null);
      document.getElementById('profile').value = null;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null); // Clear the preview image
    document.getElementById('profile').value = null; // Clear the file input value
  };

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg bg-white shadow-xl shadow-gray-300'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='profile' className='cursor-pointer bg-green-500 p-2 rounded'>
          {previewImage ? 'Select Another Image' : 'Select Profile Image'}
        </label>
        <input type="file" name="profile" id="profile" hidden onChange={handleImageChange} />
        {previewImage && (
          <div>
            <img src={previewImage} alt="Preview" className="mt-2 max-w-[50vw] w-40 h-auto" />
            <button type="button" onClick={handleRemoveImage} className='block bg-red-500 rounded-lg mt-2 py-1 px-4 text-white'>Remove Image</button>
          </div>
        )}
        <button type="submit" className='block bg-blue-500 rounded-lg mt-4 py-2 px-6'>Update</button>
      </form>
    </div>
  );
};

export default ProfileModal;
