const User = require('../models/users/user-model');

async function createUser(username, password, role) {
  try {
    const newUser = new User({ username, password, role });
    await newUser.save();
    return newUser;
  } catch (err) {
    console.log('Error creating user:', err);
    throw err;
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log('Error retrieving user:', err);
    throw err;
  }
}

async function getUserByUsername(username) {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (err) {
    console.log('Error retrieving user:', err);
    throw err;
  }
}

async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    console.log('Error retrieving users:', err);
    throw err;
  }
}

async function deleteUserById(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (err) {
    console.log('Error deleting user:', err);
    throw err;
  }
}

async function updateUserById(id, updatedUserData) {
  try {
    const user = await User.findByIdAndUpdate(id, updatedUserData, { new: true });
    return user;
  } catch (err) {
    console.log('Error updating user:', err);
    throw err;
  }
}
async function getOnlyUsername(id) {
  try {
    // const user = await User.findById(id).select('username');
    // const user = await User.find({id}).exec();
    const usernames = ['Aman', 'Rjlfgsjdam'];
    const user = await User.find(
      { username: { $in: usernames } }, 
      { _id: 0, username: 1 },
      
      );
    // const user = await User.find({}, { _id: 0, username: 1 })
    return user;
  } catch (err) {
    console.log('Error retrieving user:', err);
    throw err;
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
