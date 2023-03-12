"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DB = void 0;
require("dotenv/config");
exports.DB = process.env.MONGO_URL;
exports.PORT = process.env.PORT || 3001;
