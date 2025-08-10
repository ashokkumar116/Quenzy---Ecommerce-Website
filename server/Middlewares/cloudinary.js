const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Profile pictures
const profileStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'quenzy_profiles',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    }
});

// Product images
const productStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'quenzy_products',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    }
});

const uploadProfilePic = multer({ storage: profileStorage });
const uploadProductImage = multer({ storage: productStorage });

module.exports = { uploadProfilePic, uploadProductImage };
