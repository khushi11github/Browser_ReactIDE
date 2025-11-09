import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { loadFromShareLink } from '../utils/export';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import Preview from '../components/Preview';

export default function IDEPage() {
  const { projectId } = useParams();
  const location = useLocation();
  const { loadProject, createNewProject, currentProject, setFiles } = useProject();

  useEffect(() => {
    // Check if loading from share link
    const sharedProject = loadFromShareLink();
    if (sharedProject) {
      setFiles(sharedProject.files);
      return;
    }

    if (projectId) {
      loadProject(projectId);
    } else if (!currentProject) {
      createNewProject();
    }
  }, [projectId, location.search]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <Editor />
          <Preview />
        </div>
      </div>
    </div>
  );
}
