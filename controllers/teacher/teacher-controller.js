const User = require('../../services/user-service').User;

async function createUser(request, h) {
  try {
    const { username, password, role } = request.payload;
    const newUser = new User({ username, password, role });
    await newUser.save();
    return h.response('User created successfully').code(201);
  } catch (err) {
    console.log('Error creating user:', err);
    return h.response('Error creating user').code(500);
  }
}

async function getAllUsers(request, h) {
  try {
    const users = await User.find();
    return h.response(users);
  } catch (err) {
    console.log('Error retrieving users:', err);
    return h.response('Error retrieving users').code(500);
  }
}

// Add more controller methods for admin operations

module.exports = {
  createUser,
  getAllUsers,
  // Export other admin controller methods
};
