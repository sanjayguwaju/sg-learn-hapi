const adminController = require('../../controllers/admin/admin-controller');

const adminRoutes = [
  {
    method: 'POST',
    path: '/admin/users',
    handler: adminController.createUser,
  },
  {
    method: 'GET',
    path: '/admin/users',
    handler: adminController.getAllUsers,
  },
  {
    method: 'GET',
    path: '/admin/users/{id}',
    handler: adminController.getUserById,
  },
  {
    method: 'GET',
    path: '/admin/users/username/{id}',
    handler: adminController.getOnlyUsername,
  }
];

module.exports = adminRoutes;
