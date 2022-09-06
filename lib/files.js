import fs from 'fs';
import path from 'path';

const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd());
};

const directoryExists = (filePath) => {
  return fs.existsSync(filePath);
};

const files = {
  getCurrentDirectoryBase,
  directoryExists,
};

export default files;
