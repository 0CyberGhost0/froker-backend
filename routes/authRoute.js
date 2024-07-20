const express = require("express");
const bcrypt = require("bcryptjs");
const authRouter = express.Router();
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth");
const moment = require("moment"); // Import moment

// Function to calculate age from date of birth using moment
const calculateAge = (dob) => {
    return moment().diff(moment(dob), 'years');
};

authRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phoneNumber, dob, salary } = req.body;

        if (!email || !password) {
            return res.json({ message: "Email or Password can't be empty" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User Already Exists!" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Validate age and salary
        const age = calculateAge(dob);
        if (age <= 20) {
            return res.json({ message: "Age must be greater than 20" });
        }

        if (salary < 25000) {
            return res.json({ message: "Salary must be greater than or equal to 25,000" });
        }

        // Create and save the new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            dob,
            salary,
        });

        await user.save();

        // Set user status to approved
        user.status = true;
        await user.save();

        res.json({ message: "User Created Successfully and has been Approved!", user });
    } catch (e) {
        res.json({ error: e.message });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User doesn't Exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Incorrect Password" });
        }

        const token = jwt.sign({ id: user._id }, "password");

        res.json({ token, ...user._doc });
    } catch (error) {
        res.json({ error: error.message });
    }
});

authRouter.get("/user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json({ ...user._doc, token: req.authToken });
    } catch (err) {
        res.json({ error: err.message });
    }
});

authRouter.post('/borrow', authMiddleware, async (req, res) => {
    try {
        const { amount, tenure } = req.body;

        if (!amount || !tenure) {
            return res.json({ message: "Enter Amount and tenure to borrow!" });
        }

        const userId = req.userId;
        const user = await User.findById(userId);
        if (user.status === false) {
            return res.json({ message: "Can't Borrow Money... Application Rejected" });
        }

        user.purchasePower += amount;

        const a = 0.08 / 12;
        const b = Math.pow(1 + a, tenure);
        const num = a * b;
        const den = b - 1;
        const monthlyRepayment = amount * (num / den);

        await user.save();

        res.json({
            purchasePower: user.purchasePower,
            monthlyRepayment: monthlyRepayment.toFixed(2)
        });
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = authRouter;