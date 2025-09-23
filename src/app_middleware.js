const express = require('express');

const app = express();
const { adminAuth } = require('./middleware/adminAuth');

// next() concepts
app.use("/user",
    (req,res, next) =>{
        console.log("heyy");
        // res.send("hii")
        next();
    },
    (req, res) =>{
        console.log("hello")
        res.send("next function called")
    }
) 
// next() concepts


// middleware concepts

// app.use('/admin', adminAuth)

app.get('/admin/getData',adminAuth, (req, res) =>{
    // const token ='xyz';
    // const isAuth = token === 'xyz';
    // if(isAuth){
    //     console.log("Data sent successfully");
    //     res.send("Sent Data !!!");
    // }else{
    //     res.status(401).send("Unauthorized error")
    // }
    console.log("Data sent successfully");
    res.send("Sent Data !!!");
    
})

app.post('/admin/deleteData', (req, res) =>{
    console.log("Data deleted successfully");
    res.send("Deleted Data !!!");
})

// middleware concepts


// error handling concepts

// Method 1:
    // app.get('/getUserData', (req, res) =>{
    //     // logic to fetch data from Databse
    //     throw new Error("static error - fcgnjd")
    //     res.send("User data sent")
    // })

    // app.get('/', (err, req, res, next) =>{
    //     if(err){
    //         res.status(500).send("something went wrong")
    //     }
    // })

// Method 2:
app.get('/getUserData', (req, res) =>{
    // logic to fetch data from Databse
    try {
        throw new Error("static error - fcgnjd")
        res.send("User data sent")
    } catch (error) {
        res.status(500).send("something went wrong")
    }
    
})

// error handling concepts

 

app.listen(1234, () =>{
    console.log("Server is successfully connected on port 1234.")
});
