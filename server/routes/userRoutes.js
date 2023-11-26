import express from "express";
import { getAllRequests, getAllUsers, userAccountStatement, userData, userLogin, userSignup, verifyOTP, verifyTOTP } from "../controller/userController.js";
import { verifyUserToken } from "../utils/jwt.js";
const router =express.Router()

router.post('/signin',userLogin)
router.post('/signup',userSignup)
router.post('/verifyotp',verifyOTP)
router.post('/verifytotp',verifyTOTP)
router.use(verifyUserToken)
router.get('/userData',userData)
router.get('/getAllUsers',getAllUsers)
router.get('/getAllRequests',getAllRequests)
router.get('/accountStatement',userAccountStatement)

export default router