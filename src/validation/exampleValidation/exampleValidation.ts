import { RequestHandler } from "express";
import validator from "../utils/validator";
import { exampleSchema } from "./exampleSchema";


export const postExampleDataValidation : RequestHandler = (req, res, next) => {
    validator(exampleSchema.postExampleData, req.body, next)
}