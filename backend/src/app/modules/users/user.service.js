import { User } from "./user.model.js";

const getUsers = async () => {
  const users = await User.find();
  return users;
};

const createUser = async (email, name) => {
  const filter = { email: email };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      name: name,
      email: email,
    },
  };
  const createdUser = await User.updateOne(filter, updateDoc, options);

  return createdUser;
};

const getUser = async (id) => {
  const user = await User.findById(id);
  return user;
};

const updateRole = async (id, role) => {
  const filter = { _id: id };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      role: role,
    },
  };
  const updatedUser = await User.updateOne(filter, updateDoc, options);
  return updatedUser;
};

const getRole = async (email) => {
  const userRole = await User.findOne({ email: email });
  return userRole;
};

const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

export default {
  getUsers,
  createUser,
  getUser,
  updateRole,
  getRole,
  deleteUser,
};
