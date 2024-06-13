const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { authMiddleWare } = require("../middleware/authMiddleware");
router.post("/sign_up", userController.createUser);
router.post("/sign_in", userController.loginUser);
router.put("/update_user/:id", userController.updateUser);
router.delete("/delete_user/:id", authMiddleWare, userController.deleteUser);

module.exports = router;
