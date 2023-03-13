"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    isUserVerified: { type: Boolean, default: false },
    verifyToken: { type: String }
});
exports.default = (0, mongoose_1.model)('UserData', UserSchema);
