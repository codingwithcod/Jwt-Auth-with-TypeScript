import Joi from "joi";


export const exampleSchema = {
    postExampleData:Joi.object({
        name:Joi.string().required(),
        id:Joi.number().required()
    })
}