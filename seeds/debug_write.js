const fs = require('fs');
const path = require('path');
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
try {
    fs.writeFileSync(path.join(__dirname, 'debug_output.txt'), 'Debugging write permissions...');
    console.log('Successfully wrote file.');
} catch (e) {
    console.error('Error writing file:', e);
}
