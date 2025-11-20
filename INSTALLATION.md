# 🚀 Installation & Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation Steps

### Step 1: Install Dependencies

Navigate to the frontend directory and install new packages:

```bash
cd frontend
npm install
```

This will install the new dependencies:
- `prettier` (v3.1.1) - Code formatting engine
- `file-saver` (v2.0.5) - File download utilities
- `jszip` (v3.10.1) - ZIP file operations

### Step 2: Verify Installation

Check that all packages installed correctly:

```bash
npm list prettier file-saver jszip
```

Expected output:
```
├── prettier@3.1.1
├── file-saver@2.0.5
└── jszip@3.10.1
```

### Step 3: Start Development Server

```bash
npm run dev
```

The application should start at `http://localhost:5173` (or another port if 5173 is busy).

## 🧪 Testing New Features

### 1. Code Formatting
- Open any JavaScript file
- Press `Ctrl+Shift+P` or click "Format" button
- Code should be automatically formatted

### 2. Search & Replace
- Press `Ctrl+F`
- Search modal should appear
- Try searching for text in your code

### 3. Code Snippets
- Click the snippet icon (📄) in editor toolbar
- Browse available snippets
- Try inserting a React snippet

### 4. Keyboard Shortcuts
- Press `Ctrl+Shift+K`
- Shortcuts panel should open
- Review all available shortcuts

### 5. File Upload
- Click upload icon in sidebar
- Select one or more files
- Files should appear in file list

### 6. File Download
- Hover over any file in sidebar
- Download button should appear
- Click to download file

### 7. Console
- Press `Ctrl+Shift+L`
- Console panel should open at bottom
- Try `console.log('test')` in your code

### 8. Version History
- Click "History" in navbar
- Click "Create Snapshot"
- Snapshot should appear in list

### 9. ZIP Export
- Click "Export" in navbar
- Click "Download ZIP"
- ZIP file should download

### 10. ZIP Import
- Click "Upload ZIP" in sidebar
- Select a ZIP file
- Files should be extracted and added

## 🔧 Troubleshooting

### Issue: Dependencies won't install

**Solution 1**: Clear npm cache
```bash
npm cache clean --force
npm install
```

**Solution 2**: Delete node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Prettier not working

**Check**:
1. Is the file type supported? (JS, JSX, TS, CSS, HTML, JSON)
2. Are there syntax errors in the file?
3. Check browser console for error messages

**Solution**: Ensure prettier is installed
```bash
npm install prettier --save
```

### Issue: File upload not working

**Check**:
1. File type is supported
2. File size is reasonable (< 1MB recommended)
3. Browser localStorage has space

**Solution**: Try uploading smaller files or fewer files at once

### Issue: Console not showing logs

**Check**:
1. Press `Ctrl+Shift+L` to toggle console
2. Check if filter is set to "All"
3. Try adding a `console.log()` in your code

**Solution**: Refresh the page and try again

### Issue: Snapshots not saving

**Check**:
1. Is auto-save enabled? (Settings menu)
2. Browser localStorage available?
3. Is project saved?

**Solution**: 
```bash
# Clear localStorage for fresh start
# In browser console:
localStorage.clear()
```

## 📦 Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 🔐 Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

## 💾 Storage Requirements

- **Base Application**: ~5MB
- **Per Project**: ~100KB - 5MB (depending on files)
- **Snapshots**: ~100KB each
- **localStorage limit**: ~10MB total (browser dependent)

## 🚨 Known Limitations

1. **File Upload Size**: Large files may cause performance issues
2. **Snapshot Limit**: Keep < 20 snapshots per project for best performance
3. **localStorage**: Limited to ~10MB total across all projects
4. **Prettier**: Some edge cases may not format perfectly

## 📱 Mobile Support

Most features work on mobile browsers, but keyboard shortcuts are desktop-only. Touch interactions supported for:
- File management
- Code editing
- Button clicks
- Modal interactions

## 🔄 Updates

To update dependencies in the future:

```bash
npm update
```

To update specific packages:

```bash
npm update prettier file-saver jszip
```

## 🆘 Getting Help

If you encounter issues:

1. Check browser console for errors (F12)
2. Verify all dependencies installed correctly
3. Try clearing cache: `Ctrl+Shift+Delete`
4. Review error messages in Console panel
5. Check `NEW_FEATURES.md` for detailed documentation

## ✅ Success Checklist

After installation, verify:

- [ ] `npm install` completed without errors
- [ ] Dev server starts successfully
- [ ] Code formatting works (Ctrl+Shift+P)
- [ ] Search & Replace opens (Ctrl+F)
- [ ] Code snippets modal opens
- [ ] Keyboard shortcuts panel opens (Ctrl+Shift+K)
- [ ] File upload works
- [ ] File download works
- [ ] Console toggles (Ctrl+Shift+L)
- [ ] Snapshots can be created
- [ ] ZIP export works

## 🎉 Ready to Go!

Once all checks pass, you're ready to use your enhanced React IDE!

---

**Need more help?** Check `NEW_FEATURES.md` for detailed feature documentation.
