// AI Service - Supports OpenAI, Gemini, and Mock responses
// Set VITE_AI_PROVIDER in .env to 'openai', 'gemini', or leave empty for mock

const AI_API_KEY = import.meta.env.VITE_AI_API_KEY || '';
const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'gemini'; // 'openai', 'gemini', or empty for mock
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Debug: Log configuration on load
console.log('🔧 AI Service Configuration:');
console.log('  Provider:', AI_PROVIDER);
console.log('  API Key:', AI_API_KEY ? `${AI_API_KEY.substring(0, 10)}...` : 'NOT SET');
console.log('  Is Configured:', !!AI_API_KEY);

// Mock AI responses for demo (will use real API if key is provided)
const mockResponses = {
  complete: (code, context) => {
    const suggestions = [
      'const handleClick = () => {\n  console.log("Button clicked");\n};',
      'useEffect(() => {\n  // Effect logic here\n}, [dependencies]);',
      'return (\n  <div className="container">\n    {/* Your content */}\n  </div>\n);',
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  },
  
  explain: (code) => {
    return `🤖 **AI Analysis:**

This code appears to be a JavaScript/React component. To get real AI-powered analysis, please configure your Gemini API key in the .env file.

**Quick Setup:**
1. Get FREE key: https://makersuite.google.com/app/apikey
2. Add to .env: VITE_AI_API_KEY=your_key
3. Restart server

Without API key, only basic pattern detection is available.`;
  },
  
  findBugs: (code) => {
    return [{
      severity: 'info',
      message: `🤖 **Demo Mode Active**

To get real AI bug detection, add your Gemini API key:

1. Visit: https://makersuite.google.com/app/apikey
2. Get FREE API key
3. Add to frontend/.env:
   VITE_AI_PROVIDER=gemini
   VITE_AI_API_KEY=your_key_here
4. Restart server

The AI will then analyze your code for real bugs, security issues, and improvements.`
    }];
  },
  
  refactor: (code) => {
    let refactored = code;
    let changes = [];
    
    // 1. Fix missing imports
    if (code.includes('BrowserRouter') && !code.includes('import') && !code.includes('from')) {
      const routerImports = [];
      if (code.includes('BrowserRouter')) routerImports.push('BrowserRouter as Router');
      if (code.includes('<Routes>') || code.includes('Routes')) routerImports.push('Routes');
      if (code.includes('<Route')) routerImports.push('Route');
      if (code.includes('<Link')) routerImports.push('Link');
      
      if (routerImports.length > 0) {
        const importLine = `import { ${routerImports.join(', ')} } from 'react-router-dom';\n`;
        refactored = importLine + refactored;
        changes.push('Added missing react-router-dom imports');
      }
    }
    
    // 2. Fix incomplete imports
    if (code.includes('import') && code.includes('from Home.j')) {
      refactored = refactored.replace(/from\s+Home\.j\b/g, "from './Home'");
      changes.push("Fixed incomplete import: 'from Home.j' → \"from './Home'\"");
    }
    
    if (code.match(/from\s+[A-Z]\w*\s*$/m)) {
      refactored = refactored.replace(/from\s+([A-Z]\w*)\s*$/gm, "from './$1'");
      changes.push('Fixed imports missing file path and quotes');
    }
    
    // 3. Add missing component imports
    const componentUsage = refactored.match(/<([A-Z]\w+)/g);
    if (componentUsage) {
      const usedComponents = [...new Set(componentUsage.map(m => m.slice(1)))];
      const existingImports = refactored.match(/import\s+(\w+)\s+from/g);
      const importedComponents = existingImports ? 
        existingImports.map(m => m.match(/import\s+(\w+)/)[1]) : [];
      
      const missingComponents = usedComponents.filter(c => 
        !importedComponents.includes(c) && 
        !['Router', 'Routes', 'Route', 'Link', 'Fragment'].includes(c)
      );
      
      if (missingComponents.length > 0 && !refactored.includes('export default')) {
        const importStatements = missingComponents
          .map(c => `import ${c} from './${c}';`)
          .join('\n');
        const firstImportIndex = refactored.indexOf('import');
        if (firstImportIndex !== -1) {
          const nextNewline = refactored.indexOf('\n', firstImportIndex);
          refactored = refactored.slice(0, nextNewline + 1) + 
                      importStatements + '\n' + 
                      refactored.slice(nextNewline + 1);
        } else {
          refactored = importStatements + '\n\n' + refactored;
        }
        changes.push(`Added missing imports: ${missingComponents.join(', ')}`);
      }
    }
    
    // 4. Replace var with const/let
    if (code.includes('var ')) {
      const varMatches = code.match(/var\s+\w+\s*=/g);
      if (varMatches) {
        varMatches.forEach(match => {
          const varName = match.match(/var\s+(\w+)/)[1];
          const reassignments = code.match(new RegExp(`${varName}\\s*=`, 'g'));
          if (reassignments && reassignments.length > 1) {
            refactored = refactored.replace(new RegExp(`var\\s+${varName}`, 'g'), `let ${varName}`);
            changes.push(`Changed 'var ${varName}' to 'let' (reassigned)`);
          } else {
            refactored = refactored.replace(new RegExp(`var\\s+${varName}`, 'g'), `const ${varName}`);
            changes.push(`Changed 'var ${varName}' to 'const'`);
          }
        });
      }
    }
    
    // 5. Fix loose equality
    if (code.includes('==') && !code.includes('===')) {
      refactored = refactored.replace(/([^=!])={2}([^=])/g, '$1===$2');
      changes.push('Fixed loose equality (==) to strict equality (===)');
    }
    
    // 6. Fix missing semicolons
    const lines = refactored.split('\n');
    const semicolonAdded = [];
    const refactoredLines = lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed && 
          !trimmed.endsWith(';') && 
          !trimmed.endsWith('{') && 
          !trimmed.endsWith('}') &&
          !trimmed.endsWith(',') &&
          !trimmed.startsWith('//') &&
          !trimmed.match(/^(if|else|for|while|function|class|return)\s/) &&
          trimmed.match(/^(import|export|const|let|var)\s/)) {
        semicolonAdded.push(idx + 1);
        return line + ';';
      }
      return line;
    });
    
    if (semicolonAdded.length > 0) {
      refactored = refactoredLines.join('\n');
      changes.push(`Added missing semicolons (${semicolonAdded.length} places)`);
    }
    
    const explanation = changes.length > 0
      ? `✅ **Fixed Issues:**\n\n${changes.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\n**Your code is now corrected and ready to use!**`
      : 'No issues found! Your code already follows best practices.';
    
    return { code: refactored, explanation };
  },
  
  generateDocs: (code) => {
    return `/**
 * 🤖 Demo Mode - Add Gemini API key for real documentation
 * 
 * Get FREE key: https://makersuite.google.com/app/apikey
 * Add to .env: VITE_AI_API_KEY=your_key
 * 
 * Then AI will generate:
 * - Comprehensive JSDoc comments
 * - Parameter descriptions
 * - Return types
 * - Usage examples
 */`;
  },
};

// Call Gemini API
async function callGemini(prompt) {
  if (!AI_API_KEY) {
    console.warn('⚠️ Gemini API key not found');
    return null;
  }
  
  console.log('🤖 Calling Gemini API...');
  
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Gemini API Error:', errorData);
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Gemini API response received');
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    console.error('❌ Invalid Gemini response structure:', data);
    throw new Error('Invalid response from Gemini');
  } catch (error) {
    console.error('❌ Gemini API Error:', error.message);
    return null;
  }
}

// Call OpenAI API
async function callOpenAI(prompt, systemMessage) {
  if (!AI_API_KEY) return null;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });
    
    const data = await response.json();
    return data.choices?.[0]?.message?.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return null;
  }
}

// Universal AI API call - routes to correct provider
async function callAI(prompt, systemMessage = 'You are a helpful coding assistant.') {
  if (!AI_API_KEY) {
    return null; // Use mock responses
  }
  
  // Combine system message and prompt for Gemini (it doesn't have system role)
  const fullPrompt = AI_PROVIDER === 'gemini' 
    ? `${systemMessage}\n\n${prompt}`
    : prompt;
  
  if (AI_PROVIDER === 'gemini') {
    return await callGemini(fullPrompt);
  } else if (AI_PROVIDER === 'openai') {
    return await callOpenAI(prompt, systemMessage);
  }
  
  return null; // Fallback to mock
}

export const aiService = {
  async completeCode(code, context = '') {
    const prompt = `Complete the following code:\n\n${code}\n\nContext: ${context}`;
    const result = await callAI(prompt, 'You are a code completion assistant. Provide only the code completion, no explanations.');
    return result || mockResponses.complete(code, context);
  },
  
  async explainCode(code) {
    const prompt = `Explain what this code does in simple, clear terms. Break down the logic step by step:\n\n\`\`\`javascript\n${code}\n\`\`\``;
    const result = await callAI(prompt, 'You are an expert code explainer. Provide clear, detailed explanations that help developers understand code.');
    
    if (result) {
      return `🤖 **Gemini AI Explanation:**\n\n${result}`;
    }
    return mockResponses.explain(code);
  },

  async findBugs(code) {
    const prompt = `Analyze this code thoroughly and identify ALL issues including:
- Syntax errors
- Logic bugs
- Performance issues
- Security vulnerabilities
- Missing error handling
- Type issues
- Bad practices

Code to analyze:
\`\`\`javascript
${code}
\`\`\`

For each issue found, provide:
1. Severity (error/warning/info)
2. Line number (if possible)
3. Clear description
4. How to fix it`;

    const result = await callAI(prompt, 'You are an expert code analyzer. Find ALL bugs, issues, and provide actionable fixes.');
    
    if (result) {
      return [{
        severity: 'info',
        message: `🤖 **Gemini AI Bug Analysis:**\n\n${result}`,
      }];
    }
    return mockResponses.findBugs(code);
  },  async refactorCode(code) {
    const prompt = `You are an expert code refactoring assistant. Analyze and improve this code:

CODE TO REFACTOR:
\`\`\`javascript
${code}
\`\`\`

FIX ALL OF THESE ISSUES:
1. Missing or incomplete imports (e.g., "from Home.j" → "from './Home'")
2. Add missing component imports for any used components
3. Convert var to const/let based on reassignment
4. Fix loose equality (== to ===)
5. Add missing semicolons
6. Fix syntax errors
7. Improve code structure and readability
8. Add missing React imports if needed

RESPOND WITH:
1. The complete refactored code (in code block)
2. List all changes made

Be thorough and fix everything!`;

    const result = await callAI(prompt, 'You are an expert code refactoring assistant. Fix ALL issues in the code.');
    
    if (result) {
      try {
        // Extract code from markdown code blocks
        const codeMatch = result.match(/```(?:javascript|jsx?|typescript|tsx?)?\n([\s\S]*?)```/);
        let refactoredCode = codeMatch ? codeMatch[1].trim() : null;
        
        // Extract explanation/changes
        const lines = result.split('\n');
        let explanation = '';
        let inChanges = false;
        
        for (const line of lines) {
          if (line.match(/changes?|fixed|improved/i) || inChanges) {
            inChanges = true;
            if (!line.startsWith('```')) {
              explanation += line + '\n';
            }
          }
        }
        
        if (!explanation) {
          explanation = result.replace(/```[\s\S]*?```/g, '').trim();
        }
        
        // If no clear code block, try to extract code intelligently
        if (!refactoredCode) {
          // Look for lines that look like code
          const possibleCode = result.split('\n').filter(line => 
            line.match(/^(import|const|let|var|function|export|return|if|for|while|\s*\/\/)/i)
          ).join('\n');
          
          if (possibleCode.length > 20) {
            refactoredCode = possibleCode;
          }
        }
        
        if (refactoredCode && refactoredCode.trim().length > 10) {
          return {
            code: refactoredCode,
            explanation: `✅ **Gemini AI Refactoring Complete:**\n\n${explanation.trim() || 'Code has been refactored and improved.'}`,
          };
        }
      } catch (error) {
        console.error('Error parsing Gemini refactor response:', error);
      }
    }
    
    // Fallback to smart mock refactoring
    return mockResponses.refactor(code);
  },
  
  async generateDocumentation(code) {
    const prompt = `Generate comprehensive JSDoc documentation for this code:

\`\`\`javascript
${code}
\`\`\`

Include:
- Full JSDoc comment block
- @description
- @param for all parameters with types
- @returns with type
- @example with usage

Return ONLY the JSDoc comment (no explanatory text).`;

    const result = await callAI(prompt, 'You are a documentation expert. Generate professional JSDoc comments.');
    
    if (result) {
      // Extract code block if present
      const codeMatch = result.match(/```(?:javascript|jsx?)?\n([\s\S]*?)```/);
      const doc = codeMatch ? codeMatch[1].trim() : result.trim();
      
      // If it doesn't start with /**, add the markers
      if (!doc.startsWith('/**')) {
        return `/**\n * 🤖 Gemini AI Generated Documentation:\n * \n${doc.split('\n').map(l => ' * ' + l).join('\n')}\n */`;
      }
      
      return doc;
    }
    return mockResponses.generateDocs(code);
  },
  
  async fixCode(code, errorMessage) {
    const prompt = `Fix this code. Error: ${errorMessage}\n\nCode:\n${code}`;
    const result = await callAI(prompt, 'You are a code debugger. Fix the error and return corrected code.');
    return result || code;
  },
  
  async optimizeCode(code) {
    const prompt = `Analyze this code and provide detailed performance optimization suggestions:

\`\`\`javascript
${code}
\`\`\`

Suggest improvements for:
1. Performance bottlenecks
2. Memory efficiency
3. Algorithm optimization
4. React-specific optimizations (useMemo, useCallback, etc.)
5. Best practices

Be specific with examples.`;

    const result = await callAI(prompt, 'You are a performance optimization expert.');
    
    if (result) {
      return `🤖 **Gemini AI Optimization Analysis:**\n\n${result}`;
    }
    return `🤖 **Demo Mode** - Add Gemini API key for real optimization suggestions.\n\nVisit: https://makersuite.google.com/app/apikey`;
  },
};

// Check if AI is configured
export function isAIConfigured() {
  const configured = !!AI_API_KEY;
  console.log('🔍 isAIConfigured check:', {
    hasKey: configured,
    keyLength: AI_API_KEY.length,
    provider: AI_PROVIDER,
    envVars: {
      VITE_AI_API_KEY: import.meta.env.VITE_AI_API_KEY ? 'SET' : 'NOT SET',
      VITE_AI_PROVIDER: import.meta.env.VITE_AI_PROVIDER
    }
  });
  return configured;
}

// Get AI status message
export function getAIStatus() {
  if (isAIConfigured()) {
    const provider = AI_PROVIDER === 'gemini' ? 'Google Gemini' : 
                     AI_PROVIDER === 'openai' ? 'OpenAI GPT' : 'AI API';
    return `AI features powered by ${provider}`;
  }
  return 'AI features running in demo mode (add API key for full functionality)';
}

// Get current AI provider
export function getAIProvider() {
  return AI_PROVIDER || 'mock';
}
