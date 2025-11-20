// Code snippets library
export const snippetsLibrary = {
  react: {
    name: 'React',
    snippets: {
      'useState': {
        name: 'useState Hook',
        description: 'React useState hook',
        code: `const [state, setState] = useState(initialValue);`,
      },
      'useEffect': {
        name: 'useEffect Hook',
        description: 'React useEffect hook',
        code: `useEffect(() => {
  // Effect code here
  
  return () => {
    // Cleanup code here
  };
}, [dependencies]);`,
      },
      'component': {
        name: 'Functional Component',
        description: 'Basic functional component',
        code: `export default function ComponentName() {
  return (
    <div>
      <h1>Component</h1>
    </div>
  );
}`,
      },
      'props-component': {
        name: 'Component with Props',
        description: 'Component with props destructuring',
        code: `export default function ComponentName({ prop1, prop2 }) {
  return (
    <div>
      <h1>{prop1}</h1>
      <p>{prop2}</p>
    </div>
  );
}`,
      },
      'useContext': {
        name: 'useContext Hook',
        description: 'React useContext hook',
        code: `const value = useContext(MyContext);`,
      },
      'useRef': {
        name: 'useRef Hook',
        description: 'React useRef hook',
        code: `const ref = useRef(initialValue);`,
      },
      'useMemo': {
        name: 'useMemo Hook',
        description: 'React useMemo hook',
        code: `const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);`,
      },
      'useCallback': {
        name: 'useCallback Hook',
        description: 'React useCallback hook',
        code: `const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`,
      },
    },
  },
  javascript: {
    name: 'JavaScript',
    snippets: {
      'arrow-function': {
        name: 'Arrow Function',
        description: 'Arrow function syntax',
        code: `const functionName = (param1, param2) => {
  return result;
};`,
      },
      'async-function': {
        name: 'Async Function',
        description: 'Async/await function',
        code: `async function functionName() {
  try {
    const result = await asyncOperation();
    return result;
  } catch (error) {
    console.error(error);
  }
}`,
      },
      'promise': {
        name: 'Promise',
        description: 'Promise creation',
        code: `const promise = new Promise((resolve, reject) => {
  // Async operation
  if (success) {
    resolve(result);
  } else {
    reject(error);
  }
});`,
      },
      'fetch': {
        name: 'Fetch API',
        description: 'Fetch with async/await',
        code: `async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}`,
      },
      'class': {
        name: 'Class',
        description: 'ES6 class syntax',
        code: `class ClassName {
  constructor(param) {
    this.param = param;
  }
  
  method() {
    // Method code
  }
}`,
      },
      'for-of': {
        name: 'For...of Loop',
        description: 'Iterate over iterable',
        code: `for (const item of iterable) {
  console.log(item);
}`,
      },
      'destructuring': {
        name: 'Destructuring',
        description: 'Object/Array destructuring',
        code: `const { prop1, prop2 } = object;
const [item1, item2] = array;`,
      },
    },
  },
  html: {
    name: 'HTML',
    snippets: {
      'html5': {
        name: 'HTML5 Template',
        description: 'Basic HTML5 structure',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>`,
      },
      'form': {
        name: 'Form',
        description: 'HTML form structure',
        code: `<form action="" method="post">
  <label for="input">Label:</label>
  <input type="text" id="input" name="input" required>
  <button type="submit">Submit</button>
</form>`,
      },
    },
  },
  css: {
    name: 'CSS',
    snippets: {
      'flexbox': {
        name: 'Flexbox Container',
        description: 'Flexbox layout',
        code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}`,
      },
      'grid': {
        name: 'CSS Grid',
        description: 'Grid layout',
        code: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}`,
      },
      'animation': {
        name: 'CSS Animation',
        description: 'Keyframe animation',
        code: `@keyframes animationName {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.element {
  animation: animationName 1s ease-in-out;
}`,
      },
      'media-query': {
        name: 'Media Query',
        description: 'Responsive breakpoint',
        code: `@media (max-width: 768px) {
  .element {
    /* Mobile styles */
  }
}`,
      },
    },
  },
};

export function getSnippetsByCategory(category) {
  return snippetsLibrary[category]?.snippets || {};
}

export function getAllCategories() {
  return Object.entries(snippetsLibrary).map(([key, value]) => ({
    id: key,
    name: value.name,
  }));
}

export function searchSnippets(query) {
  const results = [];
  const lowerQuery = query.toLowerCase();

  Object.entries(snippetsLibrary).forEach(([categoryId, category]) => {
    Object.entries(category.snippets).forEach(([snippetId, snippet]) => {
      if (
        snippet.name.toLowerCase().includes(lowerQuery) ||
        snippet.description.toLowerCase().includes(lowerQuery) ||
        snippet.code.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          categoryId,
          categoryName: category.name,
          snippetId,
          ...snippet,
        });
      }
    });
  });

  return results;
}
