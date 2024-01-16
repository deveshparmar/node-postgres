const express = require("express");
const User = require("../model/userModel")
const userRouter = express.Router();



userRouter.post("/register",async(req,res)=>{
    const {username, password, email} = req.body;

    try{
        const user = await User.create({username,password,email});
        res.status(201).json({message : "User Created",user});
    }catch(err){
        console.error(err);
        res.status(500).json({error : "Internal Server error"});
    }
});


userRouter.post("/login",async(req,res)=>{
    const { email, password } = req.body;

    try{
        const user = await User.findOne({where: {email}});

        if (user && (await user.comparePassword(password))) {
            res.json({message : "Login Successful", user});
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = userRouter;
