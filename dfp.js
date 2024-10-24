const fs = require('fs');

/**
 * Parses a UTF-8 encoded text file, performs transformations on the data, and writes the results to an output file.
 * 
 * The function expects two mandatory parameters: the input file path and the output file path. An optional delimiter
 * can be provided, with the default set to a semicolon (';').
 * 
 * It processes each line of the input file by reversing the order of the columns (sentiment;review) and trimming 
 * the review to 20 characters. The output is saved to the specified output file.
 * 
 * If the input file does not exist, the function returns -1.
 * 
 * @param {string} inputFile - The path to the input file.
 * @param {string} outputFile - The path to the output file.
 * @param {string} [delimiter=';'] - The delimiter used to separate columns in the input file. Defaults to ';'.
 * @returns {number} - The total number of records exported, or -1 if the input file does not exist.
 */
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