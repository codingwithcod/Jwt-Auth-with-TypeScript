"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserMailValidation = exports.sendForgotPasswordMailValidation = exports.sendVerificationMailValidation = exports.verifyForgotMailValidation = exports.signinUserValidation = exports.signupUserValidation = void 0;
const validator_1 = __importDefault(require("../utils/validator"));
const userSchema_1 = require("./userSchema");
const signupUserValidation = (req, res, next) => {
    (0, validator_1.default)(userSchema_1.userSchema.signupUser, req.body, next);
};
exports.signupUserValidation = signupUserValidation;
const signinUserValidation = (req, res, next) => {
    (0, validator_1.default)(userSchema_1.userSchema.signinUser, req.body, next);
};
exports.signinUserValidation = signinUserValidation;
const verifyForgotMailValidation = (req, res, next) => {
    (0, validator_1.default)(userSchema_1.userSchema.verifyForgotMail, req.body, next);
};
exports.verifyForgotMailValidation = verifyForgotMailValidation;
const sendVerificationMailValidation = (req, res, next) => {
    (0, validator_1.default)(userSchema_1.userSchema.sendVerificationMail, req.body, next);
};
exports.sendVerificationMailValidation = sendVerificationMailValidation;
const sendForgotPasswordMailValidation = (req, res, next) => {
    (0, validator_1.default)(userSchema_1.userSchema.sendForgotPasswordMail, req.body, next);
};
exports.sendForgotPasswordMailValidation = sendForgotPasswordMailValidation;
const verifyUserMailValidation = (req, res, next) => {
    (0, validator_1.default)(userSchema_1.userSchema.verifyUserMail, req.body, next);
};
exports.verifyUserMailValidation = verifyUserMailValidation;
