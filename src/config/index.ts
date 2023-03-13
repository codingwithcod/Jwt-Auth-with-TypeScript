import "dotenv/config";
import nodemailer from 'nodemailer'


export const DB = process.env.MONGO_URL!;

export const PORT = process.env.PORT || 3001;

export const JWT_KEY = process.env.JWT_KEY!;

export const FRONTEND_URL = process.env.FRONTEND_URL



let testAccount = {
    user: "upa5p3vuwvardufu@ethereal.email",
    pass: "65Jj2RRhYBxGs3kERG"
}

export const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });