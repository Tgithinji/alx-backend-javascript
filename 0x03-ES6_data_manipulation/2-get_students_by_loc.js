export default function getStudentsByLocation(studentsList, city) {
  return studentsList.filter((obj) => obj.location === city);
}
