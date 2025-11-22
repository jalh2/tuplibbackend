const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

console.log('Start extraction...');

const files = [
    { name: 'Constitution', path: '../../True United Party CONSTITUTION.docx' },
    { name: 'Manifesto', path: '../../True United Party Platform -Manifesto.docx' }
];

files.forEach(fileInfo => {
    try {
        const filePath = path.join(__dirname, fileInfo.path);
        console.log(`\n--- START ${fileInfo.name} ---`);
        
        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${filePath}`);
            return;
        }

        const zip = new AdmZip(filePath);
        const zipEntries = zip.getEntries();
        const docEntry = zipEntries.find(entry => entry.entryName === 'word/document.xml');
        
        if (docEntry) {
            const xml = docEntry.getData().toString('utf8');
            const paragraphs = xml.split('<w:p ');
            
            paragraphs.forEach(p => {
                const textMatch = p.match(/<w:t[^>]*>([^<]*)<\/w:t>/g);
                if (textMatch) {
                    const line = textMatch.map(t => t.replace(/<[^>]+>/g, '')).join('');
                    if (line.trim()) {
                        console.log(`[${fileInfo.name}] ${line.trim()}`);
                    }
                }
            });
        } else {
            console.log(`No document.xml found in ${fileInfo.name}`);
        }
    } catch (e) {
        console.log(`Error processing ${fileInfo.name}: ${e.message}`);
    }
});

