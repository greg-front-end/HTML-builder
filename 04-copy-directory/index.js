const path = require('path');
const fs = require('fs');

function CopyFiles() {
  let fromDir = path.join(__dirname, 'files');
  let toDir = path.resolve(__dirname, 'files-copy');
  const createDir = (dir) => {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) throw err;
    });
  };
  const isFolderExist = (dir) => {
    fs.access(dir, (err) => {
      if (err) {
        copyFiles(fromDir, toDir);
      } else {
        rmDir(toDir);
      }
    });
  };
  const rmDir = (dir) => {
    fs.rm(dir, { recursive: true }, (err) => {
      if (err) throw err;
      copyFiles(fromDir, toDir);
    });
  };
  const copyFiles = (from, to) => {
    createDir(to);
    fs.readdir(from, { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        if (file.isFile()) {
          fs.copyFile(path.join(from, file.name), path.join(to, file.name), (err) => { if (err) throw err; });
        } else {
          copyFiles(path.join(from, file.name), path.join(to, file.name));
        }
      });
    });
  };
  isFolderExist(toDir);
}
CopyFiles();
