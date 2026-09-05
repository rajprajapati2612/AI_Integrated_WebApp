const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model')

async function registerUserController(req,res){
  
    const {username, email, password} = req.body;

     if(!username || ! email || !password){
        return res.status(400).json({
            success:false,
            message:"please provide username, email and password"
        })
    }
        const isuserAlreadyExist = await userModel.findOne({
            $or: [{username},{email}]
        });

        if(isuserAlreadyExist){
            return res.status(400).json({
                success:false,
                message:"Account already exist with this email address or username"
            })
        }

    const hashedpassword =await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password:hashedpassword
    });

    const token = jwt.sign({
        id:user._id,username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token);

    res.status(201).json({
        success:true,
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })


        
     
}


async function loginUserController(req,res){

    const {email, password} = req.body;
    
     if(!email || !password){
        return res.status(400).json({
            success:false,
            message: "All fields are required",
        })
     }

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            success: false,
            message:"User not exist"

        })
    }

    const isvalidpassword = await bcrypt.compare(password,user.password);

    if(!isvalidpassword){
        return res.status(400).json({
            success: false,
            message:"password is not correct"
        })
    }

    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"1d"});

   res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "None",
    secure: true
});

    return res.status(200).json({
       success:true,
       message:"user LoggedIn successfully",
       user:{
        id:user._id,
        username:user.username,
        email:user.email

       }
       
    })

}


async  function logoutUserController(req,res){
   const token = req.cookies.token 

   if(token){
    await tokenBlacklistModel.create({token});
   }
   res.clearCookie("token");

   res.status(200).json({
    success:true,
    message: "User logout successfully"
   })
}


async function getMeControlller(req,res){

    const user = await userModel.findById(req.user.id);



    res.status(200).json({
        message:"user details fetched successfully",
        user:{
            id: user._id,
            username: user.username,
            email:user.email 
        }
    })
}

module.exports = {registerUserController,loginUserController,logoutUserController,getMeControlller}
