const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const validateLogin = require('../validation/login');
const validateRegistration = require('../validation/register');
const User = require('../models/User');
const config = require('../config/keys');

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

            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);
            await user.save();

            // Give new register user a token 
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwy.sign(
                payload, 
                config.secret,
                // Time token last
                { expiresIn: 36000 }, 
                (err, token) => {
                    if (err) throw err; 
                    res.json({ token });
                }
            )

        } 
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e});
    }
})