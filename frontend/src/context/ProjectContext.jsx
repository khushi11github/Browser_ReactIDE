import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within ProjectProvider');
  }
  return context;
};

const DEFAULT_FILES = {
  '/App.js': {
    code: `export default function App() {
  return (
    <div className="app">
      <h1>Hello CodeCanvas!</h1>
      <p>Start building your React app here.</p>
    </div>
  );
}`,
  },
  '/index.js': {
    code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  },
  '/styles.css': {
    code: `.app {
  font-family: sans-serif;
  text-align: center;
  padding: 2rem;
}

h1 {
  color: #0ea5e9;
}`,
  },
};

export const ProjectProvider = ({ children }) => {
  const [currentProject, setCurrentProject] = useState(null);
  const [files, setFiles] = useState(DEFAULT_FILES);
  const [activeFile, setActiveFile] = useState('/App.js');
  const [autoSave, setAutoSave] = useState(true);

  // Load project from localStorage on mount
  useEffect(() => {
    const savedProjectId = localStorage.getItem('codecanvas-current-project');
    if (savedProjectId) {
      loadProject(savedProjectId);
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && currentProject) {
      const timeout = setTimeout(() => {
        saveProject();
      }, 2000); // Save after 2 seconds of inactivity
      return () => clearTimeout(timeout);
    }
  }, [files, autoSave, currentProject]);

  const createNewProject = useCallback((name = 'Untitled Project') => {
    const projectId = uuidv4();
    const newProject = {
      projectId,
      name,
      files: DEFAULT_FILES,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setCurrentProject(newProject);
    setFiles(DEFAULT_FILES);
    setActiveFile('/App.js');
    localStorage.setItem('codecanvas-current-project', projectId);
    localStorage.setItem(`codecanvas-project-${projectId}`, JSON.stringify(newProject));
    
    return projectId;
  }, []);

  const loadProject = useCallback((projectId) => {
    const saved = localStorage.getItem(`codecanvas-project-${projectId}`);
    if (saved) {
      const project = JSON.parse(saved);
      setCurrentProject(project);
      setFiles(project.files || DEFAULT_FILES);
      setActiveFile(Object.keys(project.files || DEFAULT_FILES)[0]);
      localStorage.setItem('codecanvas-current-project', projectId);
    }
  }, []);

  const saveProject = useCallback(() => {
    if (currentProject) {
      const updated = {
        ...currentProject,
        files,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(`codecanvas-project-${currentProject.projectId}`, JSON.stringify(updated));
      setCurrentProject(updated);
    }
  }, [currentProject, files]);

  const updateFile = useCallback((path, code) => {
    setFiles(prev => ({
      ...prev,
      [path]: { code },
    }));
  }, []);

  const createFile = useCallback((path, code = '') => {
    setFiles(prev => ({
      ...prev,
      [path]: { code },
    }));
    setActiveFile(path);
  }, []);

  const deleteFile = useCallback((path) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[path];
      return newFiles;
    });
    if (activeFile === path) {
      setActiveFile(Object.keys(files)[0] || '/App.js');
    }
  }, [activeFile, files]);

  const renameFile = useCallback((oldPath, newPath) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      newFiles[newPath] = newFiles[oldPath];
      delete newFiles[oldPath];
      return newFiles;
    });
    if (activeFile === oldPath) {
      setActiveFile(newPath);
    }
  }, [activeFile]);

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        files,
        activeFile,
        autoSave,
        setActiveFile,
        setAutoSave,
        createNewProject,
        loadProject,
        saveProject,
        updateFile,
        createFile,
        deleteFile,
        renameFile,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
