// Code templates for quick project setup
export const templates = {
  'basic-app': {
    name: 'Basic App',
    description: 'Simple React app starter',
    files: {
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
    },
  },
  'todo-app': {
    name: 'Todo App',
    description: 'Todo list with React hooks',
    files: {
      '/App.js': {
        code: `import { useState } from 'react';
import './styles.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>📝 Todo App</h1>
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
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
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #0ea5e9;
  text-align: center;
}

.input-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input[type="text"] {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background: #0ea5e9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0284c7;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.todo-list li.done span {
  text-decoration: line-through;
  color: #888;
}

.todo-list li span {
  flex: 1;
}

.todo-list li button {
  background: #ef4444;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}`,
      },
    },
  },
  'counter-app': {
    name: 'Counter App',
    description: 'Simple counter with React',
    files: {
      '/App.js': {
        code: `import { useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>⚡ Counter App</h1>
      <div className="counter">
        <h2>{count}</h2>
        <div className="buttons">
          <button onClick={() => setCount(count - 1)}>-</button>
          <button onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      </div>
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
}

.counter {
  margin-top: 2rem;
}

.counter h2 {
  font-size: 4rem;
  margin: 1rem 0;
  color: #333;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background: #0ea5e9;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background: #0284c7;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}`,
      },
    },
  },
  'card-component': {
    name: 'Card Component',
    description: 'Reusable card component example',
    files: {
      '/App.js': {
        code: `import Card from './Card';
import './styles.css';

export default function App() {
  const cards = [
    { id: 1, title: 'Card 1', content: 'This is the first card' },
    { id: 2, title: 'Card 2', content: 'This is the second card' },
    { id: 3, title: 'Card 3', content: 'This is the third card' },
  ];

  return (
    <div className="app">
      <h1>🎴 Card Components</h1>
      <div className="card-grid">
        {cards.map(card => (
          <Card key={card.id} title={card.title} content={card.content} />
        ))}
      </div>
    </div>
  );
}`,
      },
      '/Card.js': {
        code: `export default function Card({ title, content }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
      <button>Learn More</button>
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
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #0ea5e9;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.card h3 {
  margin-top: 0;
  color: #333;
}

.card p {
  color: #666;
  line-height: 1.6;
}

.card button {
  background: #0ea5e9;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.card button:hover {
  background: #0284c7;
}`,
      },
    },
  },
  'router-app': {
    name: 'React Router App',
    description: 'Multi-page app with React Router',
    files: {
      '/App.js': {
        code: `import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>My App</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}`,
      },
      '/pages/Home.js': {
        code: `export default function Home() {
  return (
    <div className="page">
      <h2>🏠 Home Page</h2>
      <p>Welcome to our React Router app!</p>
      <p>Navigate using the links above to explore different pages.</p>
    </div>
  );
}`,
      },
      '/pages/About.js': {
        code: `export default function About() {
  return (
    <div className="page">
      <h2>ℹ️ About Page</h2>
      <p>This is a sample multi-page React application.</p>
      <p>Built with React Router v6 for client-side routing.</p>
    </div>
  );
}`,
      },
      '/pages/Contact.js': {
        code: `export default function Contact() {
  return (
    <div className="page">
      <h2>📧 Contact Page</h2>
      <p>Get in touch with us!</p>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
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
  min-height: 100vh;
}

.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 0.8;
}

.content {
  padding: 2rem;
}

.page {
  max-width: 800px;
  margin: 0 auto;
  animation: fadeIn 0.5s;
}

.page h2 {
  color: #667eea;
  margin-bottom: 1rem;
}

.page p {
  line-height: 1.6;
  color: #666;
  margin-bottom: 1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.contact-form input,
.contact-form textarea {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #667eea;
}

.contact-form textarea {
  min-height: 120px;
  resize: vertical;
}

.contact-form button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.contact-form button:hover {
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
      },
    },
  },
};

export const getTemplate = (templateId) => {
  return templates[templateId] || templates['basic-app'];
};

export const getTemplateList = () => {
  return Object.entries(templates).map(([id, template]) => ({
    id,
    name: template.name,
    description: template.description,
  }));
};
