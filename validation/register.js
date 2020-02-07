const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegistration(data) {
    let err = {};

    let { userName, email, password, streetAddress, city, state, country, zipCode, apartmentNumber } = data;

    // if (!apartmentNumber || apartmentNumber === undefined || apartmentNumber === null ) apartmentNumber = '';

    userName = !isEmpty(userName) ? userName : '';
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';
    streetAddress = !isEmpty(streetAddress) ? streetAddress : '';
    city = !isEmpty(city) ? city : '';
    state = !isEmpty(state) ? state : '';
    country = !isEmpty(country) ? country : '';
    zipCode = !isEmpty(zipCode) ? zipCode : '';

    if (validator.isEmpty(userName)) {
        err.userName = "Username is Required";
    }

    if (validator.isEmpty(email)) {
        err.email = "Email is Required";
    }

    if (validator.isEmpty(password)) {
        err.password = "Password is Required";
    }

    if (validator.isEmpty(streetAddress)) {
        err.streetAddress = "Street Address is Required";
    }

    if (validator.isEmpty(city)) {
        err.city = "City is Required";
    }

    if (validator.isEmpty(state)) {
        err.state = "State is Required";
    }

    if (validator.isEmpty(country)) {
        err.country = "Country is Required";
    }

    if (validator.isEmpty(zipCode)) {
        err.zipCode = "Zipcode is Required";
    }

    // ZipCode is 5 characters
    if (validator.isLength(zipCode, { min: 5, max: 5 })) {
        err.zipCode = "Zipcode must be 5 digits long";
    }

    // Zipcode is numerical
    if (!validator.isNumeric(zipCode, { no_symbols: true })) {
        err.zipCode = "Zipcode must be Numeric";
    }

    // Username is proper length 
    if (!validator.isLength(userName, { min: 2, max: 15})) {
        err.userName = "Username must be between 2 and 15 characters";
    }

    // Valid Email 
    if (!validator.isEmail(email)) {
        err.email = "Email is not valid";
    }

    // Password Length 
    if (!validator.isLength(password, { min: 5, max: 30 })) {
        err.password = "Password must be between 5 and 30 characters"
    }

    return {
        err, 
        isValid: isEmpty(err)
    }

}