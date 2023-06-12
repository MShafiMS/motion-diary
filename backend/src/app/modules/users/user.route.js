import express from "express";
import userController from "./user.controller.js";

const router = express.Router();

router.get("/", userController.getUsers);
router.put("/create-user", userController.createUser);
router.put("/user-role", userController.updateRole);
router.get("/user-role", userController.getRole);
router.get("/:id", userController.getUser);
router.delete("/:id", userController.deleteUser);

export default router;
