import { useState } from 'react';
import { X, Code2, Search, Copy, Check } from 'lucide-react';
import { getAllCategories, getSnippetsByCategory, searchSnippets } from '../utils/snippets';

export default function CodeSnippets({ isOpen, onClose, onInsertSnippet }) {
  const [selectedCategory, setSelectedCategory] = useState('react');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState(null);

  const categories = getAllCategories();
  
  const displaySnippets = searchQuery
    ? searchSnippets(searchQuery)
    : Object.entries(getSnippetsByCategory(selectedCategory)).map(([id, snippet]) => ({
        snippetId: id,
        categoryId: selectedCategory,
        ...snippet,
      }));

  const handleCopy = (code, snippetId) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(snippetId);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleInsert = (code) => {
    onInsertSnippet(code);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Code Snippets
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search snippets..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Categories Sidebar */}
          {!searchQuery && (
            <div className="w-48 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition ${
                    selectedCategory === category.id
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-l-4 border-purple-600'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}

          {/* Snippets List */}
          <div className="flex-1 overflow-y-auto p-6">
            {displaySnippets.length === 0 ? (
              <div className="text-center py-12">
                <Code2 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery ? 'No snippets found' : 'No snippets in this category'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {displaySnippets.map((snippet) => (
                  <div
                    key={`${snippet.categoryId}-${snippet.snippetId}`}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {snippet.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {snippet.description}
                        </p>
                        {searchQuery && snippet.categoryName && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                            {snippet.categoryName}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(snippet.code, snippet.snippetId)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                          title="Copy to clipboard"
                        >
                          {copiedSnippet === snippet.snippetId ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => handleInsert(snippet.code)}
                          className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
                        >
                          Insert
                        </button>
                      </div>
                    </div>
                    <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
