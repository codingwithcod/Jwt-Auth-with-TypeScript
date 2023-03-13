"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = exports.FRONTEND_URL = exports.JWT_KEY = exports.PORT = exports.DB = void 0;
require("dotenv/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.DB = process.env.MONGO_URL;
exports.PORT = process.env.PORT || 3001;
exports.JWT_KEY = process.env.JWT_KEY;
exports.FRONTEND_URL = process.env.FRONTEND_URL;
let testAccount = {
    user: "upa5p3vuwvardufu@ethereal.email",
    pass: "65Jj2RRhYBxGs3kERG"
};
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass, // generated ethereal password
    },
});
