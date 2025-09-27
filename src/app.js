const express = require('express');
const connectDB = require('./config/databsase');
const User = require('./model/user')
const app = express();
const { signupValidatore } = require('./utils/validator')
const bcrypt  = require('bcrypt');
const validator = require('validator')

app.use(express.json())

app.post('/signup', async(req,res) =>{
    
    // console.log(req.body)

    // const userObj = {
    //     firstName : "Siddharth",
    //     lastName: "Sarkarr",
    //     email:"sidd@gmail.com",
    //     password: "sidd@123"
    // }

    const {firstName, lastName, email, password} = req.body

    const hashPassword = await bcrypt.hash(password, 10);
    
    // const userObj = req?.body
    const userObj = {firstName, lastName, email, password: hashPassword}

    try{
        signupValidatore(req);

        const userModel = new User(userObj);
        await userModel.save();
        res.send("data added succesfully")
    }catch(err){
        res.status(500).send(err.message)
    }
    
})

app.post('/login', async(req,res) => {

    const {email, password} = req.body;

    try{
        
        const getHash = await User.findOne({email: email}) 
        // console.log("getHash",getHash);

        if(!validator.isEmail(email) || !getHash?.email){
            throw new Error("Invalid Credentials.")
        }

        const isPassword = await bcrypt.compare(password, getHash?.password )
        
        if(!isPassword){
            throw new Error("Invalid Credentials.")
        }else{
            res.send('Login successfully')
        }


    }catch(err){
        res.status(400).send(err.message)
    }
    
})

app.post('/user', async(req,res) =>{
    // console.log(req.body)
    const userObj = req?.body

    // get all data from mongodb database
    const getData = await User.find();
    // console.log("getData",getData);

    // get all rows from database woth same email
    const getDataByEmail = await User.find({email: req?.body?.emailID});
    // console.log("getDataByEmail",getDataByEmail);

    // get single rows from database woth same email
    const getSingleDataByEmail = await User.findOne({email: req?.body?.emailID});
    console.log("getSingleDataByEmail",getSingleDataByEmail);

    res.send("data fetched succesfully")
})


app.post("/deleteUser", async(req, res) =>{

    const payload = req.body;

    let deletedEmail;
    try{
        deletedEmail = await User.deleteOne({firstName : payload?.firstName})
    }catch(err){
        res.status(500).send("something went wrong")
    }
    
    console.log("deletedEmail",deletedEmail);
    res.send("User deleted successfully")
})

app.patch("/updateUser", async(req, res) =>{
    const payload = req?.body;

    // updating by findByIdAndUpdate
    // const updateUser = await User.findByIdAndUpdate(req?.body?.id, {email: "siddkumar@gmail.com"});
    // console.log("updateuser", updateUser);

    // updating by user email
    const updateUser = await User.findOne({email : payload?.email}).updateOne({email : payload?.updatedEmail})
    console.log("updateuser", updateUser);

    res.send("User updated successfully")
    
})


connectDB()
    .then(() => {
        console.log("Database connected successfully!!")
        app.listen(1234, () =>{
            console.log("Server is successfully connected on port 1234.")
        });
    })
    .catch(() => console.log("Database connection error !!"))


// app.listen(1234, () =>{
//     console.log("Server is successfully connected on port 1234.")
// });
