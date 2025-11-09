import { useState } from 'react';
import { X, Share2, Copy, Check } from 'lucide-react';
import { generateShareLink, copyToClipboard } from '../utils/export';
import { useProject } from '../context/ProjectContext';

export default function ShareModal({ isOpen, onClose }) {
  const { files, currentProject } = useProject();
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const handleGenerateLink = () => {
    const projectData = {
      name: currentProject?.name || 'Shared Project',
      files,
    };
    const link = generateShareLink(projectData);
    setShareLink(link);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(shareLink);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-xl w-full mx-4">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Share2 className="w-6 h-6 text-blue-600" />
            Share Project
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!shareLink ? (
            <div className="text-center py-8">
              <Share2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Generate a shareable link for your project
              </p>
              <button
                onClick={handleGenerateLink}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Generate Share Link
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Share this link with anyone:
              </p>
              <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg mb-4">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-blue-600"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                  ✓ Link copied to clipboard!
                </p>
              )}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Note:</strong> This link contains your project code encoded in the URL. Anyone with this link can view and edit the project.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
