import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Example from "../models/example";

export const getExample : RequestHandler = (req, res, next) => {

    res.json({message:'This is example controller'})

}

export const postExampleData : RequestHandler = async(req, res, next) => {

    const {name, id }: IExampleData = req.body;

    try {
        const example = await  Example.findOne({name})
        if(example) return next(createHttpError(406, 'user already exists'))
        const newExample = new Example({name, id})
        const user = await newExample.save();
        res.json({message:"user regiseter successfully"})
        
    } catch (error) {
        return next(createHttpError.InternalServerError)
        
    }
      


   
}