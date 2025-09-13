const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send("Hello, Node JS");
})

app.get("/test", (req, res) => {
    res.send("Hello, Test URL");
})

app.get("/hello", (req, res) => {
    res.send("Hello, hello URL");
})

app.listen(1234, () =>{
    console.log("Server is successfully connected on port 7777.")
});