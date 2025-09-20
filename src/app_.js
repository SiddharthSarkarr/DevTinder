const express = require('express');

const app = express();

// diff http method
app.get("/", (req, res) => {
    res.send("Hello, Node JS");
})

app.get("/test", (req, res) => {
    res.send({firstname: "Siddharth", lastname:"Kumar"});
})

app.post("/user", (req, res) => {
    res.send("Data posted successfully!!");
})

// diff http method

// diff types of url routing

app.get(/ab?c/, (req, res) => {
    res.send("b is optional");
})

app.get(/ab+c/, (req, res) => {
    res.send("b can be many times");
}) 

app.get(/c*d/, (req, res) => {
    res.send("we can pass any string btw c and d");
}) 

app.get(/a/, (req, res) => {
    res.send("a should be present in url");
}) 

app.get(/.*fly$/, (req, res) => {
    res.send("we can add any string in start but url should end with 'fly'");
})

app.get("/user/:userId", (req, res) =>{
    console.log("query params", req.params);
    res.send("dynamic query parameter");
})

app.get("/user/:userId/:name", (req, res) =>{
    console.log("multiple query params", req.params);
    res.send("dynamic multi query params")
})

app.get("/route", (req,res) =>{
    console.log("dynamic routing:", req.query);
    res.send("reading dynamic routes")
})

app.get("/routes", (req, res) =>{
    console.log("reading multiple routes", req.query);
    res.send("reading multiple dynamic routes")
})
// diff types of url routing

app.listen(1234, () =>{
    console.log("Server is successfully connected on port 1234.")
});