"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const example_1 = require("../controllers/example");
const exampleValidation_1 = require("../validation/exampleValidation/exampleValidation");
const router = express_1.default.Router();
router.get('/', example_1.getExample);
router.post('/post', exampleValidation_1.postExampleDataValidation, example_1.postExampleData);
exports.default = router;
