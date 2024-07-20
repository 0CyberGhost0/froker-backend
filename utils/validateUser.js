
const moment = require("moment");

// Define the validateUser function that takes a date of birth (dob) and salary as parameters
const validateUser = (dob, salary) => {
    try {
        // Parse the date of birth using moment, assuming the input format is 'YYYY-MM-DD'
        const birthDate = moment(dob, 'YYYY-MM-DD');
        
        // Calculate the age by finding the difference between the current date and the birth date in years
        const age = moment().diff(birthDate, 'years');

        // Check if the age is less than or equal to 20
        if (age <= 20) {
            return { valid: false, msg: "User's age should be above 20" };
        } 
        // Check if the salary is less than 25000
        else if (salary < 25000) {
            return { valid: false, msg: "Salary should not be less than 25000" };
        }
        return { valid: true };
    } catch (err) {
        console.log(err);
    }
}

module.exports = validateUser;
