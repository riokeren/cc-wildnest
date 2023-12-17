const express = require('express');
const multer = require('multer');
const imgUploadController = require('./imgUpload');

const router = express.Router();

const multerStorage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});

router.post('/upload', multerStorage.single('image'), imgUploadController.uploadImage);

module.exports = router;