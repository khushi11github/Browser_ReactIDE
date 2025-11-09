import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Save, FolderOpen, Settings, Moon, Sun, LogOut, User, Download, Share2, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProject } from '../context/ProjectContext';
import { exportToCodeSandbox, exportToStackBlitz } from '../utils/export';
import ShareModal from './ShareModal';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { currentProject, saveProject, autoSave, setAutoSave, files } = useProject();
  const [showSettings, setShowSettings] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('codecanvas-user') || 'null');

  const handleSave = () => {
    saveProject();
    // Show feedback
    const btn = document.getElementById('save-btn');
    if (btn) {
      btn.classList.add('animate-pulse');
      setTimeout(() => btn.classList.remove('animate-pulse'), 1000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('codecanvas-token');
    localStorage.removeItem('codecanvas-user');
    window.location.href = '/';
  };

  const handleExportCodeSandbox = () => {
    exportToCodeSandbox(files);
    setShowExportMenu(false);
  };

  const handleExportStackBlitz = () => {
    exportToStackBlitz(files);
    setShowExportMenu(false);
  };

  return (
    <nav className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <Code2 className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-gray-900 dark:text-white hidden sm:block">CodeCanvas</span>
        </Link>
        
        {currentProject && (
          <span className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
            {currentProject.name}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm transition"
          title="Share project"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition"
            title="Export project"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
              <button
                onClick={handleExportCodeSandbox}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-left text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
              >
                <ExternalLink className="w-4 h-4 text-orange-500" />
                <div>
                  <div className="font-medium">CodeSandbox</div>
                  <div className="text-xs text-gray-500">Open in CodeSandbox</div>
                </div>
              </button>
              <button
                onClick={handleExportStackBlitz}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-left text-sm text-gray-700 dark:text-gray-300"
              >
                <ExternalLink className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="font-medium">StackBlitz</div>
                  <div className="text-xs text-gray-500">Open in StackBlitz</div>
                </div>
              </button>
            </div>
          )}
        </div>

        <button
          id="save-btn"
          onClick={handleSave}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save</span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <Settings className="w-5 h-5" />
          </button>

          {showSettings && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Settings</h3>
                
                <label className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Auto Save</span>
                  <input
                    type="checkbox"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </label>

                {user && (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{user.username}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
    </nav>
  );
}
