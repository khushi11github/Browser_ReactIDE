import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import Preview from '../components/Preview';

export default function IDEPage() {
  const { projectId } = useParams();
  const { loadProject, createNewProject, currentProject } = useProject();

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    } else if (!currentProject) {
      createNewProject();
    }
  }, [projectId]);

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
