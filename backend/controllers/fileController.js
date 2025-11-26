const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filesPath = path.join(__dirname, '../storage/files.json');

// Helper function to read files
const readFiles = () => {
  try {
    const data = fs.readFileSync(filesPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { files: [] };
  }
};

// Helper function to write files
const writeFiles = (data) => {
  fs.writeFileSync(filesPath, JSON.stringify(data, null, 2));
};

// Get all files (limit to 10)
exports.getAllFiles = (req, res) => {
  try {
    const data = readFiles();
    // Return only last 10 files
    const recentFiles = data.files.slice(-10);
    res.json({ success: true, files: recentFiles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching files' });
  }
};

// Get file by ID
exports.getFileById = (req, res) => {
  try {
    const { id } = req.params;
    const data = readFiles();
    const file = data.files.find(f => f.id === id);
    
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    
    res.json({ success: true, file });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching file' });
  }
};

// Get file by share token
exports.getFileByToken = (req, res) => {
  try {
    const { token } = req.params;
    const data = readFiles();
    const file = data.files.find(f => f.shareToken === token);
    
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    
    res.json({ success: true, file });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching file' });
  }
};

// Create new file
exports.createFile = (req, res) => {
  try {
    const data = readFiles();
    
    // Limit to 10 files
    if (data.files.length >= 10) {
      // Remove oldest file
      data.files.shift();
    }
    
    const newFile = {
      id: uuidv4(),
      shareToken: uuidv4(),
      name: req.body.name,
      type: req.body.type,
      size: req.body.size,
      content: req.body.content,
      permission: req.body.permission || 'view',
      uploadDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    data.files.push(newFile);
    writeFiles(data);
    
    res.status(201).json({ success: true, file: newFile });
  } catch (error) {
    console.error('Error creating file:', error);
    res.status(500).json({ success: false, message: 'Error creating file' });
  }
};

// Update file
exports.updateFile = (req, res) => {
  try {
    const { id } = req.params;
    const data = readFiles();
    const fileIndex = data.files.findIndex(f => f.id === id);
    
    if (fileIndex === -1) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    
    // Update file
    data.files[fileIndex] = {
      ...data.files[fileIndex],
      ...req.body,
      lastModified: new Date().toISOString()
    };
    
    writeFiles(data);
    
    res.json({ success: true, file: data.files[fileIndex] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating file' });
  }
};

// Delete file
exports.deleteFile = (req, res) => {
  try {
    const { id } = req.params;
    const data = readFiles();
    const fileIndex = data.files.findIndex(f => f.id === id);
    
    if (fileIndex === -1) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    
    data.files.splice(fileIndex, 1);
    writeFiles(data);
    
    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting file' });
  }
};