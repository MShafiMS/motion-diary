import userService from "./user.service.js";

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({
      success: true,
      message: "Users loaded successfully!!",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to load user!! Error:${error}`,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, name, photoUrl } = req.body;
    const user = await userService.createUser(email, name, photoUrl);
    res.status(200).json({
      success: true,
      message: "Users created successfully!!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to create user!! Error:${error}`,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    res.status(200).json({
      success: true,
      message: "User loaded successfully!!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to load user!! Error:${error}`,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.query;
    const { role } = req.body;
    const user = await userService.updateRole(id, role);
    res.status(200).json({
      success: true,
      message: "User role updated successfully!!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to update user role!! Error:${error}`,
    });
  }
};
const getRole = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await userService.getRole(email);
    res.status(200).json({
      success: true,
      message: "User role loaded successfully!!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to load user role!! Error:${error}`,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.deleteUser(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to delete user!! Error:${error}`,
    });
  }
};

export default {
  getUsers,
  createUser,
  getUser,
  updateRole,
  getRole,
  deleteUser,
};
