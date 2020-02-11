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

    if (!isValid) return res.status(400).json(err);

    const { userName, email, password, streetAddress, city, state, country, zipCode } = req.body;
    let { apartmentNumber } = req.body;
    // Since apartment number is not required, we need to handle this 
    if (!apartmentNumber || apartmentNumber === null || apartmentNumber === undefined) apartmentNumber = '';

    try {
        // Check if the user exist 
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
            await newUser.save();

            // Give new register user a token 
            const payload = {
                user: {
                    id: newUser.id
                }
            };

            jwt.sign(
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
        res.status(500).json({ error: e });
    }
});

/**
 * @route POST user/login
 * @desc Login Route 
 * @access Public
 */

 router.post('/login', async (req, res) => {
     req.body = sanitize(req.body);

     const { isValid, err } = validateLogin(req.body);

     if (!isValid) return res.status(400).json(err);

     const { userName, password } = req.body;

     try {
        // Check if username exist
        let user = await User.findOne({ userName });
        // If no user, throw err
        if (!user) {
            err.userName = "Incorrect Username";
            return res.status(400).json(err);
        }
        // Check if password is correct
        const passwordCheck = await bcrypt.comparePassword(password, user.password);
        // If passwords match, return token 
        if (passwordCheck) {
            const payload = { id: user.id, name: user.userName };
            jwt.sign(
                payload, 
                key.secret, 
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) {
                        err.password = "Error returning token";
                        return res.status(500).json(err);
                    }
                    res.json({
                        success: true,
                        token
                    });
                }
            )
        } else {
            err.password = "Incorrect Password";
            return res.status(400).json(err);
        }
     } catch (e) {
        return res.status(500).json(e);
     }
});

module.exports = router;