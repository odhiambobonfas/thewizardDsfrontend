const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'thewizards-portfolio',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 1200, height: 800, crop: 'limit', quality: 'auto' },
      { format: 'auto' }
    ]
  }
});

// Create multer upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload single image (supports both file path and buffer)
const uploadImage = async (file, folder = 'thewizards-portfolio') => {
  try {
    let uploadOptions = {
      folder: folder,
      transformation: [
        { width: 1200, height: 800, crop: 'limit', quality: 'auto' },
        { format: 'auto' }
      ]
    };

    let result;
    
    // Handle buffer upload (from multer memory storage)
    if (Buffer.isBuffer(file)) {
      result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(file);
      });
    }
    // Handle file path upload
    else if (file.path) {
      result = await cloudinary.uploader.upload(file.path, uploadOptions);
    }
    // Handle buffer in file object
    else if (file.buffer) {
      result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      });
    }
    else {
      throw new Error('Invalid file format. Expected buffer or file path.');
    }

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

// Upload multiple images
const uploadMultipleImages = async (files) => {
  try {
    const uploadPromises = files.map(file => uploadImage(file));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    throw new Error(`Multiple image upload failed: ${error.message}`);
  }
};

// Delete image from Cloudinary
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      return { success: true, message: 'Image deleted successfully' };
    } else {
      throw new Error('Failed to delete image');
    }
  } catch (error) {
    throw new Error(`Image deletion failed: ${error.message}`);
  }
};

// Delete multiple images
const deleteMultipleImages = async (publicIds) => {
  try {
    const deletePromises = publicIds.map(publicId => deleteImage(publicId));
    const results = await Promise.all(deletePromises);
    return results;
  } catch (error) {
    throw new Error(`Multiple image deletion failed: ${error.message}`);
  }
};

// Get image details
const getImageDetails = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      createdAt: result.created_at
    };
  } catch (error) {
    throw new Error(`Failed to get image details: ${error.message}`);
  }
};

// Generate optimized image URL with transformations
const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 800,
    height = 600,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality,
    format,
    secure: true
  });
};

// Generate thumbnail URL
const getThumbnailUrl = (publicId, size = 300) => {
  return cloudinary.url(publicId, {
    width: size,
    height: size,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
    secure: true
  });
};

// Upload image from URL
const uploadFromUrl = async (imageUrl, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'thewizards-portfolio',
      transformation: [
        { width: 1200, height: 800, crop: 'limit', quality: 'auto' },
        { format: 'auto' }
      ],
      ...options
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    throw new Error(`URL upload failed: ${error.message}`);
  }
};

// Get folder contents
const getFolderContents = async (folderPath = 'thewizards-portfolio') => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: 100
    });

    return result.resources.map(resource => ({
      url: resource.secure_url,
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      bytes: resource.bytes,
      createdAt: resource.created_at
    }));
  } catch (error) {
    throw new Error(`Failed to get folder contents: ${error.message}`);
  }
};

module.exports = {
  upload,
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  deleteMultipleImages,
  getImageDetails,
  getOptimizedImageUrl,
  getThumbnailUrl,
  uploadFromUrl,
  getFolderContents,
  cloudinary
};
