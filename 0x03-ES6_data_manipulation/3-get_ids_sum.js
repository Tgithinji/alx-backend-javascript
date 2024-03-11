export default function getStudentIdsSum(studentList) {
  return studentList.reduce(
    (acc, curr) => acc + curr.id,
    0,
  );
}
