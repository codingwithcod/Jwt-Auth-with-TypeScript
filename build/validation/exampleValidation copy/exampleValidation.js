"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postExampleDataValidation = void 0;
const validator_1 = __importDefault(require("../utils/validator"));
const exampleSchema_1 = require("./exampleSchema");
const postExampleDataValidation = (req, res, next) => {
    (0, validator_1.default)(exampleSchema_1.exampleSchema.postExampleData, req.body, next);
};
exports.postExampleDataValidation = postExampleDataValidation;
