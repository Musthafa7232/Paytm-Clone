import express from "express";
import { addMoneyToWallet, requestMoney, sendMoney } from "../controller/paymentController.js";
import { verifyUserToken } from "../utils/jwt.js";
const router =express.Router()

router.use(verifyUserToken)
router.post('/addBalance',addMoneyToWallet)
router.post('/pay',sendMoney)
router.post('/request',requestMoney)
export default router