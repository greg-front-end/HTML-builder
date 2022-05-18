const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = process;
const file = fs.createWriteStream(path.resolve(__dirname, 'text.txt'), 'utf-8');

process.stdin.resume();
process.stdin.setEncoding('utf8');

output.write('Write some text pls..\n');
input.on('data', data => {
  if (data.toString().trim() === 'exit' || data.toString().trim() === 'exit\n') {
    output.write('Thank you for testing me, have a good days!\n');
    process.exit();
  }
  const text = data.toString();
  file.write(text);
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));
});

function exitHandler(options, exitCode) {
  if (exitCode || exitCode === 0) console.log('Thank you for testing me, have a good days!\n');
  if (options.exit) process.exit();
}