const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const validateLogin = require('../validation/login');
const validateRegistration = require('../validation/register');

/**
 * @route GET user/test
 * @desc Test User Route 
 * @access Public 
 */
router.get('/test', (req, res) => {
    res.json({ msg: "This works"});
})

/**
 * @route POST user/register
 * @desc Register New User 
 * @access Public 
 */
router.post('/register', async (req, res) => {
    req.body = req.sanitize(req.body);
    const { err, isValid } = validateRegistration(red.body);
    if (!isValid) {
        return res.status(400).json(err);
    }

    const { userName, email, password, streetAddress, city, state, country, zipCode } = req.body;
    let { apartmentNumber } = req.body;
    // Since apartment number is not required, we need to handle this 
    if (!apartmentNumber || apartmentNumber === null || apartmentNumber === undefined) apartmentNumber = '';

    try {
        const user = await User.findOne({ userName });
        if (user) {
            err.userName = "Username Already Exist";
            return res.status(400).json(err);
        } else {
            const newUser = new User({
                userName,
                email, 
                password, 
                streetAddress,
                city, 
                state, 
                country, 
                zipCode, 
                apartmentNumber
            }); 

            
        } 
    } catch (e) {

    }
})