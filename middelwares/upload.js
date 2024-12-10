const express = require('express');
const router = express.Router();
const multer = require('multer');
const { register } = require('../controllers/authController');
const fs = require('fs');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Apply middleware to route
router.post('/register', upload.fields([
  { name: 'medical_diploma', maxCount: 1 },
  { name: 'proof_of_practice', maxCount: 1 },
]), register);

const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

module.exports = router;
