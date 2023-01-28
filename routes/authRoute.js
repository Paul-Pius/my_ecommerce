const express = require("express");
const { createUser, loginUserControl, getAllUsers, getAUser, deleteAUser, updatedUser } = require("../controller/userControl");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserControl);
router.get("/all-users", getAllUsers);
router.get("/:id", getAUser);
router.delete("/:id", deleteAUser);
router.put("/:id", updatedUser);
module.exports = router;