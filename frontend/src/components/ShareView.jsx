import React, { useState } from 'react';
import { ArrowLeft, Share2, Download, Eye, Edit3, Copy, Check, FileText } from 'lucide-react';
import { formatFileSize, downloadFile } from '../utils/fileHelpers';

function ShareView({ currentFile, shareLink, permission, onPermissionChange, onBack }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (currentFile) {
      downloadFile(currentFile.content, currentFile.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        {/* Share Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Share2 className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                File Ready to Share
              </h2>
              <p className="text-sm text-gray-500">
                Configure permissions and share your file
              </p>
            </div>
          </div>

          {/* File Info */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <FileText className="text-blue-600" size={40} />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {currentFile?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatFileSize(currentFile?.size || 0)}
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-white rounded-lg transition-colors"
                title="Download file"
              >
                <Download className="text-gray-600" size={20} />
              </button>
            </div>
          </div>

          {/* Permissions */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Access Permissions
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => onPermissionChange('view')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  permission === 'view'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Eye size={18} />
                <span className="font-medium">View</span>
              </button>
              <button
                onClick={() => onPermissionChange('edit')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  permission === 'edit'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Edit3 size={18} />
                <span className="font-medium">Edit</span>
              </button>
              <button
                onClick={() => onPermissionChange('download')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  permission === 'download'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Download size={18} />
                <span className="font-medium">Download</span>
              </button>
            </div>
          </div>

          {/* Share Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Share Link
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareView;