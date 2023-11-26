import userModel from "../model/userModel.js";
import paymentModel from "../model/paymentModel.js";
import tokenModel from "../model/tokenModel.js";
import requestModel from "../model/RequestModel.js";
import { createUserToken } from "../utils/jwt.js";
import otpGenerator from "otp-generator";
import verifyEmail from "../utils/nodemailer.js";
import { generateQr, verifySecret } from "../utils/speakeaasy.js";
export const userSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Some of the fields are Empty" });
    }
    const existingUser = await userModel.find({
      email: email,
      userVerified: true,
    });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    try {
      const user = new userModel({ email, password });
      await user.save();
      const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

  

      const token = new tokenModel({
        userId: user._id,
        otp: otp,
      });

      await token.save();

      await verifyEmail(user.email, otp);

      res.status(200).json({
        success: true,
        message: "OTP sent to your email/phone",
        user: user,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    res.status(400).json({ message: "Failed to create user" });
  }
};

export const verifyOTP = async (req, res) => {
  const userId = req.body.userId;
  const userOTP = req.body.otp;

  try {
    const token = await tokenModel.findOne({ userId: userId, otp: userOTP });

    if (token) {
      const user = await userModel.findOne({ _id: userId });
      user.emailVerified = true;
      await tokenModel.findByIdAndDelete(token._id);

      const { secret, qr } = await generateQr();
      user.secretKey = secret.ascii;
      await user.save(); // Corrected this line

      return res.status(200).json({
        success: true,
        user: user,
        message: "OTP verified. Email verified",
        qr: qr,
      });
    } else {
      return res.status(404).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to verify OTP" });
  }
};

export const verifyTOTP = async (req, res) => {
  try {
    const { totp, userId } = req.body;
    const user = await userModel.findOne({ _id: userId });

    const verified = await verifySecret(user.secretKey, parseInt(totp, 10));

    if (verified) {
      user.userVerified = true;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "TOTP verified. Email verified",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to verify TOTP" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password, totp } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Some of the fields are Empty" });
    }
    const user = await userModel.find({
      email: req.body.email,
      password: password,
      userVerified: true,
    });
    if (user.length == 0) {
      return res.status(400).json({ message: "Invalid User" });
    }
    if (totp) {
      console.log(user);
      const verified = await verifySecret(
        user[0].secretKey,
        parseInt(totp, 10)
      );
      if (verified) {
        const token = createUserToken(user[0]);
        console.log(token);
        res.status(200).json({
          Verifiedsuccess: true,
          token: token,
          user: user[0].name,
        });
      }
    } else {
      res.status(200).json({
        success: true,
      });
    }
  } catch (err) {
    res.status(400).json({ message: "Failed to Login,Please try again later" });
  }
};

export const userData = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Failed to Fetch Data" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({ _id: { $ne: req.user.id }, userVerified: true })
      .select("email _id");
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(400).json({ message: "Failed to Fetch Data" });
  }
};
export const getAllRequests = async (req, res) => {
  try {
    const pendingRequests = await requestModel.find({
      to: req.user.id,
      requestCompleted: false,
    })
      .populate({
        path: "from",
        model: "User",
        select: "email",
      })
      .populate({
        path: "to",
        model: "User",
        select: "email",
      });
    res.status(200).json({ success: true, requests: pendingRequests });
  } catch (error) {
    res.status(400).json({ message: "Failed to Fetch Data" });
  }
};

export const userAccountStatement = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      throw new Error("User not found");
    }
    const paymentIds = user.paymentHistory;
    const payments = await paymentModel
      .find({
        _id: { $in: paymentIds },
        paymentFulfilled: true,
      })
      .populate({
        path: "from",
        model: "User",
        select: "email",
      })
      .populate({
        path: "to",
        model: "User",
        select: "email",
      });
    res.status(200).json({ success: true, details: payments });
  } catch (err) {
    res.status(400).json({ message: "Failed to Fetch Data" });
    console.log(err);
  }
};
