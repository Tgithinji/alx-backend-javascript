const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const rows = data.split('\n').filter((row) => row.trim() !== '');

      if (rows.length <= 1) {
        console.log('Number of students: 0');
        resolve();
        return;
      }

      const headers = rows[0].split(',');
      const studentData = rows.slice(1);

      const studentsPerField = {};

      studentData.forEach((line) => {
        const studentInfo = line.split(',');

        if (studentInfo.length === headers.length) {
          const field = studentInfo[3];
          const fName = studentInfo[0];

          if (!studentsPerField[field]) {
            studentsPerField[field] = [];
          }
          studentsPerField[field].push(fName);
        }
      });

      const totalStudents = Object.values(studentsPerField).reduce(
        (sum, students) => sum + students.length,
        0,
      );
      console.log(`Number of students: ${totalStudents}`);
      for (const [field, students] of Object.entries(studentsPerField)) {
        console.log(
          `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`,
        );
      }

      resolve();
    });
  });
}

module.exports = countStudents;