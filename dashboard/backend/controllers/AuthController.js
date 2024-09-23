const express = require('express');
const router = express.Router();
const User = require('../models/User');

const singnup = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.send('user created');
}
