const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const userSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    if (req.body.role) {
        return res.status(400).send({ message: "Role can not be sent from req.body." })
    }
    if (!name || !email || !password) {
        return res.status(400).send({ message: "Please fill in all fields." })
    }
    try {
        const isUserExist = await userModel.findOne({ email })
        if (isUserExist) {
            return res.status(400).send({ message: "Email already exist." })
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(500).send({ message: "Error in hasing Password." })
            }
            await userModel.create({ name, email, password: hash })
            res.status(200).send({ message: "Account has been created." })
        });
    } catch (error) {
        res.status(400).send({ message: "Error creating Sing Up", error })
    }
}

const userSignIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: "Please fill in all fields." })
    }
    try {
        const isUserExist = await userModel.findOne({ email })
        if (!isUserExist) {
            return res.status(404).send({ message: "Please Sign up first." })
        }
        bcrypt.compare(password, isUserExist.password, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error is comparing Password." })
            }
            if (result) {
                // Creating token
                const { password, ...rest } = isUserExist._doc
                jwt.sign({ userData: rest }, process.env.SecretKey, { expiresIn: "2 days" }, (err, token) => {
                    if (err) {
                        return res.status(400).json({ message: "Error while creating token." })
                    }
                    if (token) {
                        res.cookie("AccessToken", token, { httpOnly: true, secure: true, sameSite: 'None' }).status(200).json({ message: "Login Successfully.", userData: rest, token: token })
                    }
                })
            } else {
                return res.status(401).send({ message: "Password is incorrect." })
            }
        });
    } catch (error) {
        res.status(500).send({ message: "Error creating Sing Up", error })
    }
}

const userSignOut = (req, res) => {
    try {
        console.log(req.cookies)
        res.clearCookie("AccessToken").json({ message: "User Log out successfully." })
    } catch (error) {
        res.status(500).send({ message: "Error while LogOut", error })
    }
}

module.exports = { userSignUp, userSignIn, userSignOut }