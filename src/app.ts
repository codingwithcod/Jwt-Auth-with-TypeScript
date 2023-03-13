import express, { ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import cookieParser from 'cookie-parser'

import { DB, PORT } from "./config";
import { errorHandler } from "./midddleware/errorHandler";
import exampleRoute from "./routes/example";
import userRoute from "./routes/userRoutes";
import KPassport from './midddleware/passport'

const app = express();
app.use(express.json());
app.use(cookieParser()  )
app.use(morgan("common"));

app.use(passport.initialize())
KPassport(passport)

app.use("/api", exampleRoute);
app.use("/api/user", userRoute);
app.use(() => {
  throw createHttpError(404, "Route Not found ");
});

app.use(errorHandler);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected succefully...");
    app.listen(PORT, () => {
      console.log(`server is runnig at : http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    throw createHttpError(501, "Unable to connect DataBase !!!");
  });
