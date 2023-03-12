"use strict";
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
exports.postExampleData = exports.getExample = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const example_1 = __importDefault(require("../models/example"));
const getExample = (req, res, next) => {
    res.json({ message: 'This is example controller' });
};
exports.getExample = getExample;
const postExampleData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id } = req.body;
    try {
        const example = yield example_1.default.findOne({ name });
        if (example)
            return next((0, http_errors_1.default)(406, 'user already exists'));
        const newExample = new example_1.default({ name, id });
        const user = yield newExample.save();
        res.json({ message: "user regiseter successfully" });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
});
exports.postExampleData = postExampleData;
