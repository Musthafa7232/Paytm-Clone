import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  amount: {
    type: Number,
  },
  requestCompleted: {
    type: Boolean,
    default: false,
  },
});

const Requests = mongoose.model("Requests", requestSchema);
export default Requests;
