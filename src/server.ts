import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import authController from "./controllers/authController";
import userController from "./controllers/userController";

// configure dotenv
dotenv.config({ path: "./.env" });

// init app
const app = express();

// env
const mongoURI: string = process.env[`MONGODB_${process.env.NODE_ENV}_URI`]!;

// init mongoose & start the server
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log(`Connected to ${process.env.NODE_ENV} database`);
    app.listen(5000, () => console.log(`Server started in ${process.env.NODE_ENV} environtment`));
  })
  .catch(err => console.log(err));

// add middlewares
app.use(express.json());
app.use(morgan("tiny"));

// controllers
app.use(authController);
app.use(userController);

// test api
app.get("/", (req, res): void => {
  res.status(200).json({ msg: `Server is running in ${process.env.NODE_ENV} environtment` });
});

// 404 api
app.use((req, res) => {
  res.status(404).json({ msg: "Page not found" });
});
