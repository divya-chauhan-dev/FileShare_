const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// Get all files
router.get('/', fileController.getAllFiles);

// Get single file by ID
router.get('/:id', fileController.getFileById);

// Upload/Create new file
router.post('/', fileController.createFile);

// Update file (for editing)
router.put('/:id', fileController.updateFile);

// Delete file
router.delete('/:id', fileController.deleteFile);

// Get file by share token
router.get('/share/:token', fileController.getFileByToken);

module.exports = router;