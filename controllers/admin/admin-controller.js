const userService = require('../../services/user-service');

async function createUser(request, h) {
  try {
    const { username, password, role } = request.payload;

    const gValue = request.query.g;
    console.log(gValue);
    
    const newUser = await userService.createUser(username, password, role);
    return h.response('User created successfully').code(201);
  } catch (err) {
    console.log('Error creating user:', err);
    return h.response('Error creating user').code(500);
  }
}

async function getUserById(request, h) {
  try {
    const { id } = request.params;
    const user = await userService.getUserById(id);
    if (user) {
      return h.response(user);
    } else {
      return h.response('User not found').code(404);
    }
  } catch (err) {
    console.log('Error retrieving user:', err);
    return h.response('Error retrieving user').code(500);
  }
}

async function getUserByUsername(request, h) {
  try {
    const { username } = request.params;
    const user = await userService.getUserByUsername(username);
    if (user) {
      return h.response(user);
    } else {
      return h.response('User not found').code(404);
    }
  } catch (err) {
    console.log('Error retrieving user:', err);
    return h.response('Error retrieving user').code(500);
  }
}


async function getAllUsers(request, h) {
  try {
    const users = await userService.getAllUsers();
    return h.response(users);
  } catch (err) {
    console.log('Error retrieving users:', err);
    return h.response('Error retrieving users').code(500);
  }
}

async function deleteUserById(request, h) {
  try {
    const { id } = request.params;
    const user = await userService.deleteUserById(id);
    if (user) {
      return h.response('User deleted successfully').code(200);
    } else {
      return h.response('User not found').code(404);
    }
  } catch (err) {
    console.log('Error deleting user:', err);
    return h.response('Error deleting user').code(500);
  }
}


async function updateUserById(request, h) {
  try {
    const { id } = request.params;
    const { username, password, role } = request.payload;
    const updatedUserData = { username, password, role };
    const user = await userService.updateUserById(id, updatedUserData);
    if (user) {
      return h.response(user);
    } else {
      return h.response('User not found').code(404);
    }
  } catch (err) {
    console.log('Error updating user:', err);
    return h.response('Error updating user').code(500);
  }
}

async function getOnlyUsername(request, h) {
  try {
    const { id } = request.params;
    const user = await userService.getOnlyUsername(id);
    if (user) {
      return h.response(user);
    } else {
      return h.response('User not found').code(404);
    }
  } catch (err) {
    console.log('Error retrieving user:', err);
    return h.response('Error retrieving user').code(500);
  }
}






module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUserById,
  getOnlyUsername
};
