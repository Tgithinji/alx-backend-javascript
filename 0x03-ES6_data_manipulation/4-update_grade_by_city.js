export default function updateStudentGradeByCity(studentList, city, newGrades) {
  // filter students based on location
  const students = studentList.filter((student) => student.location === city);

  // join arrays based on common ids
  const arrWithGrades = students.map((student) => {
    const grades = newGrades.find((grade) => grade.studentId === student.id);

    // return a new object with combined propertied
    return {
      ...student,
      grade: grades ? grades.grade : 'N/A',
    };
  });

  return arrWithGrades;
}
