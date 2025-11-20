import { X, Keyboard } from 'lucide-react';

export default function KeyboardShortcuts({ isOpen, onClose }) {
  const shortcuts = [
    {
      category: 'General',
      items: [
        { keys: ['Ctrl', 'S'], description: 'Save project' },
        { keys: ['Ctrl', 'Shift', 'P'], description: 'Format code' },
        { keys: ['Ctrl', 'F'], description: 'Find in file' },
        { keys: ['Ctrl', 'H'], description: 'Find and replace' },
        { keys: ['Ctrl', 'Shift', 'K'], description: 'Show shortcuts' },
        { keys: ['Ctrl', 'Shift', 'L'], description: 'Toggle console' },
        { keys: ['Ctrl', 'Shift', 'A'], description: 'AI Assistant' },
      ],
    },
    {
      category: 'Editor',
      items: [
        { keys: ['Ctrl', 'Z'], description: 'Undo' },
        { keys: ['Ctrl', 'Y'], description: 'Redo' },
        { keys: ['Ctrl', 'X'], description: 'Cut line' },
        { keys: ['Ctrl', 'C'], description: 'Copy line' },
        { keys: ['Ctrl', 'V'], description: 'Paste' },
        { keys: ['Ctrl', '/'], description: 'Toggle comment' },
        { keys: ['Alt', '↑'], description: 'Move line up' },
        { keys: ['Alt', '↓'], description: 'Move line down' },
        { keys: ['Ctrl', 'D'], description: 'Select next occurrence' },
        { keys: ['Ctrl', 'Shift', 'L'], description: 'Select all occurrences' },
      ],
    },
    {
      category: 'Navigation',
      items: [
        { keys: ['Ctrl', 'G'], description: 'Go to line' },
        { keys: ['Ctrl', 'P'], description: 'Quick file open' },
        { keys: ['Ctrl', 'Tab'], description: 'Switch files' },
        { keys: ['Home'], description: 'Go to line start' },
        { keys: ['End'], description: 'Go to line end' },
        { keys: ['Ctrl', 'Home'], description: 'Go to file start' },
        { keys: ['Ctrl', 'End'], description: 'Go to file end' },
      ],
    },
    {
      category: 'Selection',
      items: [
        { keys: ['Ctrl', 'A'], description: 'Select all' },
        { keys: ['Shift', '→'], description: 'Select right' },
        { keys: ['Shift', '←'], description: 'Select left' },
        { keys: ['Ctrl', 'Shift', '→'], description: 'Select word right' },
        { keys: ['Ctrl', 'Shift', '←'], description: 'Select word left' },
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Keyboard className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shortcuts.map((section) => (
              <div key={section.category}>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.items.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {shortcut.description}
                      </span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <span key={keyIndex} className="flex items-center">
                            <kbd className="px-2 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded shadow-sm">
                              {key}
                            </kbd>
                            {keyIndex < shortcut.keys.length - 1 && (
                              <span className="mx-1 text-gray-400">+</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Press <kbd className="px-2 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded">Shift</kbd> + <kbd className="px-2 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded">K</kbd> to toggle this panel
          </p>
        </div>
      </div>
    </div>
  );
}
