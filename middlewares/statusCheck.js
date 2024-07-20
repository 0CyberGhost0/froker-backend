
const express = require("express"); 
const User = require("../models/userModel");

// Middleware to check the user's status
const statusCheck = async (req, res, next) => {
    try {
        const userId = req.user; // Get the user ID from the request 
        const user = await User.findById(userId); // Find the user by their ID in the database

        if (user.status !== 'Approved') {
            // If the status is not 'Approved', respond with a 400 status and a message
            return res.status(400).json("Your Application Approval is Pending!");
        }

        // If the user's status is 'Approved', call the next middleware or route handler
        next();
    } catch (e) {
        // Handle errors and respond with a 500 status and the error message
        res.status(500).json({ error: e.message });
    }
}

module.exports = statusCheck;
