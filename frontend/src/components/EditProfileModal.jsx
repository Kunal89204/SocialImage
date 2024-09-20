import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Box,
    Image,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useAuthStore } from '../context/store';

const EditProfileModal = ({ isOpen, onClose, userData }) => {
    const toast = useToast()
    const { user } = useAuthStore();
    const [formData, setFormData] = useState({
        fullName: '',
        bio: '',
        location: '',
        website: '',
        profileImg: null,
        bannerImg: null,
        socialMedia: {
            facebook: '',
            twitter: '',
            linkedIn: '',
            instagram: '',
            github: ''
        }
    });
    const [profileImgPreview, setProfileImgPreview] = useState('');
    const [bannerImgPreview, setBannerImgPreview] = useState('');

    useEffect(() => {
        if (userData) {
            setFormData({
                fullName: userData.fullName || '',
                bio: userData.bio || '',
                location: userData.location || '',
                website: userData.website || '',
                profileImg: userData.profileImg || null,
                bannerImg: userData.bannerImg || null,
                socialMedia: userData.socialMedia || {
                    facebook: '',
                    twitter: '',
                    linkedIn: '',
                    instagram: '',
                    github: ''
                }
            });
            setProfileImgPreview(userData.profileImg || '');
            setBannerImgPreview(userData.bannerImg || '');
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    [name]: file,
                });
                if (name === 'profileImg') {
                    setProfileImgPreview(reader.result);
                } else if (name === 'bannerImg') {
                    setBannerImgPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSocialMediaChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            socialMedia: {
                ...formData.socialMedia,
                [name]: value
            }
        });
    };

    const handleSubmit = () => {
        let updatedFormData = new FormData();
        updatedFormData.append('fullname', formData.fullName);
        updatedFormData.append('bio', formData.bio);
        updatedFormData.append('location', formData.location);
        updatedFormData.append('website', formData.website);
        updatedFormData.append('facebook', formData.socialMedia.facebook);
        updatedFormData.append('twitter', formData.socialMedia.twitter);
        updatedFormData.append('linkedIn', formData.socialMedia.linkedIn);
        updatedFormData.append('instagram', formData.socialMedia.instagram);
        updatedFormData.append('github', formData.socialMedia.github);

        if (formData.profileImg) {
            updatedFormData.append('file1', formData.profileImg);
        }
        if (formData.bannerImg) {
            updatedFormData.append('file2', formData.bannerImg);
        }

        const promise = axios.put(`${import.meta.env.VITE_BACKEND_URL}/editProfile/${user.user._id}`, updatedFormData)

        toast.promise(promise, {
            loading: { title: 'Updating', description: 'Please wait while the profile is updating' },
            success: { title: 'Profile Updated', description: 'Profile has been updated successfully.' },
            error: { title: 'Error', description: 'There was an error updating the profile' },
        })

        promise
            .then((response) => {
                console.log(response.data);
                onClose();
            })
            .catch((err) => {
                console.log(err)
            })
    };

    const modalBg = useColorModeValue('blackAlpha.800', 'blackAlpha.900');
    const inputBg = useColorModeValue('gray.800', 'gray.900');
    const inputColor = useColorModeValue('white', 'gray.100');

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bg={modalBg} color={inputColor} borderRadius="md">
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            bg={inputBg}
                            color={inputColor}
                            borderColor="gray.600"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Bio</FormLabel>
                        <Textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            bg={inputBg}
                            color={inputColor}
                            borderColor="gray.600"
                            resize="vertical"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Location</FormLabel>
                        <Input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            bg={inputBg}
                            color={inputColor}
                            borderColor="gray.600"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Website</FormLabel>
                        <Input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            bg={inputBg}
                            color={inputColor}
                            borderColor="gray.600"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Profile Image</FormLabel>
                        <Input
                            type="file"
                            name="profileImg"
                            accept="image/*"
                            onChange={handleFileChange}
                            bg={inputBg}
                            color={inputColor}
                            borderColor="gray.600"
                        />
                        {profileImgPreview && (
                            <Box mt={2} borderRadius="md" overflow="hidden">
                                <Image
                                    src={profileImgPreview}
                                    alt="Profile Preview"
                                    boxSize="100px"
                                    objectFit="cover"
                                    borderRadius="md"
                                />
                            </Box>
                        )}
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Banner Image</FormLabel>
                        <Input
                            type="file"
                            name="bannerImg"
                            accept="image/*"
                            onChange={handleFileChange}
                            bg={inputBg}
                            color={inputColor}
                            borderColor="gray.600"
                        />
                        {bannerImgPreview && (
                            <Box mt={2} borderRadius="md" overflow="hidden">
                                <Image
                                    src={bannerImgPreview}
                                    alt="Banner Preview"
                                    boxSize="200px"
                                    objectFit="cover"
                                    borderRadius="md"
                                />
                            </Box>
                        )}
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Social Media Links</FormLabel>
                        <Input
                            type="text"
                            name="facebook"
                            placeholder="Facebook URL"
                            value={formData.socialMedia.facebook}
                            onChange={handleSocialMediaChange}
                            bg={inputBg}
                            color={inputColor}
                            borderColor="gray.600"
                            mb={2}
                        />
                        <Input
                            type="text"
                            name="twitter"
                            placeholder="Twitter URL"
                            value={formData.socialMedia.twitter}
                            onChange={handleSocialMediaChange}
                            bg={inputBg}
                            color={inputColor}
                            borderColor="gray.600"
                            mb={2}
                        />
                        <Input
                            type="text"
                            name="linkedIn"
                            placeholder="LinkedIn URL"
                            value={formData.socialMedia.linkedIn}
                            onChange={handleSocialMediaChange}
                            bg={inputBg}
                            color={inputColor}
                            borderColor="gray.600"
                            mb={2}
                        />
                        <Input
                            type="text"
                            name="instagram"
                            placeholder="Instagram URL"
                            value={formData.socialMedia.instagram}
                            onChange={handleSocialMediaChange}
                            bg={inputBg}
                            color={inputColor}
                            borderColor="gray.600"
                            mb={2}
                        />
                        <Input
                            type="text"
                            name="github"
                            placeholder="GitHub URL"
                            value={formData.socialMedia.github}
                            onChange={handleSocialMediaChange}
                            bg={inputBg}
                            color={inputColor}
                            borderColor="gray.600"
                            mb={2}
                        />
                    </FormControl>
                    <Button
                        colorScheme="teal"
                        onClick={handleSubmit}
                        mt={4}
                        w="full"
                        bg="teal.500"
                        _hover={{ bg: 'teal.600' }}
                    >
                        Save Changes
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditProfileModal;
