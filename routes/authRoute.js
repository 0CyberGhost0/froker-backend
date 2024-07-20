// Import necessary modules
const express = require("express"); 
const bcrypt = require("bcryptjs");
const authRouter = express.Router(); 
const User = require('../models/userModel'); 
const jwt = require("jsonwebtoken"); 
const auth = require("../middlewares/auth"); 
const validateUser = require("../utils/validateUser");

// Route for user signup
authRouter.post('/signup', async (req, res) => {
    try {
       
        const { name, email, password, phoneNumber, dob, salary } = req.body;

        // Check if email or password are missing
        if (!email || !password) {
            return res.status(400).json({ msg: "Email or Password can't be empty" });
        }

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User Already Exists!" });
        }

        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            dob,
            salary,
        });

        // Save the user to the database
        await user.save();

        // Validate the user's data
        const validate = validateUser(dob, salary);
        if (validate.valid == false) {
            user.status = 'Rejected';
            return res.status(400).json({ msg: validate.msg, user });
        }

        // Set the user's status to 'Approved'
        user.status = 'Approved';
        await user.save();

        // Respond with a success message and the user data
        res.json({ msg: "User Created Successfully and has been Approved!", user });
    } catch (e) {
        // Handle errors and respond with status 500
        res.status(500).json({ error: e.message });
    }
});

// Route for user login
authRouter.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User doesn't Exist" });
        }

        // Check if the provided password matches the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect Password" });
        }

        // Create a JWT token for the user
        const token = jwt.sign({ id: user._id }, "password");

        // Respond with the token and user data
        res.json({ token, ...user._doc });
    } catch (error) {
        // Handle errors and respond with status 500
        res.status(500).json({ error: error.message });
    }
});


module.exports = authRouter;
