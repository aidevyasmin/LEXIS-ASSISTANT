const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../../uploads/payments');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where files will be stored
    cb(null, uploadDir);
  },
  filefullName: (req, file, cb) => {
    // Generate a unique filename using UUID and preserve the original extension
    const uniqueSuffix = uuidv4();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to allow only images (for payment proofs)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed for payment proofs!'), false);
  }
};

// Initialize multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit as per spec (T009)
  },
});

module.exports = upload;
