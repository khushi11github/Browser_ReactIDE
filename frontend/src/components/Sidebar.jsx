import { useState, useRef } from 'react';
import { File, Folder, Plus, Trash2, Edit2, Check, X, Sparkles, Upload, Download } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import TemplatesModal from './TemplatesModal';
import { downloadFile, handleMultipleFileUpload, uploadFromZip } from '../utils/fileOperations';

export default function Sidebar() {
  const { files, activeFile, setActiveFile, createFile, deleteFile, renameFile, addMultipleFiles } = useProject();
  const [showNewFile, setShowNewFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [editingFile, setEditingFile] = useState(null);
  const [editName, setEditName] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const fileInputRef = useRef(null);
  const zipInputRef = useRef(null);

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      const path = newFileName.startsWith('/') ? newFileName : `/${newFileName}`;
      createFile(path, '// Start coding here\n');
      setNewFileName('');
      setShowNewFile(false);
    }
  };

  const handleRename = (oldPath) => {
    if (editName.trim() && editName !== oldPath) {
      const newPath = editName.startsWith('/') ? editName : `/${editName}`;
      renameFile(oldPath, newPath);
    }
    setEditingFile(null);
    setEditName('');
  };

  const handleFileUpload = async (event) => {
    const fileList = Array.from(event.target.files);
    const uploadedFiles = await handleMultipleFileUpload(fileList);
    addMultipleFiles(uploadedFiles);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleZipUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const uploadedFiles = await uploadFromZip(file);
        addMultipleFiles(uploadedFiles);
      } catch (error) {
        console.error('Error uploading ZIP:', error);
        alert('Failed to upload ZIP file');
      }
    }
    if (zipInputRef.current) zipInputRef.current.value = '';
  };

  const handleDownloadFile = (path) => {
    const file = files[path];
    if (file) {
      downloadFile(path, file.code);
    }
  };

  const getFileIcon = (filename) => {
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) {
      return '🟨';
    }
    if (filename.endsWith('.css')) {
      return '🎨';
    }
    if (filename.endsWith('.html')) {
      return '🌐';
    }
    if (filename.endsWith('.json')) {
      return '📋';
    }
    return '📄';
  };

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 dark:text-white">Files</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              title="Upload files"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowNewFile(true)}
              className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              title="Create new file"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            console.log('Use Template button clicked');
            setShowTemplates(true);
          }}
          className="w-full flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition text-sm mb-2"
        >
          <Sparkles className="w-4 h-4" />
          Use Template
        </button>
        <button
          onClick={() => zipInputRef.current?.click()}
          className="w-full flex items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm"
        >
          <Upload className="w-4 h-4" />
          Upload ZIP
        </button>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileUpload}
        className="hidden"
        accept=".js,.jsx,.ts,.tsx,.css,.html,.json"
      />
      <input
        ref={zipInputRef}
        type="file"
        onChange={handleZipUpload}
        className="hidden"
        accept=".zip"
      />

      <TemplatesModal isOpen={showTemplates} onClose={() => setShowTemplates(false)} />

      <div className="flex-1 overflow-y-auto">
        {showNewFile && (
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateFile();
                  if (e.key === 'Escape') {
                    setShowNewFile(false);
                    setNewFileName('');
                  }
                }}
                placeholder="filename.js"
                className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                autoFocus
              />
              <button
                onClick={handleCreateFile}
                className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setShowNewFile(false);
                  setNewFileName('');
                }}
                className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="py-2">
          {Object.keys(files).map((path) => (
            <div
              key={path}
              className={`group flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 ${
                activeFile === path ? 'bg-blue-100 dark:bg-blue-900/30' : ''
              }`}
            >
              {editingFile === path ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRename(path);
                      if (e.key === 'Escape') setEditingFile(null);
                    }}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    autoFocus
                  />
                  <button
                    onClick={() => handleRename(path)}
                    className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setEditingFile(null)}
                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <>
                  <span className="text-lg">{getFileIcon(path)}</span>
                  <span
                    onClick={() => setActiveFile(path)}
                    className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate"
                  >
                    {path.replace('/', '')}
                  </span>
                  <div className="hidden group-hover:flex items-center gap-1">
                    <button
                      onClick={() => handleDownloadFile(path)}
                      className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                      title="Download"
                    >
                      <Download className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingFile(path);
                        setEditName(path);
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                      title="Rename"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${path}?`)) {
                          deleteFile(path);
                        }
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
