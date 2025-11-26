import React from 'react';
import { ArrowLeft, Edit3, Save } from 'lucide-react';

function EditView({ currentFile, editContent, setEditContent, onSave, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        {/* Editor Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Edit3 className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Edit File</h2>
                <p className="text-sm text-gray-500">{currentFile?.name}</p>
              </div>
            </div>
            <button
              onClick={onSave}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
            >
              <Save size={20} />
              Save & Share
            </button>
          </div>

          {/* Editor Textarea */}
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-96 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none font-mono text-sm resize-none"
            placeholder="Edit your file content here..."
          />
        </div>
      </div>
    </div>
  );
}

export default EditView;