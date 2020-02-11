const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const validateLogin = require('../validation/login');
const validateRegistration = require('../validation/register');
const User = require('../models/User');
const config = require('../config/keys');
const aliexpress = require('aliexpress');

/**
 * @route GET /test
 * @desc Test search route 
 * @access Public 
 */
router.get('/test', (req, res) => {
    res.json({ msg: "search route successful" });
})

/**
 * @ro          ute /search
 * @descr Search for items via catagory 
 * @access Public 
 */
router.get('/items', (req, res) => {
    const { search } = req.body;
    console.log(search);
    if (!search) {
        console.log('Do we hit this?');
        aliexpress.BestSelling.get()
            .then(goods => {
                console.log(goods);
                res.json(goods);
            })
            .catch(e => res.status(400).json(e));
    } else {
        aliexpress.Search({
            keyword: search,
            page: 3
          }).then(results => {
            res.json(results);
          })
          .catch(e => res.status(400).json(e));
    }
});

module.exports = router;
