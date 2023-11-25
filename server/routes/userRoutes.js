import express from "express";
import { getAllUsers, userAccountStatement, userData, userLogin, userSignup } from "../controller/userController.js";
import { verifyUserToken } from "../utils/jwt.js";
const router =express.Router()

router.post('/signin',userLogin)
router.post('/signup',userSignup)
router.use(verifyUserToken)
router.get('/userData',userData)
router.get('/getAllUsers',getAllUsers)
router.get('/accountStatement',userAccountStatement)

export default router