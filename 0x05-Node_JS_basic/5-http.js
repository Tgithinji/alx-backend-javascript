const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Read the file asynchronously
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      // Split data into lines and filter out any empty lines
      const lines = data.split('\n').filter((line) => line.trim() !== '');

      // Check if there are any students (excluding the header line)
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      // Extract header and data lines
      const headers = lines[0].split(',');
      const studentData = lines.slice(1);

      // Create a dictionary to track the number of students per field
      const studentsByField = {};

      studentData.forEach((line) => {
        const studentInfo = line.split(',');

        // Ensure the line has the correct number of columns
        if (studentInfo.length === headers.length) {
          const field = studentInfo[3];
          const firstName = studentInfo[0];

          if (!studentsByField[field]) {
            studentsByField[field] = [];
          }
          studentsByField[field].push(firstName);
        }
      });

      // Prepare the output message
      let output = `Number of students: ${
        Object.values(studentsByField).reduce((sum, students) => sum + students.length, 0)
      }\n`;

      // Display the number of students and their names by field
      for (const [field, students] of Object.entries(studentsByField)) {
        output += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      }

      resolve(output.trim());
    });
  });
}

// Create the HTTP server
const app = http.createServer((req, res) => {
  // Set the response header content type to plain text
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    // Get the path to the CSV file from the command line argument
    const databasePath = process.argv[2];

    if (!databasePath) {
      res.end('Cannot load the database');
      return;
    }

    countStudents(databasePath)
      .then((message) => {
        res.end(`This is the list of our students\n${message}`);
      })
      .catch((error) => {
        res.end(error.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

// The server listens on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the app
module.exports = app;
