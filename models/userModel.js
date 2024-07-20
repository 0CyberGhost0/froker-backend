const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    phoneNumber: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
    },
    password: {
        required: true,
        type: String,
    },
    dob: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    purchasePower: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: false, // false indicates 'Pending'
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

