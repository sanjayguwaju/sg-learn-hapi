const StudentController = require('../../controllers/student/student-controller');

const studentRoutes = [
  {
    method: 'POST',
    path: '/students/results',
    handler: StudentController.createResult,
  },
  {
    method: 'GET',
    path: '/students/results',
    handler: StudentController.getResults,
  },
];

module.exports = studentRoutes;
