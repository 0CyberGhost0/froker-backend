const mongoose = require("mongoose");
require("dotenv").config();
const mongoDbUrl = process.env.mongoDBURL;

// asynchronous function to connect to the database
const connectDb = async () => {
    mongoose.connect(mongoDbUrl).then(() => {
        // If the connection is successful, log a message
        console.log("Database Connected");
    }).catch((e) => {
        // If there is an error, log the error message
        console.log(e);
    });
}

module.exports = connectDb;
