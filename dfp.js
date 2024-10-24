const fs = require('fs');

function parseFile(inputFile, outputFile, delimiter = ';') {
    if (!fs.existsSync(inputFile)) {
        return -1;
    }

    if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
    }

    const inputContent = fs.readFileSync(inputFile, "utf-8");
    const lines = inputContent.trim().split('\n').slice(1);
    let recordCount = 0;

    for (const line of lines) {
        const columns = line.split(delimiter).map(col => col.trim());

        if (columns.length === 2) {
            const review = columns[0].substring(0, 20);
            const sentiment = columns[1];
            fs.appendFileSync(outputFile, `${sentiment}${delimiter}${review}\n`, "utf-8");
            recordCount++;
        }
    }

    return recordCount;
}

// Code for the automated tests
module.exports = {
  parseFile,
}