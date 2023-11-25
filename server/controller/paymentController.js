import mongoose from "mongoose";
import userModel from "../model/userModel.js";
import paymentModel from "../model/paymentModel.js";
import requestModel from "../model/RequestModel.js";
export const addMoneyToWallet = async (req, res) => {
  const { amountToAdd } = req.body;
  console.log(amountToAdd);
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const user = await userModel.findById(req.user.id).session(session);
      if (!user) {
        throw new Error("User not found");
      }

      user.walletBalance = user.walletBalance + amountToAdd;
      await user.save();

      const payment = new paymentModel({
        from: req.user.id,
        to: req.user.id,
        amount: amountToAdd,
        paymentFulfilled: true,
      });

      user.paymentHistory.push(payment._id);
      await user.save();
      await payment.save();
      res.status(200).json({ success: true, user: user });
    });
  } catch (error) {
    console.error("Transaction aborted due to an error:", error.message);
    res.status(500).json({ success: false, error: error.message });
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};

export const sendMoney = async (req, res) => {
  const { receiverUserId, amount } = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const senderUser = await userModel.findById(req.user.id).session(session);
      const receiverUser = await userModel
        .findById(receiverUserId)
        .session(session);

      if (!senderUser || !receiverUser) {
        throw new Error("Invalid sender or receiver user");
      }

      if (senderUser.walletBalance < amount) {
        throw new Error("Insufficient balance");
      }

      // Deduct amount from sender's wallet
      senderUser.walletBalance -= amount;
      await senderUser.save();

      // Add amount to receiver's wallet
      receiverUser.walletBalance += amount;
      await receiverUser.save();

      // Create payment record
      const payment = new paymentModel({
        from: req.user.id,
        to: receiverUserId,
        amount,
        paymentFulfilled: true, // You can adjust this based on your logic
      });

      // Update payment history in sender and receiver users
      senderUser.paymentHistory.push(payment._id);
      await senderUser.save();

      receiverUser.paymentHistory.push(payment._id);
      await receiverUser.save();

      await payment.save();
      res.status(200).json({ success: true, user: senderUser });
      console.log("Transaction committed successfully");
    });
  } catch (error) {
    console.error("Transaction aborted due to an error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
};

export const requestMoney = async (req, res) => {
  try {
    const { toUserId, amount } = req.body;
    const request = new requestModel({
      from: req.user.id,
      to: toUserId,
      amount,
      requestCompleted: false,
    });
    await request.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error creating money request:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
