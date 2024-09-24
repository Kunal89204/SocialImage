import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useToast } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const CreatePost2 = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [previews, setPreviews] = useState([]);
    const [files, setFiles] = useState([]); // Store files separately for submission
    const toast = useToast(); // Initialize Chakra toast

    const userId = '660feef259605af7231143c9'; // Hardcoded user ID

    const handleFileChange = (e) => {
        const filesArray = Array.from(e.target.files);
        const validFileTypes = ['image', 'video']; // Only allow images and videos

        let currentImages = previews.filter(file => file.type === 'image').length;
        let currentVideos = previews.filter(file => file.type === 'video').length;

        const newPreviews = [...previews];
        const newFiles = [...files];

        filesArray.forEach(file => {
            const fileType = file.type.split('/')[0]; // Get the file type (image or video)
            const fileSizeMB = file.size / (1024 * 1024); // File size in MB

            // Check file type validation
            if (!validFileTypes.includes(fileType)) {
                toast({
                    title: 'Invalid file type',
                    description: `${file.name} is not an image or video.`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return; // Skip invalid files
            }

            // Check for max image count
            if (fileType === 'image' && currentImages >= 10) {
                toast({
                    title: 'Too many images',
                    description: 'You can only upload up to 10 images.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            // Check for max video count
            if (fileType === 'video' && currentVideos >= 5) {
                toast({
                    title: 'Too many videos',
                    description: 'You can only upload up to 5 videos.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            // Check file size validation
            if (fileType === 'image' && fileSizeMB > 5) {
                toast({
                    title: 'File too large',
                    description: `${file.name} exceeds the 5MB limit for images.`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            if (fileType === 'video' && fileSizeMB > 50) {
                toast({
                    title: 'File too large',
                    description: `${file.name} exceeds the 50MB limit for videos.`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            // Add file to file array for later submission
            newFiles.push(file);

            // Read file to create preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
                newPreviews.push({
                    url: event.target.result,
                    type: fileType,
                    name: file.name
                });
                setPreviews([...newPreviews]);
            };

            reader.readAsDataURL(file); // Read file to get its URL as a Data URL

            // Update counts
            if (fileType === 'image') currentImages++;
            if (fileType === 'video') currentVideos++;
        });

        setFiles(newFiles); // Update the files state
    };

    const handleRemovePreview = (index) => {
        const updatedPreviews = previews.filter((_, i) => i !== index);
        const updatedFiles = files.filter((_, i) => i !== index); // Also remove from files array
        setPreviews(updatedPreviews);
        setFiles(updatedFiles);
    };

    const handlePost = async () => {
        if (!title || !description) {
            toast({
                title: 'Title or Description missing',
                description: 'Both title and description are required.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Create FormData to send files and form inputs
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('userId', userId);
        formData.append('isPublic', isPublic);

        files.forEach(file => {
            const fileType = file.type.split('/')[0];
            formData.append(fileType === 'image' ? 'post' : 'video', file);
        });

        try {
            const response = await axios.post('http://localhost:8000/api/v1/newpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast({
                    title: 'Post created',
                    description: 'Your post has been successfully uploaded.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                // Clear form after successful submission
                setTitle('');
                setDescription('');
                setPreviews([]);
                setFiles([]);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast({
                title: 'Upload failed',
                description: error.message || 'An error occurred while uploading your post.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <div>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <label htmlFor="files">Click to upload files</label>
            <input 
                type="file" 
                multiple 
                accept="image/*,video/*" 
                onChange={handleFileChange} 
                id="files"
                hidden={true}
            />

            <div className="preview-container">
                {previews.map((file, index) => (
                    <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                        {file.type === 'image' ? (
                            <img src={file.url} alt={`preview ${index}`} width="150px" />
                        ) : (
                            <video src={file.url} controls width="350px" />
                        )}
                        <IconButton
                            size="sm"
                            icon={<CloseIcon />}
                            position="absolute"
                            top="0"
                            right="0"
                            onClick={() => handleRemovePreview(index)}
                            aria-label="Remove media"
                        />
                    </div>
                ))}
            </div>

            <button onClick={handlePost}>Upload</button>
        </div>
    );
};

export default CreatePost2;
