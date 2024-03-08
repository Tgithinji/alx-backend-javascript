export default class HolbertonCourse {
  constructor(name, length, students) {
    // verify the type of attributes
    if (typeof name !== 'string') {
      throw TypeError('Name must be a string');
    }
    if (typeof length !== 'number') {
      throw TypeError('Length must be a number');
    }
    if (!Array.isArray(students)
      || students.every((student) => typeof student !== 'string')) {
      throw TypeError('Students must be an array of strings');
    }

    // initialize the object
    this._name = name;
    this._length = length;
    this._students = students;
  }

  // getters for each attribute
  // name
  get name() {
    return this._name;
  }

  // for length
  get length() {
    return this._length;
  }

  // for students
  get students() {
    return this._students;
  }

  // settters for each attribute
  set name(value) {
    if (typeof value !== 'string') {
      throw TypeError('Name must be a string');
    }
    this._name = value;
  }

  set length(value) {
    if (typeof value !== 'number') {
      throw TypeError('Length must be a number');
    }
    this._length = value;
  }

  set students(value) {
    if (!Array.isArray(value)
      || value.every((student) => typeof student !== 'string')) {
      throw TypeError('Students must be an array of strings');
    }
    this._students = value;
  }
}
