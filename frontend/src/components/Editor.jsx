import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useProject } from '../context/ProjectContext';
import { useTheme } from '../context/ThemeContext';
import { formatCode, canFormat } from '../utils/formatter';
import SearchReplace from './SearchReplace';
import CodeSnippets from './CodeSnippets';
import { Search, Code, FileCode, AlertCircle } from 'lucide-react';

export default function CodeEditor() {
  const { files, activeFile, updateFile } = useProject();
  const { theme } = useTheme();
  const editorRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [formatError, setFormatError] = useState(null);

  const currentFile = files[activeFile];

  const handleEditorChange = (value) => {
    updateFile(activeFile, value);
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    // Add keyboard shortcuts
    editor.addCommand(window.monaco.KeyMod.CtrlCmd | window.monaco.KeyCode.KeyF, () => {
      setShowSearch(true);
    });

    editor.addCommand(window.monaco.KeyMod.CtrlCmd | window.monaco.KeyCode.KeyH, () => {
      setShowSearch(true);
    });

    editor.addCommand(
      window.monaco.KeyMod.CtrlCmd | window.monaco.KeyMod.Shift | window.monaco.KeyCode.KeyP,
      () => {
        handleFormat();
      }
    );
  };

  const getLanguage = (filename) => {
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) return 'javascript';
    if (filename.endsWith('.css')) return 'css';
    if (filename.endsWith('.html')) return 'html';
    if (filename.endsWith('.json')) return 'json';
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return 'typescript';
    return 'javascript';
  };

  const handleFormat = async () => {
    if (!editorRef.current || !currentFile) return;

    const language = getLanguage(activeFile);
    if (!canFormat(language)) {
      setFormatError(`Formatting not supported for ${language}`);
      setTimeout(() => setFormatError(null), 3000);
      return;
    }

    setIsFormatting(true);
    setFormatError(null);

    try {
      const formatted = await formatCode(currentFile.code, language);
      updateFile(activeFile, formatted);
    } catch (error) {
      setFormatError(error.message);
      setTimeout(() => setFormatError(null), 3000);
    } finally {
      setIsFormatting(false);
    }
  };

  const handleInsertSnippet = (code) => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const selection = editor.getSelection();
    const id = { major: 1, minor: 1 };
    const op = {
      identifier: id,
      range: selection,
      text: code,
      forceMoveMarkers: true,
    };
    editor.executeEdits('snippet-insert', [op]);
    editor.focus();
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 relative">
      {/* Toolbar */}
      <div className="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
        <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">
          {activeFile}
        </span>
        <div className="flex items-center gap-2">
          {formatError && (
            <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="w-3 h-3" />
              <span>{formatError}</span>
            </div>
          )}
          <button
            onClick={() => setShowSearch(true)}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
            title="Find & Replace (Ctrl+F)"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowSnippets(true)}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
            title="Insert Snippet"
          >
            <FileCode className="w-4 h-4" />
          </button>
          <button
            onClick={handleFormat}
            disabled={isFormatting || !canFormat(getLanguage(activeFile))}
            className="flex items-center gap-1 px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            title="Format Code (Ctrl+Shift+P)"
          >
            <Code className="w-4 h-4" />
            {isFormatting ? 'Formatting...' : 'Format'}
          </button>
        </div>
      </div>

      {/* Editor */}
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
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnCommitCharacter: true,
            acceptSuggestionOnEnter: 'on',
            snippetSuggestions: 'inline',
          }}
        />
      </div>

      {/* Search & Replace Modal */}
      <SearchReplace
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        editorRef={editorRef}
      />

      {/* Code Snippets Modal */}
      <CodeSnippets
        isOpen={showSnippets}
        onClose={() => setShowSnippets(false)}
        onInsertSnippet={handleInsertSnippet}
      />
    </div>
  );
}
