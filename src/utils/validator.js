const { Error } = require('mongoose');
const validator  = require('validator');

const signupValidatore = (req) =>{

    const {firstName, lastName, email, password } = req?.body;

    if(!firstName || !lastName){
        throw new Error("Please enter firstname and lastname.")
    }else if(!validator.isEmail(email)){
        throw new Error("Invalid Email.")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a new password.")
    }

}

module.exports = {signupValidatore}