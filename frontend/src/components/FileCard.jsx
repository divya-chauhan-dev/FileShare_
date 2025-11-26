import React from 'react';
import { FileText, Share2 } from 'lucide-react';
import { formatFileSize } from '../utils/fileHelpers';

function FileCard({ file, onSelect }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-4">
        <FileText className="text-blue-600" size={24} />
        <div>
          <p className="font-medium text-gray-900">{file.name}</p>
          <p className="text-sm text-gray-500">
            {formatFileSize(file.size)} • {file.permission} access
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onSelect}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="View and share"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default FileCard;