const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: [true, "Email is Required."],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    },
    role: {
        type: String,
        default: "user"
    }
},{
    timestamps: true,
    versionKey: false
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel;