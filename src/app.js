const express = require('express');
const connectDB = require('./config/databsase');
const User = require('./model/user')
const app = express();

app.use(express.json())

app.post('/signup', async(req,res) =>{

    // console.log(req.body)

    // const userObj = {
    //     firstName : "Siddharth",
    //     lastName: "Sarkarr",
    //     email:"sidd@gmail.com",
    //     password: "sidd@123"
    // }

    const userObj = req?.body

    try{
        const userModel = new User(userObj);
        await userModel.save();
        res.send("data added succesfully")
    }catch(err){
        res.status(500).send("Failed----" + err)
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
