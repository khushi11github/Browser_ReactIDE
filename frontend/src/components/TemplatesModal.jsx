import { useState } from 'react';
import { X, Code, FileText, Zap } from 'lucide-react';
import { getTemplateList, getTemplate } from '../utils/templates';
import { useProject } from '../context/ProjectContext';

export default function TemplatesModal({ isOpen, onClose }) {
  const templates = getTemplateList();
  const { updateFile, setActiveFile, deleteFile, files } = useProject();

  console.log('TemplatesModal render - isOpen:', isOpen);

  const handleSelectTemplate = (templateId) => {
    console.log('Template selected:', templateId);
    const template = getTemplate(templateId);
    console.log('Template data:', template);
    console.log('Template files:', template.files);
    
    // Delete all existing files first
    Object.keys(files).forEach(filePath => {
      deleteFile(filePath);
    });
    
    // Add all template files
    Object.entries(template.files).forEach(([path, fileData]) => {
      updateFile(path, fileData.code);
    });
    
    // Set the first file as active
    setActiveFile(Object.keys(template.files)[0]);
    console.log('Template applied, closing modal');
    onClose();
  };

  if (!isOpen) return null;

  const getTemplateIcon = (id) => {
    switch (id) {
      case 'todo-app':
        return '📝';
      case 'counter-app':
        return '⚡';
      case 'card-component':
        return '🎴';
      default:
        return '📄';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-600" />
            Choose a Template
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
          <div className="grid md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template.id)}
                className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all text-left group hover:shadow-lg"
              >
                <div className="text-4xl mb-3">{getTemplateIcon(template.id)}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {template.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            💡 Choose a template to quickly start your project
          </p>
        </div>
      </div>
    </div>
  );
}
