import express, { ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import morgan from "morgan";

import { DB, PORT } from "./config";
import { errorHandler } from "./midddleware/errorHandler";
import exampleRoute from "./routes/example";

const app = express();
app.use(express.json());
app.use(morgan("common"));

app.use("/api", exampleRoute);
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
