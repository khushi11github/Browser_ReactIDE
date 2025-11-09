// Utility functions for CodeCanvas

// Export project to CodeSandbox
export const exportToCodeSandbox = (files) => {
  const sandboxFiles = {};
  
  Object.entries(files).forEach(([path, file]) => {
    sandboxFiles[path.slice(1)] = {
      content: file.code,
    };
  });

  // Add package.json
  sandboxFiles['package.json'] = {
    content: JSON.stringify({
      name: 'codecanvas-export',
      version: '1.0.0',
      description: 'Exported from CodeCanvas',
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
        'react-scripts': '^5.0.1',
      },
      main: '/index.js',
    }, null, 2),
  };

  // Add public/index.html
  sandboxFiles['public/index.html'] = {
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeCanvas Export</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  };

  const parameters = {
    files: sandboxFiles,
  };

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define';
  form.target = '_blank';

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'parameters';
  input.value = JSON.stringify(parameters);

  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

// Export to StackBlitz
export const exportToStackBlitz = (files) => {
  const stackBlitzFiles = {};
  
  Object.entries(files).forEach(([path, file]) => {
    const fileName = path.slice(1); // Remove leading slash
    stackBlitzFiles[fileName] = file.code;
  });

  // Add package.json
  stackBlitzFiles['package.json'] = JSON.stringify({
    name: 'codecanvas-export',
    version: '1.0.0',
    description: 'Exported from CodeCanvas',
    dependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
    },
  }, null, 2);

  // Add index.html
  stackBlitzFiles['index.html'] = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeCanvas Export</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`;

  // Create StackBlitz project
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://stackblitz.com/run';
  form.target = '_blank';

  Object.entries(stackBlitzFiles).forEach(([name, content]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = `project[files][${name}]`;
    input.value = content;
    form.appendChild(input);
  });

  const titleInput = document.createElement('input');
  titleInput.type = 'hidden';
  titleInput.name = 'project[title]';
  titleInput.value = 'CodeCanvas Export';
  form.appendChild(titleInput);

  const templateInput = document.createElement('input');
  templateInput.type = 'hidden';
  templateInput.name = 'project[template]';
  templateInput.value = 'create-react-app';
  form.appendChild(templateInput);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

// Generate shareable link (using base64 encoding)
export const generateShareLink = (projectData) => {
  const compressed = btoa(encodeURIComponent(JSON.stringify(projectData)));
  const baseUrl = window.location.origin;
  return `${baseUrl}/ide?share=${compressed}`;
};

// Load project from share link
export const loadFromShareLink = () => {
  const params = new URLSearchParams(window.location.search);
  const shareParam = params.get('share');
  
  if (shareParam) {
    try {
      const decoded = decodeURIComponent(atob(shareParam));
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Failed to load shared project:', error);
      return null;
    }
  }
  return null;
};

// Download project as ZIP (requires JSZip library - we'll simulate with file downloads)
export const downloadProject = (files, projectName = 'codecanvas-project') => {
  // For now, download individual files
  // In production, you'd use JSZip to create a proper ZIP
  Object.entries(files).forEach(([path, file]) => {
    const blob = new Blob([file.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}${path}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
};

// Copy project to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

// Format code (basic formatter)
export const formatCode = (code, language = 'javascript') => {
  // Basic formatting - in production, use prettier
  return code
    .split('\n')
    .map(line => line.trim())
    .join('\n');
};
