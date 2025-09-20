const express = require('express');

const app = express();

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

app.listen(1234, () =>{
    console.log("Server is successfully connected on port 1234.")
});
