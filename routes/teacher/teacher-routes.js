const teacherController = require('../../controllers/teacher/teacher-controller');

const teacherRoutes = [
  {
    method: 'POST',
    path: '/teacher/results',
    handler: teacherController.createResult,
  },
  {
    method: 'GET',
    path: '/teacher/results',
    handler: teacherController.getAllResults,
  },
  // Add more routes for teacher operations
];

module.exports = teacherRoutes;
