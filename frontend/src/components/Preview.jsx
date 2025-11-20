import { Sandpack } from '@codesandbox/sandpack-react';
import { useProject } from '../context/ProjectContext';
import { useTheme } from '../context/ThemeContext';

export default function Preview() {
  const { files } = useProject();
  const { theme } = useTheme();

  // Convert files to Sandpack format and filter out non-supported files
  const sandpackFiles = Object.entries(files).reduce((acc, [path, file]) => {
    // Only include supported file types, skip babel config and other non-JS/CSS/HTML files
    const ext = path.toLowerCase();
    if (ext.includes('.babelrc') || ext.includes('babel.config') || 
        ext.includes('.npmrc') || ext.includes('package-lock') ||
        ext.includes('.gitignore') || ext.includes('.env')) {
      return acc;
    }
    
    // Include JS, JSX, CSS, HTML, JSON files
    if (ext.match(/\.(jsx?|tsx?|css|html|json)$/i)) {
      acc[path] = file.code;
    }
    return acc;
  }, {});

  // Detect if project uses React Router
  const hasRouter = Object.values(sandpackFiles).some(code => 
    typeof code === 'string' && (
      code.includes('react-router') || 
      code.includes('BrowserRouter') || 
      code.includes('Routes') ||
      code.includes('Route')
    )
  );

  // Detect entry point - check for main.js, main.jsx, or index.js
  const hasMainJs = sandpackFiles['/main.js'] || sandpackFiles['/main.jsx'];
  const hasIndexJs = sandpackFiles['/index.js'] || sandpackFiles['/index.jsx'];
  
  // If main.js exists but no index.js, create index.js that imports from main
  if (hasMainJs && !hasIndexJs) {
    const mainPath = sandpackFiles['/main.js'] ? '/main.js' : '/main.jsx';
    sandpackFiles['/index.js'] = `import './index.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`;
  }

  // Ensure essential files exist
  if (!sandpackFiles['/index.js'] && !sandpackFiles['/index.jsx']) {
    sandpackFiles['/index.js'] = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`;
  }

  if (!sandpackFiles['/App.js']) {
    sandpackFiles['/App.js'] = `export default function App() {
  return (
    <div className="app">
      <h1>Hello CodeCanvas!</h1>
      <p>Start building your React app here.</p>
    </div>
  );
}`;
  }

  return (
    <div className="flex-1 border-l border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
        <span className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
          Preview
        </span>
        {hasRouter && (
          <span className="ml-3 text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
            Router Detected
          </span>
        )}
      </div>
      <div className="h-[calc(100%-2.5rem)]">
        <Sandpack
          files={sandpackFiles}
          theme={theme === 'dark' ? 'dark' : 'light'}
          template="react"
          options={{
            showNavigator: false,
            showTabs: false,
            showLineNumbers: false,
            showInlineErrors: true,
            wrapContent: true,
            editorHeight: '100%',
            editorWidthPercentage: 0,
            autorun: true,
            recompileMode: 'delayed',
            recompileDelay: 500,
          }}
          customSetup={{
            dependencies: {
              react: '^18.2.0',
              'react-dom': '^18.2.0',
              ...(hasRouter && { 'react-router-dom': '^6.20.0' }),
            },
            environment: 'create-react-app',
          }}
        />
      </div>
    </div>
  );
}
