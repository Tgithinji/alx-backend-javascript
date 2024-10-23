const express = require('express');
const fs = require('fs');

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

// Express app
const app = express();

// Root route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Students route
app.get('/students', (req, res) => {
  const databasePath = process.argv[2];

  countStudents(databasePath)
    .then((message) => {
      res.setHeader('Content-Type', 'text/plain');
      res.send(`This is the list of our students\n${message}`);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;
