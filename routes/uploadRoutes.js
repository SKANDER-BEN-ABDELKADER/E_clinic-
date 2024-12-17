const express = require('express');
const router = express.Router();
const upload = require('../middelwares/upload');
const { uploadFile } = require('../controllers/uplaodController');

// Route to handle file upload
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
