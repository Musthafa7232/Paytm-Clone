import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
  secretKey: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  paymentHistory: {
    type: [mongoose.Schema.ObjectId],
    ref: "Payments",
  },
  userVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the next middleware
  }
});

const Users = mongoose.model("User", userSchema);

export default Users;
