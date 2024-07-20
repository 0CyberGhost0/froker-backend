// Import necessary modules
const express = require("express"); 
const userRouter = express.Router(); 
const User = require("../models/userModel");
const auth = require("../middlewares/auth");
const statusCheck = require("../middlewares/statusCheck"); 
require("dotenv").config(); 

// Route to get user information
userRouter.get("/user", auth, async (req, res) => {
    try {
        // Find the user by their ID 
        const user = await User.findById(req.user);
        // Respond with user data and token
        res.json({ ...user._doc, token: req.token });
    } catch (err) {
        // Handle errors and respond with status 500
        res.status(500).json({ error: err.message });
    }
});

// Function to calculate monthly repayment for a loan
function calculateMonthlyRepayment(amount, interestRate, tenure) {
    const monthlyRate = interestRate / 12; // Convert annual interest rate to monthly
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, tenure);
    const denominator = Math.pow(1 + monthlyRate, tenure) - 1;
    return amount * (numerator / denominator); // Calculate and return the monthly repayment
}

// Route to handle borrowing money
userRouter.post('/borrow', auth, statusCheck, async (req, res) => {
    try {
        const { amount, tenure } = req.body; // Extract amount and tenure from the request body
        console.log(amount);
        // Check if amount is provided
        if (!amount) {
            return res.status(400).json("Enter Amount to borrow!");
        }
        // If tenure is not provided, use the default tenure from environment variables
        if (!tenure) {
            tenure = process.env.DEFAULT_TENURE;
        }
        const userId = req.user; // Get the user ID from the auth middleware
        const user = await User.findById(userId); // Find the user by their ID
        user.purchasePower += amount; // Update the user's purchase power
        const monthlyRepay = calculateMonthlyRepayment(amount, process.env.INTEREST_RATE, tenure); // Calculate the monthly repayment
        console.log(monthlyRepay);
        await user.save(); // Save the updated user to the database
       
        res.status(200).json({
            purchasePower: user.purchasePower,
            monthlyRepayment: monthlyRepay.toFixed(2)
        });
    } catch (err) {
        // Handle errors and respond with status 500
        res.status(500).json({ error: err.message });
    }
});


module.exports = userRouter;