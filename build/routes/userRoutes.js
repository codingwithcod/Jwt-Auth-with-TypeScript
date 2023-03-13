"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userValidation_1 = require("../validation/userValidation/userValidation");
const router = express_1.default.Router();
router.post("/signup", userValidation_1.signupUserValidation, userController_1.signupUser);
router.post("/signin", userValidation_1.signinUserValidation, userController_1.signinUser);
router.post("/send-verification-mail", userValidation_1.verifyUserMailValidation, userController_1.verifyUserMail);
router.post("/verify-user-mail", userValidation_1.verifyUserMailValidation, userController_1.verifyUserMail);
router.post("/forgot-password", userValidation_1.sendForgotPasswordMailValidation, userController_1.sendForgotPasswordMail);
router.post("/verify-forgot-mail", userValidation_1.verifyForgotMailValidation, userController_1.verifyForgotMail);
exports.default = router;
