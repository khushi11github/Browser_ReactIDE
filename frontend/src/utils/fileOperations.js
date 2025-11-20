import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Download a single file
export function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename.replace('/', ''));
}

// Download all files as ZIP
export async function downloadAllFilesAsZip(files, projectName = 'project') {
  const zip = new JSZip();

  Object.entries(files).forEach(([path, file]) => {
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    zip.file(cleanPath, file.code);
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${projectName}.zip`);
}

// Read file from user's computer
export function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

// Handle multiple file uploads
export async function handleMultipleFileUpload(fileList) {
  const filesData = {};

  for (const file of fileList) {
    try {
      const content = await readFile(file);
      const path = `/${file.name}`;
      filesData[path] = { code: content };
    } catch (error) {
      console.error(`Error reading file ${file.name}:`, error);
    }
  }

  return filesData;
}

// Upload from ZIP file
export async function uploadFromZip(zipFile) {
  const zip = await JSZip.loadAsync(zipFile);
  const filesData = {};

  for (const [path, zipEntry] of Object.entries(zip.files)) {
    if (!zipEntry.dir) {
      try {
        const content = await zipEntry.async('text');
        // Ensure path is a string and starts with /
        const cleanPath = typeof path === 'string' ? (path.startsWith('/') ? path : `/${path}`) : `/${String(path)}`;
        filesData[cleanPath] = { code: content };
      } catch (error) {
        console.error(`Error reading file ${path} from ZIP:`, error);
      }
    }
  }

  return filesData;
}
