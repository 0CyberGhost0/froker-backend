
const express = require("express"); // Import the Express framework
const connectDb = require("./db"); // Import the database connection function
const authRouter = require("./routes/authRoute"); // Import the authentication routes
const userRouter = require("./routes/userRoute"); // Import the user routes
require("dotenv").config(); // Load environment variables from .env file
// Set the port number from environment variables or use 3000 as default
const PORT = process.env.PORT || 3000;
// Create an Express application
const app = express();
// Middleware to parse JSON bodies in requests
app.use(express.json());
// Connect to the database
connectDb();
// Register the authentication router for handling authentication routes
app.use('/', authRouter);
// Register the user router for handling user-related routes
app.use('/', userRouter);
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT);
});