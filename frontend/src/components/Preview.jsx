import { Sandpack } from '@codesandbox/sandpack-react';
import { useProject } from '../context/ProjectContext';
import { useTheme } from '../context/ThemeContext';

export default function Preview() {
  const { files } = useProject();
  const { theme } = useTheme();

  // Convert files to Sandpack format
  const sandpackFiles = Object.entries(files).reduce((acc, [path, file]) => {
    acc[path] = file.code;
    return acc;
  }, {});

  // Ensure essential files exist
  if (!sandpackFiles['/index.js']) {
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
            },
          }}
        />
      </div>
    </div>
  );
}
