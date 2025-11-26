import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import EditView from './components/EditView';
import ShareView from './components/ShareView';
import { api } from './utils/api';
import { convertFileToBase64 } from './utils/fileHelpers';

function App() {
  const [view, setView] = useState('home');
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [permission, setPermission] = useState('view');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllFiles();
    checkForSharedFile();
  }, []);

  const checkForSharedFile = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      try {
        const result = await api.getFileByToken(token);
        if (result.success) {
          setCurrentFile(result.file);
          setShareLink(window.location.href);
          setPermission(result.file.permission);
          setView('share');
        }
      } catch (error) {
        console.error('Error loading shared file:', error);
      }
    }
  };

  const loadAllFiles = async () => {
    try {
      setLoading(true);
      const result = await api.getAllFiles();
      if (result.success) {
        setFiles(result.files);
      }
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e, shouldEdit = false) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const base64Content = await convertFileToBase64(file);
      
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        content: base64Content,
        permission: 'view'
      };

      const result = await api.createFile(fileData);
      
      if (result.success) {
        if (shouldEdit) {
          setCurrentFile(result.file);
          if (file.type.startsWith('text/') || file.type === 'application/json') {
            const textContent = atob(base64Content.split(',')[1]);
            setEditContent(textContent);
          } else {
            setEditContent('Binary file - preview not available for editing');
          }
          setView('edit');
        } else {
          setCurrentFile(result.file);
          const link = generateShareLink(result.file);
          setShareLink(link);
          setPermission(result.file.permission);
          setView('share');
        }
        
        await loadAllFiles();
      } else {
        alert('Error uploading file. Server may have reached the 10 file limit.');
      }
    } catch (error) {
      alert('Error uploading file. Make sure the backend server is running!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateShareLink = (file) => {
    return `${window.location.origin}?token=${file.shareToken}`;
  };

  const handleSaveEdit = async () => {
    if (!currentFile) return;

    try {
      setLoading(true);
      const base64Content = btoa(editContent);
      const updatedData = {
        content: `data:text/plain;base64,${base64Content}`
      };

      const result = await api.updateFile(currentFile.id, updatedData);
      
      if (result.success) {
        setCurrentFile(result.file);
        const link = generateShareLink(result.file);
        setShareLink(link);
        setView('share');
        await loadAllFiles();
      } else {
        alert('Error saving edited file');
      }
    } catch (error) {
      alert('Error saving file');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = async (perm) => {
    setPermission(perm);
    if (currentFile) {
      try {
        const result = await api.updateFile(currentFile.id, { permission: perm });
        if (result.success) {
          setCurrentFile(result.file);
          const link = generateShareLink(result.file);
          setShareLink(link);
          await loadAllFiles();
        }
      } catch (error) {
        console.error('Error updating permission:', error);
      }
    }
  };

  const handleFileSelect = (file) => {
    setCurrentFile(file);
    const link = generateShareLink(file);
    setShareLink(link);
    setPermission(file.permission);
    setView('share');
  };

  const handleBackToHome = () => {
    // Clear URL parameters
    window.history.pushState({}, '', window.location.pathname);
    setView('home');
    setCurrentFile(null);
    setEditContent('');
    setShareLink('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (view === 'edit') {
    return (
      <EditView
        currentFile={currentFile}
        editContent={editContent}
        setEditContent={setEditContent}
        onSave={handleSaveEdit}
        onBack={handleBackToHome}
      />
    );
  }

  if (view === 'share') {
    return (
      <ShareView
        currentFile={currentFile}
        shareLink={shareLink}
        permission={permission}
        onPermissionChange={handlePermissionChange}
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <HomePage
      files={files}
      onFileUpload={handleFileUpload}
      onFileSelect={handleFileSelect}
    />
  );
}

export default App;