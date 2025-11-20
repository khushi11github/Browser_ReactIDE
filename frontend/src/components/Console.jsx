import { useState, useEffect } from 'react';
import { Terminal, X, Trash2, ChevronDown, ChevronUp, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export default function Console({ isOpen, onToggle }) {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all'); // all, error, warning, info

  useEffect(() => {
    // Intercept console methods
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    const originalConsoleLog = console.log;
    const originalConsoleInfo = console.info;

    console.error = (...args) => {
      addLog('error', args.join(' '));
      originalConsoleError(...args);
    };

    console.warn = (...args) => {
      addLog('warning', args.join(' '));
      originalConsoleWarn(...args);
    };

    console.log = (...args) => {
      addLog('info', args.join(' '));
      originalConsoleLog(...args);
    };

    console.info = (...args) => {
      addLog('info', args.join(' '));
      originalConsoleInfo(...args);
    };

    // Listen for sandpack errors
    window.addEventListener('message', handleSandpackMessage);

    return () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      console.log = originalConsoleLog;
      console.info = originalConsoleInfo;
      window.removeEventListener('message', handleSandpackMessage);
    };
  }, []);

  const handleSandpackMessage = (event) => {
    if (event.data && event.data.type === 'error') {
      addLog('error', event.data.message || 'Runtime error occurred');
    }
  };

  const addLog = (type, message) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        type,
        message,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const getFilteredLogs = () => {
    if (filter === 'all') return logs;
    return logs.filter((log) => log.type === filter);
  };

  const getLogIcon = (type) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'info':
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };

  const filteredLogs = getFilteredLogs();

  if (!isOpen) {
    return (
      <div className="h-8 bg-gray-800 border-t border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Console</span>
          {logs.length > 0 && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {logs.filter((l) => l.type === 'error').length}
            </span>
          )}
        </div>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-white"
          title="Open console"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="h-64 bg-gray-900 border-t border-gray-700 flex flex-col">
      {/* Header */}
      <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300 font-semibold">Console</span>
          </div>

          {/* Filter buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-1 text-xs rounded ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All ({logs.length})
            </button>
            <button
              onClick={() => setFilter('error')}
              className={`px-2 py-1 text-xs rounded ${
                filter === 'error'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Errors ({logs.filter((l) => l.type === 'error').length})
            </button>
            <button
              onClick={() => setFilter('warning')}
              className={`px-2 py-1 text-xs rounded ${
                filter === 'warning'
                  ? 'bg-yellow-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Warnings ({logs.filter((l) => l.type === 'warning').length})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearLogs}
            className="p-1 text-gray-400 hover:text-white"
            title="Clear console"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onToggle}
            className="p-1 text-gray-400 hover:text-white"
            title="Close console"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Logs */}
      <div className="flex-1 overflow-y-auto p-2 font-mono text-sm">
        {filteredLogs.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No {filter !== 'all' ? filter : ''} messages
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-2 py-1 px-2 hover:bg-gray-800 rounded"
            >
              {getLogIcon(log.type)}
              <span className="text-xs text-gray-500">{log.timestamp}</span>
              <span className={`flex-1 ${getLogColor(log.type)}`}>
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
