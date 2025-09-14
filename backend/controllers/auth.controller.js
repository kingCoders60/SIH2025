import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';




const generateToken = (user)=>{
    return jwt.sign({
        id:user._id,role:user.role,
        region:user.region
    },process.env.SECRET,
{expiresIn:'7d'});
};

export const registerUser =async(req,res)=>{
    try{

    }catch(error){
        res.status(500).json({
            message:"Registraiton failed!",error:res.message
        });
}

//Login..
export const loginUser = async (req,res)=>{
    try{

    }catch(error){
        return res.status(500).json({
            message:'Login Failed',
            error:error.message;
        })
    }
}