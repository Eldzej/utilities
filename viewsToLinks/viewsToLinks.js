const fs = require('fs');
const path = require('path');

const rootDir = process.argv[2];
const urlPrefix = process.argv[3] || '';

if(typeof rootDir !== 'undefined' && rootDir.length > 0) {
    buildLinkList(rootDir);
} else {
    console.error('You must set a path to the pages directory')
}

function buildLinkList(rootDir) {
    function findJsonFiles(dir, subdir = '') {
        let results = [];
        fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                const subfolder = path.basename(filePath);
                results = results.concat(findJsonFiles(filePath, `${subdir}${subfolder}/`));
            } else if (path.extname(file) === '.json') {
                results.push(`${subdir}${file}`);
            }
        });
        return results;
    }

    const jsonFiles = findJsonFiles(rootDir);


    const titles = [];
    jsonFiles.forEach(file => {
        const jsonData = JSON.parse(fs.readFileSync(path.join(rootDir, file)));
        const title = jsonData.title ? jsonData.title : (jsonData.page?.title || '');
        titles.push({ title, file });
    });

    let outputString = ''

    outputString = '<ul>\n'
    titles.forEach(({ title, file }) => {
        const linkText = `<a href="${urlPrefix}${file.replace('.json', '.html')}" target="_blank">${title}</a>`;
        outputString += `    <li>${linkText}</li>\n`;
    });
    outputString += '</ul>'

    fs.writeFile('links.txt', outputString, function(err) {
        if(err) {
            return console.error(err);
        }
        console.log("The file was saved!");
    });
}
