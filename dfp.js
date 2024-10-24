const fs = require('fs');

function parseFile(inputFilePath, outputFilePath) {
    let data;

    // Reading the file
    try {
        data = fs.readFileSync(inputFilePath, 'utf8');
    } catch (error) {
        return -1;
    }

    // Split lines by newline character
    let lines = data.split(/\r?\n/);

    // Ignore the first line (header)
    lines = lines.slice(1);

    let transformedData = [];

    // Process each line
    lines.forEach(line => {
        let [review, sentiment] = line.split(';');

        // Only process if both columns exist
        if (review && sentiment) {
            // Trim review to 20 characters
            review = review.trim().slice(0, 20);
            sentiment = sentiment.trim();

            // Push swapped data to array
            transformedData.push(`${sentiment};${review}`);
        }
    });

    // Writing the transformed data back to a new file
    try {
        fs.writeFileSync(outputFilePath, transformedData.join('\n'), 'utf8');
    } catch (error) {
        return -1;
    }

    return transformedData.length;
}


// Example calls to the function for testing purposes
console.log(parseFile('./datafile.csv', './outputfile.csv')); // Expected to return the total number of records exported
console.log(parseFile('./doesnotexist.csv', './outputfile.csv')); // Expected to return -1 if file doesn't exist
console.log(parseFile('./doesnotexist.csv', './outputfile.csv', ',')); // function should return the value: -1

// Leave this code here for the automated tests
module.exports = {
  parseFile,
}