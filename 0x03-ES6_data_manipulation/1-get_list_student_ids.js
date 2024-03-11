export default function getListStudentIds(studentsList) {
  if (!Array.isArray(studentsList)) {
    return [];
  }
  const ids = studentsList.map((obj) => obj.id);

  return ids;
}
