// import mongoose from "mongoose";
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        minLength: 5,
        maxLength:50,
        trim: true
    },
    lastName : {
        type : String,
        minLength: 5,
        maxLength:50,
        trim: true
    },
    email : {
        type : String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 5,
        maxLength:50,
        trim: true
    },
    password : {
        type : String,
        required:true
    },
    age : {
        type : Number
    },
    gender : {
        type : String,
        enum : ['male', 'female']
    },
    skills:{
        type: Array,
        default: ["JS"]
    },
},
{
    timestamps: true, // Enable timestamps
  }
)

// const User = mongoose.model('User', userSchema);

// module.exports = User;

module.exports = mongoose.model('User', userSchema);