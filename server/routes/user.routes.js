const express = require("express")
const { userSignUp, userSignIn, userSignOut } = require("../controllers/user.controller")

const userRouter = express.Router()

// Sing Up Router
userRouter.post("/signup", userSignUp)
// Sign In Router
userRouter.post("/signin", userSignIn)
// user log out Router
userRouter.get("/signout", userSignOut)

module.exports = userRouter