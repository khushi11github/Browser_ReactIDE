import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProjectProvider } from './context/ProjectContext';
import IDEPage from './pages/IDEPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ide" element={<IDEPage />} />
            <Route path="/ide/:projectId" element={<IDEPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </ProjectProvider>
    </ThemeProvider>
  );
}

export default App;
