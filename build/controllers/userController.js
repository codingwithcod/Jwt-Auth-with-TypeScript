"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyForgotMail = exports.sendForgotPasswordMail = exports.verifyUserMail = exports.sendVerificationMail = exports.signinUser = exports.signupUser = void 0;
const http_errors_1 = __importStar(require("http-errors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_1 = __importDefault(require("../models/User"));
const config_1 = require("../config");
const signupUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser)
            return next((0, http_errors_1.default)(422, "Email already exists"));
        const hassPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ name, email, password: hassPassword });
        yield user.save();
        res.status(201).json({ message: "user Created" });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
});
exports.signupUser = signupUser;
const signinUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return next((0, http_errors_1.default)(404, "user not found"));
        if (!user.isUserVerified)
            return next((0, http_errors_1.default)(406, "user not verified"));
        const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword)
            return next((0, http_errors_1.default)(401, "Invalid Credantials"));
        const token = jsonwebtoken_1.default.sign({
            name: user.name,
            email: user.email,
            userId: user.id
        }, config_1.JWT_KEY, {
            expiresIn: "10h"
        });
        res.cookie("jwtAuth", token);
        res.status(200).json({ message: "user Logged in ", token });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
});
exports.signinUser = signinUser;
const sendVerificationMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return next((0, http_errors_1.default)(404, "Email not valid"));
        if (user.isUserVerified)
            return next((0, http_errors_1.default)(406, "user Already verified"));
        const encryptedToken = yield bcryptjs_1.default.hash(user._id.toString(), 10);
        const jwtToken = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.JWT_KEY, {
            expiresIn: '60m'
        });
        let info = yield config_1.transporter.sendMail({
            from: '"Fred Foo yahoo 👻" <abhi@patel.com>',
            to: email,
            subject: "verification mail",
            html: `Your Email Verificaton <a href="${config_1.FRONTEND_URL}/verification-mail-verify/${jwtToken}">Link</a>`, // html body
        });
        //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.json({ message: `Preview URL: %s ${nodemailer_1.default.getTestMessageUrl(info)}` });
        yield user.updateOne({ $set: { verifyToken: encryptedToken } });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
});
exports.sendVerificationMail = sendVerificationMail;
const verifyUserMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_KEY);
        const user = yield User_1.default.findById(decodedToken.userId);
        if (!user)
            return next((0, http_errors_1.default)(401, "invalid token"));
        if (user.isUserVerified)
            return next((0, http_errors_1.default)(406, "user Already verified"));
        yield user.updateOne({
            $set: { isUserVerified: true },
            $unset: { verifyToken: 0 }
        });
        res.json({ message: 'Email Verified' });
    }
    catch (error) {
        return next((0, http_errors_1.default)(401, "invalid token"));
    }
});
exports.verifyUserMail = verifyUserMail;
const sendForgotPasswordMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return next((0, http_errors_1.default)(404, "Email not valid"));
        const encryptedToken = yield bcryptjs_1.default.hash(user._id.toString(), 10);
        const jwtToken = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.JWT_KEY, {
            expiresIn: '60m'
        });
        let info = yield config_1.transporter.sendMail({
            from: '"Fred Foo yahoo 👻" <abhi@patel.com>',
            to: email,
            subject: "For forgot Password verification mail",
            html: ` Email for forgot password Verificaton <a href="${config_1.FRONTEND_URL}/forgot-password-verify/${jwtToken}">Link</a>`, // html body
        });
        //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.json({ message: `Preview URL: %s ${nodemailer_1.default.getTestMessageUrl(info)}` });
        yield user.updateOne({ $set: { verifyToken: encryptedToken } });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
});
exports.sendForgotPasswordMail = sendForgotPasswordMail;
const verifyForgotMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, password } = req.body;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_KEY);
        const user = yield User_1.default.findById(decodedToken.userId);
        if (!user)
            return next((0, http_errors_1.default)(401, "invalid token"));
        const tokenMatch = yield bcryptjs_1.default.compare(decodedToken.userId, user.verifyToken);
        if (tokenMatch)
            return next((0, http_errors_1.default)(401, "token expired"));
        const hassPassword = yield bcryptjs_1.default.hash(password, 10);
        yield user.updateOne({
            $set: { password: hassPassword },
            $unset: { verifyToken: 0 }
        });
        res.json({ message: 'Password Changed' });
    }
    catch (error) {
        return next((0, http_errors_1.default)(401, "invalid token"));
    }
});
exports.verifyForgotMail = verifyForgotMail;
