import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useProject } from '../context/ProjectContext';
import { useTheme } from '../context/ThemeContext';

export default function CodeEditor() {
  const { files, activeFile, updateFile } = useProject();
  const { theme } = useTheme();
  const editorRef = useRef(null);

  const currentFile = files[activeFile];

  const handleEditorChange = (value) => {
    updateFile(activeFile, value);
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const getLanguage = (filename) => {
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) return 'javascript';
    if (filename.endsWith('.css')) return 'css';
    if (filename.endsWith('.html')) return 'html';
    if (filename.endsWith('.json')) return 'json';
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return 'typescript';
    return 'javascript';
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      <div className="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
        <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">
          {activeFile}
        </span>
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={getLanguage(activeFile)}
          value={currentFile?.code || ''}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
}
