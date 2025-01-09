import express from 'express';
const router = express.Router();
import { handleAuthCheck, handleForgotPassword, handleGenerateNewAccessToken, handleLogin, handleLogout, handleOTPVerification, handleRegistration, handleResetPassword } from '../controllers/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js';

router.route('/register').post(handleRegistration)
router.route('/login').post(handleLogin)
router.route('/verify-otp').post(handleOTPVerification)
router.route('/forgot-password').post(handleForgotPassword)
router.route('/reset-password').patch(handleResetPassword)
router.route('/logout').post(authMiddleware, handleLogout)
router.route('/auth-check').get(authMiddleware, handleAuthCheck)
router.route('/refresh-token').get(handleGenerateNewAccessToken)

export default router;