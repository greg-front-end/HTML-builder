const fs = require('fs');
const path = require('path');
const readStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8');

let data = '';
readStream.on('data', function (chunk) {
  data += chunk;
}).on('end', function () {
  console.log(data);
});