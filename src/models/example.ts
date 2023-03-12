import { Schema, model, Document } from "mongoose";


export interface IExample extends Document {
    name:string,
    id:string
}


const exampleSchema : Schema = new Schema({
    name:{type:String},
    id:{type:String},
})


export default model<IExample>('exampleData', exampleSchema)