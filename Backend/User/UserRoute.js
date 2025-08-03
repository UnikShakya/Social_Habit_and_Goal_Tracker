const express = require("express");
const { loginUser, registerUser } = require("./UserController");
const UserRouter = express.Router();

UserRouter.post("/login", loginUser )
UserRouter.post("/signup", registerUser )

module.exports = UserRouter;