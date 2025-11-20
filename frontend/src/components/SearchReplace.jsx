import { useState, useEffect } from 'react';
import { X, Search, Replace, ChevronDown, ChevronUp } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function SearchReplace({ isOpen, onClose, editorRef }) {
  const { files, activeFile, updateFile } = useProject();
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [matches, setMatches] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  const currentFile = files[activeFile];

  useEffect(() => {
    if (searchTerm && currentFile) {
      findMatches();
    } else {
      setMatches([]);
      setCurrentMatchIndex(0);
    }
  }, [searchTerm, caseSensitive, useRegex, wholeWord, currentFile]);

  const findMatches = () => {
    const code = currentFile.code;
    const foundMatches = [];

    try {
      let pattern = searchTerm;

      if (!useRegex) {
        pattern = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      if (wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }

      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(pattern, flags);

      let match;
      while ((match = regex.exec(code)) !== null) {
        foundMatches.push({
          index: match.index,
          length: match[0].length,
          text: match[0],
        });
      }

      setMatches(foundMatches);
      if (foundMatches.length > 0) {
        highlightMatch(0);
      }
    } catch (error) {
      console.error('Search error:', error);
      setMatches([]);
    }
  };

  const highlightMatch = (index) => {
    if (!editorRef.current || !matches[index]) return;

    const editor = editorRef.current;
    const match = matches[index];
    const model = editor.getModel();
    const startPos = model.getPositionAt(match.index);
    const endPos = model.getPositionAt(match.index + match.length);

    editor.setSelection({
      startLineNumber: startPos.lineNumber,
      startColumn: startPos.column,
      endLineNumber: endPos.lineNumber,
      endColumn: endPos.column,
    });

    editor.revealLineInCenter(startPos.lineNumber);
    editor.focus();
  };

  const navigateMatch = (direction) => {
    if (matches.length === 0) return;

    let newIndex = currentMatchIndex + direction;
    if (newIndex < 0) newIndex = matches.length - 1;
    if (newIndex >= matches.length) newIndex = 0;

    setCurrentMatchIndex(newIndex);
    highlightMatch(newIndex);
  };

  const replaceCurrentMatch = () => {
    if (matches.length === 0 || !currentFile) return;

    const match = matches[currentMatchIndex];
    const code = currentFile.code;
    const newCode =
      code.substring(0, match.index) +
      replaceTerm +
      code.substring(match.index + match.length);

    updateFile(activeFile, newCode);

    // Recalculate matches after replacement
    setTimeout(() => {
      findMatches();
    }, 100);
  };

  const replaceAllMatches = () => {
    if (matches.length === 0 || !currentFile) return;

    let code = currentFile.code;

    try {
      let pattern = searchTerm;

      if (!useRegex) {
        pattern = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      if (wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }

      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(pattern, flags);

      const newCode = code.replace(regex, replaceTerm);
      updateFile(activeFile, newCode);

      setMatches([]);
      setCurrentMatchIndex(0);
    } catch (error) {
      console.error('Replace all error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-14 right-4 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="font-semibold text-gray-900 dark:text-white text-sm">
            Find & Replace
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Find"
            className="w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
            autoFocus
          />
          {matches.length > 0 && (
            <div className="absolute right-2 top-2 flex items-center gap-1">
              <span className="text-xs text-gray-500 mr-1">
                {currentMatchIndex + 1}/{matches.length}
              </span>
              <button
                onClick={() => navigateMatch(-1)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                title="Previous match"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => navigateMatch(1)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                title="Next match"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Replace Input */}
        <div className="relative">
          <input
            type="text"
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
            placeholder="Replace"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
          />
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded"
            />
            Case sensitive
          </label>
          <label className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={wholeWord}
              onChange={(e) => setWholeWord(e.target.checked)}
              className="rounded"
            />
            Whole word
          </label>
          <label className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={useRegex}
              onChange={(e) => setUseRegex(e.target.checked)}
              className="rounded"
            />
            Regex
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={replaceCurrentMatch}
            disabled={matches.length === 0}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <Replace className="w-3 h-3" />
            Replace
          </button>
          <button
            onClick={replaceAllMatches}
            disabled={matches.length === 0}
            className="flex-1 px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Replace All
          </button>
        </div>
      </div>
    </div>
  );
}
