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
    Flex,
    HStack,
    Icon,
    useColorModeValue,
    useToast,
    VStack,
    Divider,
    Tooltip
} from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaCamera } from 'react-icons/fa';
import axios from 'axios';
import { useAuthStore } from '../context/store';

const socialIcons = {
    facebook: FaFacebook,
    twitter: FaTwitter,
    linkedIn: FaLinkedin,
    instagram: FaInstagram,
    github: FaGithub,
};

const socialPlaceholders = {
    facebook: "Facebook URL",
    twitter: "Twitter URL",
    linkedIn: "LinkedIn URL",
    instagram: "Instagram URL",
    github: "GitHub URL",
};

const EditProfileModal = ({ isOpen, onClose, userData }) => {
    const toast = useToast();
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
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);
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

        const promise = axios.put(`${import.meta.env.VITE_BACKEND_URL}/editProfile/${user.user._id}`, updatedFormData);

        toast.promise(promise, {
            loading: { title: 'Updating', description: 'Please wait while your profile is being updated...' },
            success: { title: 'Profile Updated', description: 'Your profile has been updated successfully.' },
            error: { title: 'Error', description: 'There was an error updating your profile.' },
        });

        promise
            .then((response) => {
                setIsSubmitting(false);
                onClose();
            })
            .catch((err) => {
                setIsSubmitting(false);
            });
    };

    // Sleek, modern modal colors
    const modalBg = useColorModeValue('rgba(24, 24, 32, 0.98)', 'rgba(24, 24, 32, 0.98)');
    const inputBg = useColorModeValue('rgba(36, 36, 48, 0.95)', 'rgba(36, 36, 48, 0.95)');
    const inputColor = useColorModeValue('white', 'gray.100');
    const borderColor = useColorModeValue('teal.600', 'teal.400');
    const labelColor = useColorModeValue('teal.300', 'teal.200');

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg" motionPreset="slideInBottom">
            <ModalOverlay bg="blackAlpha.700" />
            <ModalContent
                bg={modalBg}
                color={inputColor}
                borderRadius="2xl"
                boxShadow="2xl"
                px={{ base: 2, md: 8 }}
                py={2}
                maxW="480px"
            >
                <ModalHeader
                    fontWeight="extrabold"
                    fontSize="2xl"
                    textAlign="center"
                    letterSpacing="wide"
                    color={labelColor}
                    pb={0}
                >
                    Edit Profile
                </ModalHeader>
                <ModalCloseButton
                    color={labelColor}
                    _hover={{ bg: 'teal.700', color: 'white' }}
                    top={3}
                    right={3}
                />
                <ModalBody pt={2} pb={6}>
                    {/* Banner and Profile Image */}
                    <Box position="relative" mb={8}>
                        <Box
                            w="full"
                            h="120px"
                            bg="gray.800"
                            borderRadius="xl"
                            overflow="hidden"
                            position="relative"
                            boxShadow="md"
                        >
                            <Image
                                src={bannerImgPreview || ''}
                                alt="Banner"
                                w="full"
                                h="120px"
                                objectFit="cover"
                                fallbackSrc="https://via.placeholder.com/600x120?text=Banner"
                                opacity={bannerImgPreview ? 1 : 0.5}
                                transition="opacity 0.2s"
                            />
                            <Tooltip label="Change banner" hasArrow>
                                <Button
                                    leftIcon={<FaCamera />}
                                    size="xs"
                                    position="absolute"
                                    bottom={2}
                                    right={2}
                                    zIndex={2}
                                    colorScheme="teal"
                                    variant="solid"
                                    px={2}
                                    py={1}
                                    borderRadius="full"
                                    as="label"
                                    htmlFor="bannerImg"
                                    cursor="pointer"
                                >
                                    <Input
                                        id="bannerImg"
                                        type="file"
                                        name="bannerImg"
                                        accept="image/*"
                                        display="none"
                                        onChange={handleFileChange}
                                    />
                                    Banner
                                </Button>
                            </Tooltip>
                        </Box>
                        <Box
                            position="absolute"
                            left="50%"
                            bottom={-10}
                            transform="translateX(-50%)"
                            zIndex={3}
                        >
                            <Box
                                border="4px solid"
                                borderColor={borderColor}
                                borderRadius="full"
                                boxShadow="lg"
                                bg="gray.900"
                                p={1}
                                position="relative"
                                w="90px"
                                h="90px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Image
                                    src={profileImgPreview || ''}
                                    alt="Profile"
                                    boxSize="80px"
                                    objectFit="cover"
                                    borderRadius="full"
                                    fallbackSrc="https://ui-avatars.com/api/?name=User"
                                    opacity={profileImgPreview ? 1 : 0.5}
                                    transition="opacity 0.2s"
                                />
                                <Tooltip label="Change profile picture" hasArrow>
                                    <Button
                                        leftIcon={<FaCamera />}
                                        size="xs"
                                        position="absolute"
                                        bottom={-2}
                                        right={-2}
                                        zIndex={2}
                                        colorScheme="teal"
                                        variant="solid"
                                        px={2}
                                        py={1}
                                        borderRadius="full"
                                        as="label"
                                        htmlFor="profileImg"
                                        cursor="pointer"
                                    >
                                        <Input
                                            id="profileImg"
                                            type="file"
                                            name="profileImg"
                                            accept="image/*"
                                            display="none"
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                    <VStack spacing={4} align="stretch" mt={10}>
                        <FormControl>
                            <FormLabel color={labelColor} fontWeight="bold" fontSize="sm" letterSpacing="wide">
                                Full Name
                            </FormLabel>
                            <Input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                bg={inputBg}
                                color={inputColor}
                                borderColor={borderColor}
                                borderRadius="lg"
                                fontWeight="semibold"
                                _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1.5px #38b2ac' }}
                                placeholder="Your full name"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel color={labelColor} fontWeight="bold" fontSize="sm" letterSpacing="wide">
                                Bio
                            </FormLabel>
                            <Textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                bg={inputBg}
                                color={inputColor}
                                borderColor={borderColor}
                                borderRadius="lg"
                                fontWeight="semibold"
                                resize="vertical"
                                minH="60px"
                                maxH="120px"
                                _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1.5px #38b2ac' }}
                                placeholder="Tell us about yourself"
                            />
                        </FormControl>
                        <HStack spacing={4}>
                            <FormControl>
                                <FormLabel color={labelColor} fontWeight="bold" fontSize="sm" letterSpacing="wide">
                                    Location
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    bg={inputBg}
                                    color={inputColor}
                                    borderColor={borderColor}
                                    borderRadius="lg"
                                    fontWeight="semibold"
                                    _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1.5px #38b2ac' }}
                                    placeholder="City, Country"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color={labelColor} fontWeight="bold" fontSize="sm" letterSpacing="wide">
                                    Website
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    bg={inputBg}
                                    color={inputColor}
                                    borderColor={borderColor}
                                    borderRadius="lg"
                                    fontWeight="semibold"
                                    _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1.5px #38b2ac' }}
                                    placeholder="https://yourwebsite.com"
                                />
                            </FormControl>
                        </HStack>
                        <Divider borderColor="gray.700" my={2} />
                        <FormControl>
                            <FormLabel color={labelColor} fontWeight="bold" fontSize="sm" letterSpacing="wide" mb={1}>
                                Social Media
                            </FormLabel>
                            <VStack spacing={2} align="stretch">
                                {Object.entries(socialIcons).map(([key, IconComp]) => (
                                    <HStack key={key} spacing={3}>
                                        <Box minW="32px" textAlign="center">
                                            <Icon as={IconComp} color="teal.300" boxSize={5} />
                                        </Box>
                                        <Input
                                            type="text"
                                            name={key}
                                            placeholder={socialPlaceholders[key]}
                                            value={formData.socialMedia[key]}
                                            onChange={handleSocialMediaChange}
                                            bg={inputBg}
                                            color={inputColor}
                                            borderColor={borderColor}
                                            borderRadius="lg"
                                            fontWeight="semibold"
                                            _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1.5px #38b2ac' }}
                                        />
                                    </HStack>
                                ))}
                            </VStack>
                        </FormControl>
                    </VStack>
                    <Button
                        colorScheme="teal"
                        onClick={handleSubmit}
                        mt={8}
                        w="full"
                        bgGradient="linear(to-r, teal.400, teal.600)"
                        _hover={{ bgGradient: 'linear(to-r, teal.500, teal.700)', transform: 'scale(1.03)' }}
                        fontWeight="bold"
                        fontSize="lg"
                        borderRadius="xl"
                        boxShadow="md"
                        isLoading={isSubmitting}
                        loadingText="Saving"
                        transition="all 0.2s"
                    >
                        Save Changes
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditProfileModal;
