import { RequestHandler } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'

import User from "../models/User";
import { FRONTEND_URL, JWT_KEY, transporter } from "../config";

export const signupUser: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createHttpError(422, "Email already exists"));

    const hassPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hassPassword });

    await user.save();
    res.status(201).json({ message: "user Created" });
  } catch (error) {
    return next(InternalServerError);
  }
};

export const signinUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "user not found"));
    if(!user.isUserVerified) return next(createHttpError(406, "user not verified"))
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return next(createHttpError(401, "Invalid Credantials"));
    
    
      const token = jwt.sign({
        name:user.name,
        email:user.email,
        userId:user.id
      }, JWT_KEY, {
        expiresIn:"10h"
      })

      res.cookie("jwtAuth", token  )

    res.status(200).json({ message: "user Logged in ", token });
  } catch (error) {
    return next(InternalServerError);
  }
};

export const sendVerificationMail : RequestHandler = async(req, res , next) => {
    const {email}:{email:string} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user) return next(createHttpError(404, "Email not valid"))
    
        if(user.isUserVerified) return next(createHttpError(406, "user Already verified"))
    
        const encryptedToken = await bcrypt.hash(user._id.toString(), 10)

        const jwtToken = jwt.sign({userId:user._id}, JWT_KEY, {
            expiresIn:'60m'
        })

      

          let info = await transporter.sendMail({
            from: '"Fred Foo yahoo 👻" <abhi@patel.com>', // sender address
            to: email, // list of receivers
            subject: "verification mail", // Subject line
            html: `Your Email Verificaton <a href="${FRONTEND_URL}/verification-mail-verify/${jwtToken}">Link</a>`, // html body
          });
        
        //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.json({message:`Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`})

        await user.updateOne({$set:{verifyToken:encryptedToken}})
        
    } catch (error) {
    return next(InternalServerError);
        
    }

}


export const verifyUserMail : RequestHandler = async(req, res , next) => {
    const {token}:{token:string} = req.body;

    try {
        const decodedToken:any = jwt.verify(token, JWT_KEY)

        const user = await User.findById(decodedToken.userId)
        if(!user) return next(createHttpError(401, "invalid token"))
        if(user.isUserVerified) return next(createHttpError(406, "user Already verified"))

        await user.updateOne({
            $set : { isUserVerified:true},
            $unset: {verifyToken:0}
        })

        res.json({message:'Email Verified'})
        
    } catch (error) {
        return next(createHttpError(401, "invalid token"));
    }

   

}


export const sendForgotPasswordMail : RequestHandler = async(req, res , next) => {
    const {email}:{email:string} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user) return next(createHttpError(404, "Email not valid"))
    
      
    
        const encryptedToken = await bcrypt.hash(user._id.toString(), 10)

        const jwtToken = jwt.sign({userId:user._id}, JWT_KEY, {
            expiresIn:'60m'
        })

      

          let info = await transporter.sendMail({
            from: '"Fred Foo yahoo 👻" <abhi@patel.com>', // sender address
            to: email, // list of receivers
            subject: "For forgot Password verification mail", // Subject line
            html: ` Email for forgot password Verificaton <a href="${FRONTEND_URL}/forgot-password-verify/${jwtToken}">Link</a>`, // html body
          });
        
        //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.json({message:`Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`})

        await user.updateOne({$set:{verifyToken:encryptedToken}})
        
    } catch (error) {
    return next(InternalServerError);
        
    }

}

export const verifyForgotMail : RequestHandler = async(req, res , next) => {
    const {token, password}:{token:string, password:string} = req.body;

    try {
        const decodedToken:any = jwt.verify(token, JWT_KEY)

        const user = await User.findById(decodedToken.userId)
        if(!user) return next(createHttpError(401, "invalid token"))
        const tokenMatch = await bcrypt.compare(decodedToken.userId, user.verifyToken)
        if(tokenMatch) return next(createHttpError(401, "token expired"))

        const hassPassword = await bcrypt.hash(password, 10)

        await user.updateOne({
            $set : { password:hassPassword},
            $unset: {verifyToken:0}
        })

        res.json({message:'Password Changed'})
        
    } catch (error) {
        return next(createHttpError(401, "invalid token"));
    }

   

}
