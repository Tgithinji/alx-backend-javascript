const http = require('http');
const fs = require('fs');

// Function to count students (from the previous task)
function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const headers = lines[0].split(',');
      const studentData = lines.slice(1);

      const studentsByField = {};

      studentData.forEach((line) => {
        const studentInfo = line.split(',');
        if (studentInfo.length === headers.length) {
          const field = studentInfo[3];
          const firstName = studentInfo[0];

          if (!studentsByField[field]) {
            studentsByField[field] = [];
          }
          studentsByField[field].push(firstName);
        }
      });

      let output = `Number of students: ${
        Object.values(studentsByField).reduce((sum, students) => sum + students.length, 0)
      }\n`;

      for (const [field, students] of Object.entries(studentsByField)) {
        output += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      }

      resolve(output.trim());
    });
  });
}

// Create HTTP server
const app = http.createServer((req, res) => {
  if (req.url === '/') {
    // Root URL, respond with Hello Holberton School!
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    // Students URL, get the student list
    const databasePath = process.argv[2]; // Get the CSV file path passed as a command-line argument

    countStudents(databasePath)
      .then((message) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`This is the list of our students\n${message}`);
      })
      .catch((error) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(error.message);
      });
  } else {
    // Handle other URLs
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;
