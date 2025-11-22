const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const files = [
    '../../True United Party CONSTITUTION.docx',
    '../../True United Party Platform -Manifesto.docx'
];

let output = '';

files.forEach(file => {
    try {
        const filePath = path.join(__dirname, file);
        if (!fs.existsSync(filePath)) {
            output += `File not found: ${filePath}\n`;
            return;
        }
        const zip = new AdmZip(filePath);
        const zipEntries = zip.getEntries();
        const docEntry = zipEntries.find(entry => entry.entryName === 'word/document.xml');
        
        if (docEntry) {
            let xml = docEntry.getData().toString('utf8');
            // Simple regex to strip XML tags and get text
            // This is a crude way to read DOCX but works for extracting text
            const text = xml.replace(/<w:p>/g, '\n').replace(/<[^>]+>/g, '');
            output += `\n\n--- CONTENT OF ${file} ---\n\n`;
            output += text;
        } else {
            output += `Could not find document.xml in ${file}\n`;
        }
    } catch (e) {
        output += `Error reading ${file}: ${e.message}\n`;
    }
});

fs.writeFileSync(path.join(__dirname, 'extracted_content.txt'), output);
console.log('Done extraction');
