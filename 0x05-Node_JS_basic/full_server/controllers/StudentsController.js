// full_server/controllers/StudentsController.js
import { readDatabase } from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const filePath = process.argv[2];
      const students = await readDatabase(filePath);

      let response = 'This is the list of our students\n';
      Object.keys(students).sort().forEach((field) => {
        response += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
      });

      res.status(200).send(response.trim());
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const filePath = process.argv[2];
      const students = await readDatabase(filePath);
      if (!students[major]) {
        res.status(404).send('No students found for the specified major');
        return;
      }

      const response = `List: ${students[major].join(', ')}`;
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default StudentsController;
