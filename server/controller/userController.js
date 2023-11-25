import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'
import {createUserToken} from '../utils/jwt.js'
export const userSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Some of the fields are Empty" });
    }
    const existingUser = await userModel.find({
      email: email,
      userVerified: true,
    });
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User Already Exists" });
    }
    try {
      const user = new userModel({ email, password });
      await user.save();
      res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to create user" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email|| !password) {
      return res.status(400).json({ error: "Some of the fields are Empty" });
    }
    const user = await userModel.find({ email: req.body.email });
console.log(user[0]);
    if (user.length == 0) {
      return res.status(400).json({ error: "Invalid User" });
    }
    const match = bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    console.log('in here');
    const token = createUserToken(user[0]);
    console.log(token);
    res.status(200).json({
      success: true,
      token: token,
      user: user[0].name,
    });
  } catch (err) {
    res.status(400).json({ error: "Failed to Login" });
  }
};

export const userData = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send("user not found");
  }
};

export const getAllUsers=async(req,res)=>{
try {
    const users=await userModel.find( {_id: { $ne: req.user.id }} )
    res.status(200).json({success:true,users:users});
} catch (error) {
    res.status(400).send("Some error occured"); 
}
}

export const userAccountStatement = (req, res) => {
  try {
    
  } catch (err) {}
};
