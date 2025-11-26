import React from 'react';
import { Upload, Share2, Edit3 } from 'lucide-react';
import FileCard from './FileCard';

function HomePage({ files, onFileUpload, onFileSelect }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            FileShare
          </h1>
          <p className="text-xl text-gray-600">
            Upload, Edit, and Share Files Securely
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Share File Card */}
          <div className="group">
            <input
              type="file"
              id="share-upload"
              className="hidden"
              onChange={(e) => onFileUpload(e, false)}
            />
            <label htmlFor="share-upload" className="block cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Share2 className="text-white" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Share File
                </h2>
                <p className="text-gray-600 mb-6">
                  Upload and share files securely with customizable access
                  permissions. Generate instant share links.
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <Upload size={20} />
                  Click to upload file
                </div>
              </div>
            </label>
          </div>

          {/* Edit & Share Card */}
          <div className="group">
            <input
              type="file"
              id="edit-upload"
              className="hidden"
              onChange={(e) => onFileUpload(e, true)}
            />
            <label htmlFor="edit-upload" className="block cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Edit3 className="text-white" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Edit & Share File
                </h2>
                <p className="text-gray-600 mb-6">
                  Upload, edit files right in your browser, and share the edited
                  version with customizable permissions.
                </p>
                <div className="flex items-center gap-2 text-purple-600 font-medium">
                  <Upload size={20} />
                  Click to upload & edit
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Your Files
            </h3>
            <div className="space-y-3">
              {files.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  onSelect={() => onFileSelect(file)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;