# 🤖 AI Features Setup Guide

## Quick Setup (5 minutes)

### Option 1: Google Gemini (FREE & Recommended) 🌟

1. **Get your FREE Gemini API key**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with your Google account
   - Click **"Create API Key"**
   - Copy your API key

2. **Add to your project**
   ```bash
   # In frontend folder, create .env file
   cd frontend
   copy .env.example .env
   ```

3. **Edit `.env` file:**
   ```env
   VITE_AI_PROVIDER=gemini
   VITE_AI_API_KEY=YOUR_GEMINI_API_KEY_HERE
   ```

4. **Restart your dev server:**
   ```bash
   npm run dev
   ```

✅ **Done!** AI features are now powered by Google Gemini!

---

### Option 2: OpenAI (Paid)

1. **Get OpenAI API key**
   - Visit: https://platform.openai.com/api-keys
   - Create an account and add credits
   - Create a new API key

2. **Edit `.env` file:**
   ```env
   VITE_AI_PROVIDER=openai
   VITE_AI_API_KEY=YOUR_OPENAI_API_KEY_HERE
   ```

3. **Restart dev server**

---

## 🎯 AI Features Available

Once configured, you can use AI to:

### 1. **Explain Code** 📖
- Select code → Press `Ctrl+Shift+A` → Click "Explain"
- Get detailed explanations of what your code does

### 2. **Find Bugs** 🐛
- AI analyzes your code for errors, warnings, and improvements
- Shows severity levels (error, warning, info)
- Provides fix suggestions

### 3. **Refactor Code** ✨
- Automatically fixes common issues:
  - Missing imports
  - Incomplete imports (like `from Home.j`)
  - var → const/let conversion
  - Loose equality (== → ===)
  - Missing semicolons
  - Code structure improvements

### 4. **Generate Documentation** 📝
- Creates JSDoc comments for functions/components
- Includes parameter descriptions and examples

### 5. **Optimize Code** ⚡
- Suggests performance improvements
- Identifies bottlenecks
- Recommends best practices

---

## 🧪 Testing AI Features

### Without API Key (Demo Mode)
- AI features work with mock responses
- Good for testing the UI
- Limited accuracy

### With API Key (Real AI)
- Powered by Google Gemini or OpenAI
- Accurate code analysis
- Real-time suggestions
- Context-aware responses

---

## 🎨 How to Use

1. **Open any file** in the IDE
2. **Select code** you want to analyze
3. Press **`Ctrl+Shift+A`** (or click AI button in toolbar)
4. Choose an AI action:
   - **Explain** - Understand the code
   - **Find Bugs** - Detect issues
   - **Refactor** - Fix and improve code
   - **Generate Docs** - Add documentation
   - **Optimize** - Improve performance

---

## 💡 Tips

- **Gemini is FREE** and works great for most tasks
- Select specific code for faster, more accurate results
- Use **Refactor** to auto-fix common coding mistakes
- AI works best with complete code snippets

---

## ⚙️ Environment Variables

```env
# Required for AI features
VITE_AI_PROVIDER=gemini          # or 'openai'
VITE_AI_API_KEY=your_key_here

# Optional
VITE_API_URL=http://localhost:5000
```

---

## 🔒 Security Notes

- Never commit `.env` file to Git
- Keep your API keys secret
- Use environment variables in production
- `.env` is already in `.gitignore`

---

## 🆘 Troubleshooting

### AI not working?
1. Check if `.env` file exists in `frontend/` folder
2. Verify API key is correct (no extra spaces)
3. Restart dev server after adding key
4. Check browser console for errors

### Still in demo mode?
- Make sure `.env` file has `VITE_` prefix
- Vite requires restart after `.env` changes
- API key must be valid

### API errors?
- **Gemini**: Check quota at https://makersuite.google.com
- **OpenAI**: Verify credits and billing

---

## 📊 API Comparison

| Feature | Gemini (FREE) | OpenAI (Paid) |
|---------|---------------|---------------|
| Cost | FREE | ~$0.002/request |
| Quality | Excellent | Excellent |
| Speed | Fast | Fast |
| Code Analysis | ✅ | ✅ |
| Rate Limits | Generous | Based on plan |

**Recommendation**: Start with Gemini (it's FREE!)

---

## 🚀 Next Steps

1. Get your Gemini API key (FREE)
2. Add it to `.env` file
3. Restart dev server
4. Try AI features with real code!

Happy coding! 🎉
