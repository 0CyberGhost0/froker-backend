
const express = require("express"); // Import the Express framework
const connectDB = require("./database"); // Import the database connection function
const authRouter = require("./routes/authRoute"); // Import the authentication routes// Import the user routes
require("dotenv").config(); // Load environment variables from .env file
// Set the port number from environment variables or use 3000 as default
const PORT = process.env.PORT || 8000;
// Create an Express application
const app = express();
// Middleware to parse JSON bodies in requests
app.use(express.json());
// Connect to the database
connectDB();
// Register the authentication router for handling authentication routes
app.use('/', authRouter);
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT);
});