const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const splitData = data.split('\n').filter((dat) => dat.trim() !== '');

    if (splitData <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const headers = splitData[0].split(',');
    const studentData = splitData.slice(1);

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
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
