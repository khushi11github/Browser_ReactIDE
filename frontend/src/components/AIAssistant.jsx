import { useState } from 'react';
import { X, Sparkles, MessageSquare, Bug, RefreshCw, FileText, Zap, Lightbulb, Loader2 } from 'lucide-react';
import { aiService, getAIStatus, getAIProvider, isAIConfigured } from '../utils/aiService';

export default function AIAssistant({ isOpen, onClose, currentCode, onCodeUpdate, selectedCode }) {
  const [activeTab, setActiveTab] = useState('explain');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refactoredCode, setRefactoredCode] = useState(null);
  
  const aiStatus = getAIStatus();
  const aiProvider = getAIProvider();
  const isConfigured = isAIConfigured();

  const handleAction = async (action) => {
    setLoading(true);
    setError(null);
    setResult('');

    try {
      const codeToAnalyze = selectedCode || currentCode;
      
      if (!codeToAnalyze || codeToAnalyze.trim() === '') {
        setError('No code to analyze. Please select some code or ensure the editor is not empty.');
        setLoading(false);
        return;
      }

      let response;
      switch (action) {
        case 'explain':
          response = await aiService.explainCode(codeToAnalyze);
          setResult(response);
          break;
        
        case 'bugs':
          response = await aiService.findBugs(codeToAnalyze);
          setResult(formatBugs(response));
          break;
        
        case 'refactor':
          response = await aiService.refactorCode(codeToAnalyze);
          setRefactoredCode(response.code);
          setResult(`${response.explanation}\n\n**Preview of refactored code:**\n${'```javascript'}\n${response.code}\n${'```'}\n\n⚠️ **Important:** Review the changes carefully before applying. Click "Apply Refactored Code" button below if the changes look correct.`);
          break;
        
        case 'docs':
          response = await aiService.generateDocumentation(codeToAnalyze);
          setResult(response);
          break;
        
        case 'optimize':
          response = await aiService.optimizeCode(codeToAnalyze);
          setResult(`Optimization suggestions:\n\n${'```javascript'}\n${response}\n${'```'}`);
          break;
        
        default:
          setError('Unknown action');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  const formatBugs = (bugs) => {
    if (!Array.isArray(bugs)) return 'No issues found';
    
    if (bugs[0]?.severity === 'success') {
      return '✅ ' + bugs[0].message;
    }
    
    return bugs.map((bug, i) => {
      const icon = bug.severity === 'error' ? '❌' : bug.severity === 'warning' ? '⚠️' : 'ℹ️';
      return `${icon} Line ${bug.line || '?'}: ${bug.message}\n   💡 ${bug.suggestion}`;
    }).join('\n\n');
  };

  const handleApplyRefactor = () => {
    if (refactoredCode && onCodeUpdate) {
      if (confirm('Are you sure you want to apply the refactored code? Make sure you\'ve reviewed the changes.')) {
        onCodeUpdate(refactoredCode);
        setRefactoredCode(null);
        alert('✅ Refactored code applied! Check your editor.');
      }
    }
  };

  const handleCloseModal = () => {
    setRefactoredCode(null);
    setResult('');
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'explain', label: 'Explain', icon: MessageSquare },
    { id: 'bugs', label: 'Find Bugs', icon: Bug },
    { id: 'refactor', label: 'Refactor', icon: RefreshCw },
    { id: 'docs', label: 'Generate Docs', icon: FileText },
    { id: 'optimize', label: 'Optimize', icon: Zap },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">AI Assistant</h2>
              <p className="text-xs text-purple-100">
                {aiStatus}
                {isConfigured && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-[10px]">
                    {aiProvider.toUpperCase()}
                  </span>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setResult('');
                  setError(null);
                }}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Info banner */}
          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900 dark:text-blue-100">
                {selectedCode ? (
                  <p><strong>Analyzing selected code.</strong> To analyze the entire file, deselect the text.</p>
                ) : (
                  <p><strong>Analyzing entire file.</strong> Select specific code to analyze just that section.</p>
                )}
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={() => handleAction(activeTab)}
            disabled={loading}
            className="w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {tabs.find(t => t.id === activeTab)?.label}
              </>
            )}
          </button>

          {/* Error */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                AI Response
              </h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono">
                {result}
              </pre>
              
              {/* Apply Refactor Button */}
              {refactoredCode && activeTab === 'refactor' && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleApplyRefactor}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Apply Refactored Code
                  </button>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                    ⚠️ This will replace your current code. Make sure to review changes first!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Empty state */}
          {!result && !error && !loading && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>Click the button above to analyze your code with AI</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            💡 Tip: Select specific code in the editor to analyze just that section
          </p>
        </div>
      </div>
    </div>
  );
}
