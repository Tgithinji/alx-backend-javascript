// full_server/utils.js
import fs from 'fs/promises';

export default async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    const studentGroups = {};

    lines.slice(1).forEach((line) => {
      const [firstName, , , field] = line.split(',');
      if (field) {
        if (!studentGroups[field]) {
          studentGroups[field] = [];
        }
        studentGroups[field].push(firstName);
      }
    });

    return studentGroups;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
