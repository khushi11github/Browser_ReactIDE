import { Link } from 'react-router-dom';
import { Code2, Zap, Save, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <nav className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CodeCanvas</h1>
          </div>
          <div className="flex gap-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Build React Apps in Your Browser
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            A powerful, browser-based IDE for creating and running React applications instantly. 
            No setup required.
          </p>
          <Link 
            to="/ide" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
          >
            <Code2 className="w-5 h-5" />
            Start Coding Now
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <FeatureCard
            icon={<Code2 className="w-8 h-8" />}
            title="Code Editor"
            description="Write React code with syntax highlighting and IntelliSense"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Live Preview"
            description="See your changes instantly as you code"
          />
          <FeatureCard
            icon={<Save className="w-8 h-8" />}
            title="Auto Save"
            description="Your work is automatically saved to localStorage"
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8" />}
            title="File Management"
            description="Create, delete, and organize project files easily"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Features
          </h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              Multiple file support with organized file tree
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              Monaco Editor for professional code editing experience
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              Real-time React code execution with Sandpack
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              Dark and Light theme support
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              Project persistence with localStorage and backend API
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              Optional user authentication for cloud storage
            </li>
          </ul>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 CodeCanvas. Built with React, Sandpack, and MongoDB.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
      <div className="text-blue-600 dark:text-blue-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
