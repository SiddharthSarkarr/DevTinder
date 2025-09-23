const mongoose = require('mongoose');


const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://namastedev:Q2N7HhZSIbBYUZQL@namastenode.0chqmzq.mongodb.net/devTinder')
}

// connectDB()
//     .then(() => console.log("Database connected successfully!!"))
//     .catch(() => console.log("Database connection error !!"))

module.exports = connectDB