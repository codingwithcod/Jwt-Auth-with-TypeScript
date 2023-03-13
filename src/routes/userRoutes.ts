import express from "express";
import {
    sendForgotPasswordMail,
  sendVerificationMail,
  signinUser,
  signupUser,
  verifyForgotMail,
  verifyUserMail,
} from "../controllers/userController";
import {
    sendForgotPasswordMailValidation,
  signinUserValidation,
  signupUserValidation,
  verifyForgotMailValidation,
  verifyUserMailValidation,
} from "../validation/userValidation/userValidation";

const router = express.Router();

router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);
router.post("/send-verification-mail",verifyUserMailValidation, verifyUserMail);
router.post("/verify-user-mail",verifyUserMailValidation, verifyUserMail);
router.post("/forgot-password",sendForgotPasswordMailValidation, sendForgotPasswordMail);
router.post("/verify-forgot-mail",verifyForgotMailValidation, verifyForgotMail);

export default router;
