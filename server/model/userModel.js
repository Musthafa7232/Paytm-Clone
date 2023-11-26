import mongoose from "mongoose";

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


const Users = mongoose.model("User", userSchema);

export default Users;
