const path = require('path');
const { readdir } = require('fs/promises');
const { createReadStream, createWriteStream } = require('fs');

function CompileStyles() {
  const inputFolder = path.join(__dirname, 'styles');
  const output = path.join(__dirname, 'project-dist');
  let writeStream = createWriteStream(path.resolve(output, 'bundle.css'));

  const readSyleDir = async (input) => {
    const files = await readdir(input, { withFileTypes: true });
    files.forEach(file => {
      if (file.isFile) {
        const filePath = path.resolve(inputFolder, file.name);
        if (path.extname(filePath) === '.css') {
          const readStream = createReadStream(filePath);
          readStream.pipe(writeStream);
        }
      }
    });
  };
  readSyleDir(inputFolder);
}
CompileStyles();