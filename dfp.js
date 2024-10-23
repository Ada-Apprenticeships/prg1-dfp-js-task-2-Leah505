const fs = require('fs');

function parseFile(inputFile, outputFile, delimiter = ';') {
     // Check if the input file exists
     if (!fs.existsSync(inputFile)) {
        return -1;
    }

    // Read the input file with the correct encoding
    const data = fs.readFileSync(inputFile, 'utf8');

    // Split the file data into lines (each review + sentiment)
    let lines = data.split('\n');

    // Initialize an empty array to hold the transformed data
    let transformedData = [];

    // Process each line
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        if (line === "") continue; // Skip empty lines

        // Split the line by the delimiter (default is semicolon)
        let columns = line.split(delimiter);

        let review = columns[0].trim();   // The review text
        let sentiment = columns[1].trim(); // The sentiment

        // Trim the review to 20 characters
        let trimmedReview;

        if (review.length > 20) {
            review.slice(0, 20)} else {
                review;
            }

        // Swap the columns and join them with the delimiter
        let transformedLine = `${sentiment};${trimmedReview}`;

        // Add the transformed line to the new data
        transformedData.push(transformedLine);
    }

    // Write the output data to the file
    // First, remove the existing file if it exists
    if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
    }

    // Write the transformed data to the output file, line by line
    fs.writeFileSync(outputFile, transformedData.join('\n'), 'utf8');

    // Return the number of records processed
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