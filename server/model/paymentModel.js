import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
    },
    paymentFulfilled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Payments = mongoose.model("Payments", paymentSchema);
export default Payments;
