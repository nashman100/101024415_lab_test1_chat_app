const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {

    const {username, firstname, lastname, password} = req.body;

    try{
        let user = await User.findOne({username});
        if(user) return res.status(400).json({message: "User already exists"});

        const hashPass = await bcrypt.hash(password, 10);
        user = new User({username, firstname, lastname, password : hashPass});

        await user.save();
        res.status(201).json({message: "New User Successfully Created"});
    } catch(err){
        console.error(err);
        res.status(500).json({message: "Server Error Creating User"});
    }

});

router.post("/login", async (req, res) =>{

    const {username, password} = req.body;

    try{
        const user = await User.findOne({username});
        if(!user) return res.status(400).json({message: "Incorrect Username or Password"});

        const dehash = await bcrypt.compare(password, user.password);
        if(!dehash) return res.status(400).json({message: "Incorrect Username or Password"});

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token, username: user.username});
    } catch(err){
        console.error(err);
        res.status(500).json({message: "Login Server Error"})
    }
});

module.exports = router;